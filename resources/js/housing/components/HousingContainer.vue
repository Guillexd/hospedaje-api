<script setup lang="ts">
import {
  createColumnHelper,
} from '@tanstack/vue-table'
import { House } from 'lucide-vue-next'
import { h, reactive, ref } from 'vue'
import DropdownHousingOptions from './DropdownHousingOptions.vue'
import { Checkbox } from '../../components/ui/checkbox'
import {
  Dialog,
} from '../../components/ui/dialog'
import { Switch } from '@/components/ui/switch'
import Header from '../../Presentation/Header.vue'
import { useFetchHousing } from '../composables/useFetchHousing'
import { keyNames } from '../../enums/keyNames'
import { apiNames } from '../../enums/apiNames'
import TablePresentation from '../../Presentation/TablePresentation.vue'
import PaginationPresentation from '../../Presentation/PaginationPresentation.vue'
import FilterBarPresentation from '../../Presentation/FilterBarPresentation.vue'
import HousingModal from './HousingModal.vue'
import { useForm } from 'vee-validate'
import { submitToastHandler, useChangeStatus } from '@/utils/utils'
import { tableNames } from '@/enums/tableNames'
import type { HousingState } from '@/types/types'

const params = reactive({
  page: 1,
  limit: window.innerWidth < 768 ? 5 : 10,
  searchParam: '',
})

const { isFetching, data, meta } = useFetchHousing(keyNames.housing, params)

const initialStateHousing: HousingState = {
  id: undefined,
  name: '',
  direction: '',
}

const columnHelper = createColumnHelper<typeof data.value[number]>()

const form = useForm<HousingState>()

const resetInitialHousingForm = () => {
  form.setValues(initialStateHousing)
}
const updateHousingForm = (housing: HousingState) => {
  form.setValues(housing)
}
const searchInput = (search: string) => {
  params.page = 1
  params.searchParam = search
}
const changePage = (newPage: number) => {
  params.page = newPage
}
const changeLimit = (limit: number) => {
  params.page = 1
  params.limit = limit
}

const inputKey = ref<number>(0)
const isHousingDialogOpen = ref<boolean>(false)

const closeHousingDialog = () => {
  isHousingDialogOpen.value = false
}

const { isPending, mutateAsync } = useChangeStatus(keyNames.housing, tableNames.housing)

const handleChangeStatus = (id: number, state: boolean) => {
  return submitToastHandler(
    mutateAsync({ id, state }),
    `${state ? 'Activando' : 'Desactivando'}...`,
    () => {
      return `Propiedad ${state ? 'activada' : 'desactivada'} con éxito`
    },
    (err) => {
      if (typeof err === 'object') {
        return `Acción fallida`
      }
      return err
    },
  )
}

const columns = [
  columnHelper.display({
    id: 'select',
    header: ({ table }) => h(Checkbox, {
      'checked': table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate'),
      'onUpdate:checked': value => table.toggleAllPageRowsSelected(!!value),
      'ariaLabel': 'Select all',
      'class': 'mr-2 md:mr-0'
    }),
    cell: ({ row }) => {
      return h(Checkbox, {
        'checked': row.getIsSelected(),
        'onUpdate:checked': value => row.toggleSelected(!!value),
        'ariaLabel': 'Select row',
      })
    },
    enableHiding: false,
  }),
  columnHelper.accessor('id', {
    header: 'ID',
    cell: (info) => h('span', info.getValue()),
  }),
  columnHelper.accessor('name', {
    header: 'Nombre',
    cell: (info) => h('div', { class: 'capitalize min-w-20' }, info.getValue()),
  }),
  columnHelper.accessor('direction', {
    header: 'Dirección',
    cell: (info) => h('div', { class: 'capitalize min-w-28' }, info.getValue()),
  }),
  columnHelper.accessor('is_active', {
    header: 'Estado',
    cell: ({ row }) => h(Switch, {
      'checked': !!row.getValue('is_active'),
      'onUpdate:checked': () => handleChangeStatus(row.getValue('id'), !row.getValue('is_active')),
      disabled: isPending.value || isFetching.value,
    }),
  }),
  columnHelper.display({
    id: 'actions',
    cell: ({ row }) => {
      const housing = row.original
      return h('div', { class: 'relative' }, h(DropdownHousingOptions, {
        housing,
        'onUpdate:housingForm': updateHousingForm
      }))
    },
    enableHiding: false,
  }),
]
</script>

<template>
  <Dialog :open="isHousingDialogOpen" @update:open="isHousingDialogOpen = $event">
    <Header :icon="House" title="Gestión de propiedades" :isFetching="isFetching"
      @reset:initial-form="resetInitialHousingForm" />
    <HousingModal :form="form" @reset="closeHousingDialog" />

    <FilterBarPresentation :render="!!params.searchParam" :filters="[
      {
        render: !!params.searchParam,
        tag: 'Busqueda',
        name: params.searchParam,
        handleClick: () => {
          inputKey += 1
          params.searchParam = ''
          params.page = 1
        }
      },
    ]" />

    <TablePresentation :data="data" :columns="columns" :delete-name="keyNames.housing"
      :delete-url="`${apiNames.housing}/${apiNames.destroy_action}`"
      title-dialog="¿Estás seguro que quieres eliminar a las propiedades seleccionadas?"
      description-dialog="Esta acción no se podrá deshacer. Esto eliminará a las propiedades seleccionadas permanentemente."
      :on-search-input="searchInput" :input-render="inputKey" />

    <PaginationPresentation v-if="!!meta" :meta="meta" :on-change-page="changePage" :on-change-limit="changeLimit" />
  </Dialog>
</template>

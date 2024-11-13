<script setup lang="ts">
import {
  createColumnHelper,
} from '@tanstack/vue-table'
import { BedSingle } from 'lucide-vue-next'
import { h, reactive, ref } from 'vue'
import DropdownHousingRoomOptions from './DropdownHousingRoomOptions.vue'
import { Checkbox } from '../../components/ui/checkbox'
import {
  Dialog,
} from '../../components/ui/dialog'
import { Switch } from '@/components/ui/switch'
import Header from '../../Presentation/Header.vue'
import { useFetchHousingRoom } from '../composables/useFetchHousingRoom'
import { keyNames } from '../../enums/keyNames'
import { apiNames } from '../../enums/apiNames'
import TablePresentation from '../../Presentation/TablePresentation.vue'
import PaginationPresentation from '../../Presentation/PaginationPresentation.vue'
import FilterBarPresentation from '../../Presentation/FilterBarPresentation.vue'
import HousingRoomModal from './HousingRoomModal.vue'
import { useForm } from 'vee-validate'
import { submitToastHandler, useChangeStatus } from '@/utils/utils'
import { tableNames } from '@/enums/tableNames'
import type { HousingRoomState } from '@/types/types'

const params = reactive({
  page: 1,
  limit: window.innerWidth < 768 ? 5 : 10,
  searchParam: '',
})

const { isFetching, data, meta } = useFetchHousingRoom(keyNames.housing_room, params)

const initialStateHousingRoom: HousingRoomState = {
  id: undefined,
  housing_id: undefined,
  room_number: '',
}

const columnHelper = createColumnHelper<typeof data.value[number]>()

const form = useForm<HousingRoomState>()

const resetInitialHousingRoomForm = () => {
  form.setValues(initialStateHousingRoom)
}
const updateHousingRoomForm = (housing_room: HousingRoomState) => {
  form.setValues(housing_room)
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
const isHousingRoomDialogOpen = ref<boolean>(false)

const closeHousingRoomDialog = () => {
  isHousingRoomDialogOpen.value = false
}

const { isPending, mutateAsync } = useChangeStatus(keyNames.housing_room, tableNames.housing_room)

const handleChangeStatus = (id: number, state: boolean) => {
  return submitToastHandler(
    mutateAsync({ id, state }),
    `${state ? 'Activando' : 'Desactivando'}...`,
    () => {
      return `Habitación ${state ? 'activada' : 'desactivada'} con éxito`
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
  columnHelper.accessor('room_number', {
    header: 'Habitación',
    cell: (info) => h('div', { class: 'capitalize min-w-20' }, info.getValue()),
  }),
  columnHelper.accessor('housing', {
    header: 'Propiedad',
    cell: (info) => h('div', { class: 'capitalize min-w-28' }, info.getValue()),
  }),
  columnHelper.accessor('is_available', {
    header: 'Disponibilidad',
    cell: (info) => h('div', info.getValue() ? 'Disponible' : 'Ocupado'),
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
      const housing_room = row.original
      return h('div', { class: 'relative' }, h(DropdownHousingRoomOptions, {
        housing_room,
        'onUpdate:housingRoomForm': updateHousingRoomForm
      }))
    },
    enableHiding: false,
  }),
]
</script>

<template>
  <Dialog :open="isHousingRoomDialogOpen" @update:open="isHousingRoomDialogOpen = $event">
    <Header :icon="BedSingle" title="Gestión de habitaciones" :isFetching="isFetching"
      @reset:initial-form="resetInitialHousingRoomForm" />
    <HousingRoomModal :form="form" @reset="closeHousingRoomDialog" />

    <FilterBarPresentation :render="!!params.searchParam" :filters="[
      {
        render: !!params.searchParam,
        tag: 'Búsqueda',
        name: params.searchParam,
        handleClick: () => {
          inputKey += 1
          params.searchParam = ''
          params.page = 1
        }
      },
    ]" />

    <TablePresentation :data="data" :columns="columns" :delete-name="keyNames.housing_room"
      :delete-url="`${apiNames.housing_room}/${apiNames.destroy_action}`"
      title-dialog="¿Estás seguro que quieres eliminar a las habitaciones seleccionadas?"
      description-dialog="Esta acción no se podrá deshacer. Esto eliminará a las habitaciones seleccionadas permanentemente."
      :on-search-input="searchInput" :input-render="inputKey" />

    <PaginationPresentation v-if="!!meta" :meta="meta" :on-change-page="changePage" :on-change-limit="changeLimit" />
  </Dialog>
</template>

<script setup lang="ts">
import {
  createColumnHelper,
} from '@tanstack/vue-table'
import { Users } from 'lucide-vue-next'
import { computed, h, reactive, ref, watch } from 'vue'
import DropdownTenancyOptions from './DropdownTenancyOptions.vue'
import { Checkbox } from '../../components/ui/checkbox'
import {
  Dialog,
} from '../../components/ui/dialog'
import Header from '../../Presentation/Header.vue'
import { useFetchTenancies } from '../composables/useFetchTenancies'
import { keyNames } from '../../enums/keyNames'
import { apiNames } from '../../enums/apiNames'
import TablePresentation from '../../Presentation/TablePresentation.vue'
import PaginationPresentation from '../../Presentation/PaginationPresentation.vue'
import RangeCalendarPresentation from '../../Presentation/RangeCalendarPresentation.vue'
import { dateCalculator, formatDateToDateString, getLocaleDate, transformDateToText } from '../../utils/utils'
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from '../../components/ui/menubar'
import Button from '../../components/ui/button/Button.vue'
import FilterBarPresentation from '../../Presentation/FilterBarPresentation.vue'
import TenancyModal from './TenancyModal.vue'
import { useForm } from 'vee-validate'
import type { TenancyState } from '@/types/types'

const initialStateDates = {
  start: undefined,
  end: undefined,
}

const dates = ref(initialStateDates)

const defaultVisibleColumns = computed(() => {
  if (window.innerWidth < 768) {
    return {
      id: false,
      description: false,
    }
  } else {
    return {
      id: false,
      description: true,
    }
  }
})

const params = reactive({
  page: 1,
  limit: window.innerWidth < 768 ? 5 : 10,
  searchParam: '',
  startDate: '',
  finishDate: '',
})

const { isFetching, data, meta } = useFetchTenancies(keyNames.tenancy, params)

const initialStateTenancy: TenancyState = {
  id: undefined,
  identity_document_id: undefined,
  document_number: undefined,
  name: '',
  first_document_image_url: undefined,
  second_document_image_url: undefined,
  description: '',
  phone: undefined,
}

const columnHelper = createColumnHelper<typeof data.value[number]>()

const form = useForm<TenancyState>()

const resetInitialTenancyForm = () => {
  form.setValues(initialStateTenancy)
}
const updateTenancyForm = (tenancy: TenancyState) => {
  form.setValues(tenancy)
}
const searchInput = (search: string) => {
  params.page = search.length > 2 ? 1 : params.page
  params.searchParam = search
}
const changePage = (newPage: number) => {
  params.page = newPage
}
const changeLimit = (limit: number) => {
  params.page = 1
  params.limit = limit
}
const updateDates = (newRange: any) => {
  dates.value = newRange
}

watch(dates, (value) => {
  if (!value || !value.start || !value.end) {
    params.startDate = ''
    params.finishDate = ''
    return
  }

  params.startDate = formatDateToDateString(value.start)
  params.finishDate = formatDateToDateString(value.end, 'end')
})

const inputKey = ref<number>(0)
const isTenancyDialogOpen = ref<boolean>(false)

const closeTenancyDialog = () => {
  isTenancyDialogOpen.value = false
}

const columns = [
  columnHelper.display({
    id: 'select',
    header: ({ table }) => h(Checkbox, {
      'checked': table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate'),
      'onUpdate:checked': value => table.toggleAllPageRowsSelected(!!value),
      'ariaLabel': 'Select all',
      'class': 'mr-2'
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
    cell: (info) => h('span', info.getValue() ?? ''),
  }),
  columnHelper.accessor('name', {
    header: 'Nombre',
    cell: (info) => h('div', { class: 'capitalize min-w-28' }, info.getValue()),
  }),
  columnHelper.accessor('document_number', {
    header: 'Número de documento',
    cell: ({ row }) => {
      const doc = row.getValue('document_number') as string
      const doc_type = row.original.document_type
      return h('div', { class: 'flex flex-col text-nowrap' }, [
        doc_type,
        h('span', { class: 'font-bold text-slate-500' }, doc)
      ])
    },
  }),
  columnHelper.accessor('description', {
    header: 'Descripción',
    cell: (info) => h('div', { class: 'max-w-60 truncate' }, info.getValue()),
  }),
  columnHelper.accessor('created_at', {
    header: 'Fecha de registro',
    cell: (info) => {
      const moment = dateCalculator(info.getValue())
      const date = getLocaleDate(info.getValue())
      return h('div', { class: 'min-w-28 flex flex-col' }, [
        date,
        h('span', { class: 'font-bold text-slate-500 text-sm' }, moment)
      ])
    },
  }),
  columnHelper.display({
    id: 'actions',
    cell: ({ row }) => {
      const tenancy = row.original
      return h('div', { class: 'relative' }, h(DropdownTenancyOptions, {
        tenancy,
        'onUpdate:tenancyForm': updateTenancyForm
      }))
    },
    enableHiding: false,
  }),
]
</script>

<template>
  <Dialog :open="isTenancyDialogOpen" @update:open="isTenancyDialogOpen = $event">
    <Header :icon="Users" title="Gestión de inquilinos" :isFetching="isFetching"
      @reset:initial-form="resetInitialTenancyForm" />
    <TenancyModal :form="form" @reset="closeTenancyDialog" />

    <Menubar class="md:w-1/3 mx-auto flex justify-center mt-3 shadow-sm p-7 dark:bg-slate-900 h-9">
      <MenubarMenu>
        <MenubarTrigger as-child>
          <Button variant="outline" size="lg" class="dark:text-slate-200">Fecha de registro</Button>
        </MenubarTrigger>
        <MenubarContent as-child>
          <RangeCalendarPresentation :dates="dates" @update:dates="updateDates" />
        </MenubarContent>
      </MenubarMenu>
    </Menubar>

    <FilterBarPresentation :render="(!!dates.start && !!dates.end) || !!params.searchParam" :filters="[
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
      {
        render: (!!dates.start && !!dates.end),
        tag: 'Fechas',
        name: `Desde ${transformDateToText(dates.start)} hasta ${transformDateToText(dates.end)}`,
        handleClick: () => {
          dates = initialStateDates
          params.page = 1
        }
      },
    ]" />

    <TablePresentation :data="data" :columns="columns" :default-visible-columns="defaultVisibleColumns"
      :delete-name="keyNames.tenancy" :delete-url="`${apiNames.tenancy}/${apiNames.destroy_action}`"
      title-dialog="¿Estás seguro que quieres eliminar a los inquilinos seleccionados?"
      description-dialog="Esta acción no se podrá deshacer. Esto eliminará a los inquilinos seleccionados permanentemente."
      :on-search-input="searchInput" :input-render="inputKey" />

    <PaginationPresentation v-if="!!meta" :meta="meta" :on-change-page="changePage" :on-change-limit="changeLimit" />
  </Dialog>
</template>

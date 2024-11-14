<script setup lang="ts">
import {
  createColumnHelper,
} from '@tanstack/vue-table'
import { CircleCheckBig, CircleX, KeyRound } from 'lucide-vue-next'
import { computed, h, reactive, ref, watch } from 'vue'
import DropdownHousingPaymentOptions from './DropdownHousingPaymentOptions.vue'
import { Checkbox } from '../../components/ui/checkbox'
import {
  Dialog,
} from '../../components/ui/dialog'
import Header from '../../Presentation/Header.vue'
import { useFetchHousingPayments, type PaymentState } from '../composables/useFetchHousingPayments'
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
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import FilterBarPresentation from '../../Presentation/FilterBarPresentation.vue'
import HousingPaymentModal from './HousingPaymentModal.vue'
import { useForm } from 'vee-validate'
import type { HousingPaymentState } from '@/types/types'
import { getLocalTimeZone, today } from '@internationalized/date'
import { useRoute } from 'vue-router'

const route = useRoute()

const initialStateDates = {
  start: undefined,
  end: undefined,
}

const dates = ref(initialStateDates)

const defaultVisibleColumns = computed(() => {
  if (window.innerWidth < 768) {
    return {
      id: false,
      tenancy_name: false,
      payment: false,
      description: false,
      tenancy_document_number: false,
    }
  } else {
    return {
      id: false,
      tenancy_name: true,
      payment: true,
      description: false,
      tenancy_document_number: false,
    }
  }
})

const params = reactive({
  page: 1,
  limit: window.innerWidth < 768 ? 5 : 10,
  searchParam: route.query.customer as string || '',
  startDate: '',
  finishDate: '',
  paymentState: 'all' as PaymentState,
})

const { isFetching, data, meta } = useFetchHousingPayments(keyNames.housing_payment, params)

const initialStateHosuingPayment: HousingPaymentState = {
  id: undefined,
  housing_room_id: undefined,
  tenancy_id: undefined,
  payment: 0,
  rental_start_date: '',
  rental_end_date: '',
  payment_date: '',
  description: '',
}

const columnHelper = createColumnHelper<typeof data.value[number]>()

const form = useForm<HousingPaymentState>()

const resetInitialHousingPaymentForm = () => {
  form.setValues(initialStateHosuingPayment)
}
const updateHousingPaymentForm = (housingPayment: HousingPaymentState) => {
  form.setValues(housingPayment)
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

watch(() => route.query, (value) => {
  params.searchParam = value.customer as string
})

const inputKey = ref<number>(0)
const isHousingPaymentDialogOpen = ref<boolean>(false)

const closeHousingPaymentDialog = () => {
  isHousingPaymentDialogOpen.value = false
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
  columnHelper.accessor('tenancy_name', {
    header: 'Inquilino',
    cell: (info) => h('div', { class: 'capitalize min-w-20' }, info.getValue()),
  }),
  columnHelper.accessor('tenancy_document_number', {
    header: 'N° de documento',
    cell: ({ row }) => {
      const doc = row.getValue('tenancy_document_number') as string
      const doc_type = row.original.tenancy_identity_document
      return h('div', { class: 'flex flex-col text-nowrap' }, [
        doc_type,
        h('span', { class: 'font-bold text-slate-500' }, doc)
      ])
    },
  }),
  columnHelper.accessor('housing_room', {
    header: 'N° de habitación',
    cell: ({ row }) => {
      const room = row.getValue('housing_room') as string
      const housing = row.original.housing
      return h('div', { class: 'flex flex-col text-nowrap' }, [
        room,
        h('span', { class: 'font-bold text-slate-500' }, housing)
      ])
    },
  }),
  columnHelper.accessor('payment', {
    header: 'Pago',
    cell: (info) => h('div', info.getValue().toLocaleString(keyNames.lang, { style: "currency", currency: "PEN" })),
  }),
  columnHelper.accessor('rental_start_date', {
    header: 'Fecha de ingreso',
    cell: (info) => {
      const moment = dateCalculator(info.getValue())
      const date = getLocaleDate(info.getValue())
      return h('div', { class: 'min-w-28 flex flex-col' }, [
        date,
        h('span', { class: 'font-bold text-slate-500 text-sm' }, moment)
      ])
    },
  }),
  columnHelper.accessor('rental_end_date', {
    header: 'Fecha de culminación',
    cell: (info) => {
      const moment = dateCalculator(info.getValue())
      const date = getLocaleDate(info.getValue())
      return h('div', { class: 'min-w-28 flex flex-col' }, [
        date,
        h('span', { class: 'font-bold text-slate-500 text-sm' }, moment)
      ])
    },
  }),
  columnHelper.accessor('payment_date', {
    header: 'Fecha de pago',
    cell: (info) => {
      if (!!info.getValue()) {
        const moment = dateCalculator(info.getValue())
        const date = getLocaleDate(info.getValue())
        return h('div', { class: 'min-w-36 flex flex-col' }, [
          date,
          h('div', { class: 'flex items-center gap-1' }, [
            h(CircleCheckBig, { class: 'text-green-500' }),
            h('span', { class: 'font-bold text-green-500 text-sm' }, moment)
          ]),
        ])
      }
      return h('div', { class: 'flex items-center gap-1' }, [
        h(CircleX, { class: 'text-blue-500' }),
        h('span', { class: 'font-bold text-blue-500 text-sm' }, 'Pendiente')
      ])
    },
  }),
  columnHelper.accessor('description', {
    header: 'Descripción',
    cell: (info) => h('div', { class: 'max-w-60 truncate' }, info.getValue()),
  }),
  columnHelper.display({
    id: 'actions',
    cell: ({ row }) => {
      const housingPayment = row.original
      return h('div', { class: 'relative' }, h(DropdownHousingPaymentOptions, {
        housingPayment,
        'onUpdate:housingPaymentForm': updateHousingPaymentForm
      }))
    },
    enableHiding: false,
  }),
]
</script>

<template>
  <Dialog :open="isHousingPaymentDialogOpen" @update:open="isHousingPaymentDialogOpen = $event">
    <Header :icon="KeyRound" title="Gestión de alquileres" :isFetching="isFetching"
      @reset:initial-form="resetInitialHousingPaymentForm" />
    <HousingPaymentModal :form="form" @reset="closeHousingPaymentDialog" />

    <Menubar class="flex flex-col sm:flex-row justify-center gap-y-2 mt-3 shadow-sm dark:bg-slate-900 py-2">
      <MenubarMenu>
        <MenubarTrigger as-child>
          <Button variant="outline" size="lg" class="dark:text-slate-200">Fecha de alquiler</Button>
        </MenubarTrigger>
        <MenubarContent as-child>
          <RangeCalendarPresentation :dates="dates" @update:dates="updateDates"
            :max-value="today(getLocalTimeZone()).add({ years: 1 })" />
        </MenubarContent>
      </MenubarMenu>

      <ToggleGroup type="single" class="dark:text-slate-200" v-model:model-value="params.paymentState">
        <ToggleGroupItem value="all" aria-label="Toggle bold">
          Todos
        </ToggleGroupItem>
        <ToggleGroupItem value="rent_debtors">
          Pendientes
        </ToggleGroupItem>
        <ToggleGroupItem value="rent_payers">
          Cobrados
        </ToggleGroupItem>
      </ToggleGroup>
    </Menubar>

    <FilterBarPresentation
      :render="(!!dates.start && !!dates.end) || !!params.searchParam || (!!params.paymentState && params.paymentState !== 'all')"
      :filters="[
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
        {
          render: (!!params.paymentState && params.paymentState !== 'all'),
          tag: 'Estado de pago',
          name: params.paymentState === 'rent_debtors' ? 'Pendientes' : params.paymentState === 'rent_payers' ? 'Cancelados' : '',
          handleClick: () => {
            params.paymentState = 'all'
            params.page = 1
          }
        },
      ]" />

    <TablePresentation :data="data" :columns="columns" :default-visible-columns="defaultVisibleColumns"
      :delete-name="keyNames.housing_payment" :delete-url="`${apiNames.housing_payment}/${apiNames.destroy_action}`"
      title-dialog="¿Estás seguro que quieres eliminar los alquileres seleccionados?"
      description-dialog="Esta acción no se podrá deshacer. Esto eliminará los alquileres seleccionados permanentemente."
      :on-search-input="searchInput" :input-render="inputKey" />

    <PaginationPresentation v-if="!!meta" :meta="meta" :on-change-page="changePage" :on-change-limit="changeLimit" />
  </Dialog>
</template>

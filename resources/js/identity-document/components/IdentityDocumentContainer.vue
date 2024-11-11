<script setup lang="ts">
import {
  createColumnHelper,
} from '@tanstack/vue-table'
import { IdCard } from 'lucide-vue-next'
import { h, reactive, ref } from 'vue'
import DropdownIdentityDocumentOptions from './DropdownIdentityDocumentOptions.vue'
import { Checkbox } from '../../components/ui/checkbox'
import {
  Dialog,
} from '../../components/ui/dialog'
import Header from '../../Presentation/Header.vue'
import { useFetchIdentityDocuments } from '../composables/useFetchIdentityDocuments'
import { keyNames } from '../../enums/keyNames'
import { apiNames } from '../../enums/apiNames'
import TablePresentation from '../../Presentation/TablePresentation.vue'
import PaginationPresentation from '../../Presentation/PaginationPresentation.vue'
import FilterBarPresentation from '../../Presentation/FilterBarPresentation.vue'
import IdentityDocumentModal from './IdentityDocumentModal.vue'
import { useForm } from 'vee-validate'
import type { IdentityDocumentState } from '@/types/types'

const params = reactive({
  page: 1,
  limit: window.innerWidth < 768 ? 5 : 10,
  searchParam: '',
})

const { isFetching, data, meta } = useFetchIdentityDocuments(keyNames.identity_document, params)

const initialStateIdentityDocument: IdentityDocumentState = {
  id: undefined,
  abbreviation: '',
  description: '',
}

const columnHelper = createColumnHelper<typeof data.value[number]>()

const form = useForm<IdentityDocumentState>()

const resetInitialIdentityDocumentForm = () => {
  form.setValues(initialStateIdentityDocument)
}
const updateIdentityDocumentForm = (identityDocument: IdentityDocumentState) => {
  form.setValues(identityDocument)
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
const isIdentityDocumentDialogOpen = ref<boolean>(false)

const closeIdentityDocumentDialog = () => {
  isIdentityDocumentDialogOpen.value = false
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
  columnHelper.accessor('abbreviation', {
    header: 'Abreviación',
    cell: (info) => h('div', { class: 'capitalize text-center sm:text-start' }, info.getValue()),
  }),
  columnHelper.accessor('description', {
    header: 'Descripción',
    cell: (info) => h('div', { class: 'capitalize min-w-28' }, info.getValue()),
  }),
  columnHelper.display({
    id: 'actions',
    cell: ({ row }) => {
      const identity_document = row.original
      return h('div', { class: 'relative' }, h(DropdownIdentityDocumentOptions, {
        identity_document,
        'onUpdate:identityDocumentForm': updateIdentityDocumentForm
      }))
    },
    enableHiding: false,
  }),
]
</script>

<template>
  <Dialog :open="isIdentityDocumentDialogOpen" @update:open="isIdentityDocumentDialogOpen = $event">
    <Header :icon="IdCard" title="Gestión de documentos de identidad" :isFetching="isFetching"
      @reset:initial-form="resetInitialIdentityDocumentForm" />
    <IdentityDocumentModal :form="form" @reset="closeIdentityDocumentDialog" />

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

    <TablePresentation :data="data" :columns="columns" :delete-name="keyNames.identity_document"
      :delete-url="`${apiNames.identity_document}/${apiNames.destroy_action}`"
      title-dialog="¿Estás seguro que quieres eliminar a las documentos seleccionadas?"
      description-dialog="Esta acción no se podrá deshacer. Esto eliminará a los documentos de identidad seleccionados permanentemente."
      :on-search-input="searchInput" :input-render="inputKey" />

    <PaginationPresentation v-if="!!meta" :meta="meta" :on-change-page="changePage" :on-change-limit="changeLimit" />
  </Dialog>
</template>

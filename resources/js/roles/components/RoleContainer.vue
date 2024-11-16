<script setup lang="ts">
import {
  createColumnHelper,
} from '@tanstack/vue-table'
import { UserPen } from 'lucide-vue-next'
import { h, reactive, ref } from 'vue'
import DropdownRoleOptions from './DropdownRoleOptions.vue'
import { Checkbox } from '../../components/ui/checkbox'
import {
  Dialog,
} from '../../components/ui/dialog'
import Header from '../../Presentation/Header.vue'
import { useFetchRoles } from '../composables/useFetchRoles'
import { keyNames } from '../../enums/keyNames'
import { apiNames } from '../../enums/apiNames'
import TablePresentation from '../../Presentation/TablePresentation.vue'
import PaginationPresentation from '../../Presentation/PaginationPresentation.vue'
import FilterBarPresentation from '../../Presentation/FilterBarPresentation.vue'
import RoleModal from './RoleModal.vue'
import { useForm } from 'vee-validate'
import type { RoleState } from '@/types/types'

const params = reactive({
  page: 1,
  limit: window.innerWidth < 768 ? 5 : 10,
  searchParam: '',
})

const { isFetching, data, meta } = useFetchRoles(keyNames.roles, params)

const initialStateRole: RoleState = {
  id: undefined,
  name: '',
  description: '',
  permissions: []
}

const columnHelper = createColumnHelper<typeof data.value[number]>()

const form = useForm<RoleState>()

const resetInitialRoleForm = () => {
  form.setValues(initialStateRole)
}
const updateRoleForm = (role: RoleState) => {
  form.setValues(role)
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

const inputKey = ref<number>(0)
const isRoleDialogOpen = ref<boolean>(false)

const closeRoleDialog = () => {
  isRoleDialogOpen.value = false
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
  columnHelper.accessor('description', {
    header: 'Descripción',
    cell: (info) => h('div', { class: 'max-w-60 truncate' }, info.getValue()),
  }),
  columnHelper.display({
    id: 'actions',
    cell: ({ row }) => {
      const role = row.original
      return h('div', { class: 'relative' }, h(DropdownRoleOptions, {
        role,
        'onUpdate:roleForm': updateRoleForm
      }))
    },
    enableHiding: false,
  }),
]
</script>

<template>
  <Dialog :open="isRoleDialogOpen" @update:open="isRoleDialogOpen = $event">
    <Header :icon="UserPen" title="Gestión de roles" :isFetching="isFetching"
      @reset:initial-form="resetInitialRoleForm" />
    <RoleModal :form="form" @reset="closeRoleDialog" />

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

    <TablePresentation :data="data" :columns="columns" :delete-name="keyNames.roles"
      :delete-url="`${apiNames.roles}/${apiNames.destroy_action}`"
      title-dialog="¿Estás seguro que quieres eliminar a los roles seleccionados?"
      description-dialog="Esta acción no se podrá deshacer. Esto eliminará a los roles seleccionados permanentemente."
      :on-search-input="searchInput" :input-render="inputKey" />

    <PaginationPresentation v-if="!!meta" :meta="meta" :on-change-page="changePage" :on-change-limit="changeLimit" />
  </Dialog>
</template>

<script setup lang="ts">
import {
  createColumnHelper,
} from '@tanstack/vue-table'
import { User } from 'lucide-vue-next'
import { computed, h, reactive, ref } from 'vue'
import DropdownUserOptions from './DropdownUserOptions.vue'
import { Checkbox } from '../../components/ui/checkbox'
import {
  Dialog,
} from '../../components/ui/dialog'
import { Switch } from '@/components/ui/switch'
import Header from '../../Presentation/Header.vue'
import { useFetchUser } from '../composables/useFetchUsers'
import { keyNames } from '../../enums/keyNames'
import { apiNames } from '../../enums/apiNames'
import TablePresentation from '../../Presentation/TablePresentation.vue'
import PaginationPresentation from '../../Presentation/PaginationPresentation.vue'
import { submitToastHandler, useChangeStatus } from '../../utils/utils'
import FilterBarPresentation from '../../Presentation/FilterBarPresentation.vue'
import UserModal from './UserModal.vue'
import { useForm } from 'vee-validate'
import { tableNames } from '@/enums/tableNames'
import type { UserState } from '@/types/types'

const defaultVisibleColumns = computed(() => {
  if (window.innerWidth < 768) {
    return {
      id: false,
      email: false,
    }
  } else {
    return {
      id: false,
      email: true,
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

const { isFetching, data, meta } = useFetchUser(keyNames.users, params)

const initialStateUser: UserState = {
  id: undefined,
  role_id: undefined,
  name: '',
  email: '',
  password: `$HSL-${new Date().getFullYear()}$`,
  dni: '',
  phone: '',
}

const columnHelper = createColumnHelper<typeof data.value[number]>()

const form = useForm<UserState>()

const resetInitialUserForm = () => {
  form.setValues(initialStateUser)
}
const updateUserForm = (user: UserState) => {
  form.setValues(user)
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
const isUserDialogOpen = ref<boolean>(false)

const closeUserDialog = () => {
  isUserDialogOpen.value = false
}

const { isPending, mutateAsync } = useChangeStatus(keyNames.users, tableNames.user)

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
    cell: (info) => h('span', { class: 'capitalize min-w-28' }, info.getValue()),
  }),
  columnHelper.accessor('email', {
    header: 'Correo electrónico',
    cell: (info) => h('span', info.getValue()),
  }),
  columnHelper.accessor('dni', {
    header: 'DNI',
    cell: (info) => h('span', info.getValue()),
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
      const user = row.original
      return h('div', { class: 'relative' }, h(DropdownUserOptions, {
        user,
        'onUpdate:userForm': updateUserForm
      }))
    },
    enableHiding: false,
  }),
]
</script>

<template>
  <Dialog :open="isUserDialogOpen" @update:open="isUserDialogOpen = $event">
    <Header :icon="User" title="Gestión de usuarios" :isFetching="isFetching"
      @reset:initial-form="resetInitialUserForm" />
    <UserModal :form="form" @reset="closeUserDialog" />

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

    <TablePresentation :data="data" :columns="columns" :default-visible-columns="defaultVisibleColumns"
      :delete-name="keyNames.users" :delete-url="`${apiNames.users}/${apiNames.destroy_action}`"
      title-dialog="¿Estás seguro que quieres eliminar a los usuarios seleccionados?"
      description-dialog="Esta acción no se podrá deshacer. Esto eliminará a los usuarios seleccionados permanentemente."
      :on-search-input="searchInput" :input-render="inputKey" />

    <PaginationPresentation v-if="!!meta" :meta="meta" :on-change-page="changePage" :on-change-limit="changeLimit" />
  </Dialog>
</template>

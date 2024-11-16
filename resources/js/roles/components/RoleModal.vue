<script setup lang="ts">
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/form'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '../../components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import type { FormContext } from 'vee-validate'
import type { PermissionsI, RoleState } from '../../types/types'
import { fetchData, submitToastHandler } from '../../utils/utils'
import { useModifyRole } from '../composables/useModifyRole'
import { apiNames } from '../../enums/apiNames'
import { computed, onMounted, ref, watch } from 'vue'

const props = defineProps<{
  form: FormContext<RoleState>
}>()

const emit = defineEmits(['reset'])

function closeRoleDialog(): void {
  emit('reset')
}

const roleId = computed<boolean>(() => !!props.form.values.id)
const roleParams = computed(() => ({
  url: `${apiNames.roles}/${!roleId.value ? apiNames.store_action : apiNames.update_action}`,
  method: !roleId.value ? apiNames.post : apiNames.put,
}))

const { isPending, mutateAsync } = useModifyRole(roleParams)

const handleRoleSubmit = props.form.handleSubmit((values: RoleState) => {
  const newPermissionsState: number[] = formattedPermissions.value
    .filter((permission: (PermissionsI & { checked: boolean })) => permission.checked)
    .map((permission: PermissionsI) => permission.id)

  values.permissions = newPermissionsState

  return submitToastHandler<null>(
    mutateAsync(values),
    `${!roleId.value ? 'Agregando' : 'Editando'}...`,
    () => {
      closeRoleDialog()
      return `Inquilino ${!roleId.value ? 'agregado' : 'actualizado'} con éxito`
    },
    (err) => {
      if (typeof err === 'object') {
        props.form.setErrors(err)
        return `Acción fallida`
      }
      return err
    },
  )
})

const permissions = ref<PermissionsI[]>([])
const formattedPermissions = ref<(PermissionsI & { checked: boolean })[]>([])

onMounted(async () => {
  permissions.value = (await fetchData<PermissionsI[]>(`${apiNames.roles}/${apiNames.permissions}`)).data
})

watch(() => props.form.values.permissions, () => {
  const ps = props.form.values.permissions as PermissionsI[]
  const newPermissionState = permissions.value.map((permission) => ({
    ...permission,
    checked: ps.some(p => p.id === permission.id),
  }))
  formattedPermissions.value = newPermissionState
})

const handlePermission = (id: number, checked: boolean) => {
  const newPermissions = formattedPermissions.value.map((permission) => {
    if (permission.id === id) {
      return {
        ...permission,
        checked,
      }
    }
    return permission
  })
  formattedPermissions.value = newPermissions
}

const handleAllPermissions = () => {
  const newPermissions = formattedPermissions.value.map((permission) => ({
    ...permission,
    checked: !permission.checked,
  }))
  formattedPermissions.value = newPermissions
}

const areAllPermissionsChecked = computed((): boolean => !!formattedPermissions.value.every(p => p.checked))

</script>

<template>
  <DialogContent class="sm:max-w-[600px] text-slate-800 dark:dark:text-slate-200">
    <DialogHeader>
      <DialogTitle>{{ roleId ? 'Editar' : 'Agregar' }} rol</DialogTitle>
      <DialogDescription>
        Haz los cambios del rol aquí. Click {{ roleId ? 'Editar' : 'Agregar' }} cuando termines.
      </DialogDescription>
    </DialogHeader>

    <form @submit="handleRoleSubmit" keep-values>
      <section class="flex flex-col sm:grid grid-cols-2 gap-x-2 gap-y-1 overflow-y-auto max-h-[71vh] p-1">
        <FormField v-slot="{ componentField }" name="description">
          <FormItem class="col-span-full">
            <FormLabel>Nombre</FormLabel>
            <FormControl>
              <Input v-bind="componentField" autocomplete="off" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <div class="flex items-center space-x-2 my-1 col-span-full">
          <Checkbox id="all-checked" :checked="areAllPermissionsChecked" @click="handleAllPermissions" />
          <Label for="all-checked"> {{ areAllPermissionsChecked ? 'Desmarcar' : 'Marcar' }} los permisos</Label>
        </div>
        <div class="flex items-center space-x-2 my-1" v-for="permission in formattedPermissions">
          <Checkbox :id="permission.id.toString()" :checked="permission.checked"
            @click="handlePermission(permission.id, !permission.checked)" />
          <Label :for="permission.id.toString()">{{ permission.description }}</Label>
        </div>
        <p v-if="formattedPermissions.every(p => !p.checked)"
          class="text-[0.8rem] font-medium text-red-500 dark:text-red-900 col-span-full">
          {{ props.form.errors.value.permissions }}</p>
      </section>
      <DialogFooter>
        <Button type="submit" class="w-full mt-3 p-1" :disabled="isPending">
          {{ roleId ? 'Editar' : 'Agregar' }}
        </Button>
      </DialogFooter>
    </form>
  </DialogContent>
</template>

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
import type { FormContext } from 'vee-validate'
import type { UserState } from '../../types/types'
import { searchDoc, submitToastHandler } from '../../utils/utils'
import { useModifyUser } from '../composables/useModifyUser'
import { apiNames } from '../../enums/apiNames'
import { computed } from 'vue'
import { Search } from 'lucide-vue-next'

const props = defineProps<{
  form: FormContext<UserState>
}>()

const emit = defineEmits(['reset'])

function closeUserDialog(): void {
  emit('reset')
}

const userId = computed<boolean>(() => !!props.form.values.id)
const userParams = computed(() => ({
  url: `${apiNames.users}/${!userId.value ? apiNames.store_action : apiNames.update_action}`,
  method: !userId.value ? apiNames.post : apiNames.put,
}))

const { isPending, mutateAsync } = useModifyUser(userParams)

const handleLoginSubmit = props.form.handleSubmit((values: UserState) => {
  values.password_confirmation = values.password
  return submitToastHandler<null>(
    mutateAsync(values),
    `${!userId.value ? 'Agregando' : 'Editando'}...`,
    () => {
      closeUserDialog()
      return `Usuario ${!userId.value ? 'agregado' : 'actualizado'} con éxito`
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

const searchPersonByDocumentNumber = () => {
  searchDoc(props.form.values.dni as number, (razonSocial) => {
    props.form.setValues({ name: razonSocial })
  }, (nombres, apellidoPaterno, apellidoMaterno) => {
    props.form.setValues({ name: `${nombres} ${apellidoPaterno} ${apellidoMaterno}` })
  })
}
</script>

<template>
  <DialogContent class="sm:max-w-[600px] text-slate-800 dark:dark:text-slate-200">
    <DialogHeader>
      <DialogTitle>{{ userId ? 'Editar' : 'Agregar' }} usuario</DialogTitle>
      <DialogDescription>
        Haz los cambios del usuario aquí. Click {{ userId ? 'Editar' : 'Agregar' }} cuando termines.
      </DialogDescription>
    </DialogHeader>

    <form @submit="handleLoginSubmit" keep-values>
      <section class="flex flex-col sm:grid grid-cols-2 gap-x-2 gap-y-1 overflow-y-auto max-h-[71vh] p-1">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <FormLabel>Nombre</FormLabel>
            <FormControl>
              <Input v-bind="componentField" autocomplete="off" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="dni">
          <FormItem>
            <FormLabel>DNI</FormLabel>
            <FormControl>
              <div class="relative transition-all ease-in-out">
                <Search
                  class="absolute left-1 bottom-1 hover:scale-110 cursor-pointer text-green-500" :size="30"
                  @click="searchPersonByDocumentNumber" />
                <Input type="number" class="pl-11" v-bind="componentField" autocomplete="off" max="999999999" />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="phone">
          <FormItem>
            <FormLabel>Celular</FormLabel>
            <FormControl>
              <Input type="number" v-bind="componentField" autocomplete="off" max="999999999" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="birth_date">
          <FormItem>
            <FormLabel>Fecha de nacimiento</FormLabel>
            <FormControl>
              <Input type="date" v-bind="componentField" class="block" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel>Correo electrónico</FormLabel>
            <FormControl>
              <Input v-bind="componentField" autocomplete="off" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-if="!userId" v-slot="{ componentField }" name="password">
          <FormItem>
            <FormLabel>Contraseña</FormLabel>
            <FormControl>
              <Input v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </section>
      <DialogFooter>
        <Button type="submit" class="w-full mt-3 p-1" :disabled="isPending">
          {{ userId ? 'Editar' : 'Agregar' }}
        </Button>
      </DialogFooter>
    </form>
  </DialogContent>
</template>

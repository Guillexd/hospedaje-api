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
import type { IdentityDocumentState } from '../../types/types'
import { submitToastHandler } from '../../utils/utils'
import { useModifyIdentityDocument } from '../composables/useModifyIdentityDocument'
import { apiNames } from '../../enums/apiNames'
import { computed } from 'vue'

const props = defineProps<{
  form: FormContext<IdentityDocumentState>
}>()

const emit = defineEmits(['reset'])

function closeIdentityDocumentDialog(): void {
  emit('reset')
}

const identityDocumentId = computed<boolean>(() => !!props.form.values.id)
const identityDocumentParams = computed(() => ({
  url: `${apiNames.identity_document}/${!identityDocumentId.value ? apiNames.store_action : apiNames.update_action}`,
  method: !identityDocumentId.value ? apiNames.post : apiNames.put,
}))

const { isPending, mutateAsync } = useModifyIdentityDocument(identityDocumentParams)

const handleLoginSubmit = props.form.handleSubmit((values: IdentityDocumentState) => {
  return submitToastHandler<null>(
    mutateAsync(values),
    `${!identityDocumentId.value ? 'Agregando' : 'Editando'}...`,
    () => {
      closeIdentityDocumentDialog()
      return `Documento ${!identityDocumentId.value ? 'agregado' : 'actualizado'} con éxito`
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

</script>

<template>
  <DialogContent class="sm:max-w-[600px] text-slate-800 dark:dark:text-slate-200">
    <DialogHeader>
      <DialogTitle>{{ identityDocumentId ? 'Editar' : 'Agregar' }} documento de identidad</DialogTitle>
      <DialogDescription>
        Haz los cambios del documento de identidad aquí. Click {{ identityDocumentId ? 'Editar' : 'Agregar' }} cuando termines.
      </DialogDescription>
    </DialogHeader>

    <form @submit="handleLoginSubmit" keep-values>
      <section class="flex flex-col sm:grid grid-cols-2 gap-x-2 gap-y-1 overflow-y-auto max-h-[71vh] p-1">
        <FormField v-slot="{ componentField }" name="abbreviation">
          <FormItem>
            <FormLabel>Nombre</FormLabel>
            <FormControl>
              <Input v-bind="componentField" autocomplete="off" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="description">
          <FormItem>
            <FormLabel>Dirección</FormLabel>
            <FormControl>
              <Input v-bind="componentField" autocomplete="off" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </section>
      <DialogFooter>
        <Button type="submit" class="w-full mt-3 p-1" :disabled="isPending">
          {{ identityDocumentId ? 'Editar' : 'Agregar' }}
        </Button>
      </DialogFooter>
    </form>
  </DialogContent>
</template>

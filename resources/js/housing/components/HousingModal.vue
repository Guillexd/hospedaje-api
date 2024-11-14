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
import type { HousingState } from '../../types/types'
import { submitToastHandler } from '../../utils/utils'
import { useModifyHousing } from '../composables/useModifyHousing'
import { apiNames } from '../../enums/apiNames'
import { computed } from 'vue'

const props = defineProps<{
  form: FormContext<HousingState>
}>()

const emit = defineEmits(['reset'])

function closeHousingDialog(): void {
  emit('reset')
}

const housingId = computed<boolean>(() => !!props.form.values.id)
const housingParams = computed(() => ({
  url: `${apiNames.housing}/${!housingId.value ? apiNames.store_action : apiNames.update_action}`,
  method: !housingId.value ? apiNames.post : apiNames.put,
}))

const { isPending, mutateAsync } = useModifyHousing(housingParams)

const handleHousingSubmit = props.form.handleSubmit((values: HousingState) => {
  return submitToastHandler<null>(
    mutateAsync(values),
    `${!housingId.value ? 'Agregando' : 'Editando'}...`,
    () => {
      closeHousingDialog()
      return `Propiedad ${!housingId.value ? 'agregada' : 'actualizada'} con éxito`
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
      <DialogTitle>{{ housingId ? 'Editar' : 'Agregar' }} propiedad</DialogTitle>
      <DialogDescription>
        Haz los cambios de la propiedad aquí. Click {{ housingId ? 'Editar' : 'Agregar' }} cuando termines.
      </DialogDescription>
    </DialogHeader>

    <form @submit="handleHousingSubmit" keep-values>
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
        <FormField v-slot="{ componentField }" name="direction">
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
          {{ housingId ? 'Editar' : 'Agregar' }}
        </Button>
      </DialogFooter>
    </form>
  </DialogContent>
</template>

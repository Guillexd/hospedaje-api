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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { FormContext } from 'vee-validate'
import type { HousingI, HousingRoomState } from '../../types/types'
import { fetchData, submitToastHandler } from '../../utils/utils'
import { useModifyHousingRoom } from '../composables/useModifyHousingRoom'
import { apiNames } from '../../enums/apiNames'
import { computed, onMounted, ref } from 'vue'

const props = defineProps<{
  form: FormContext<HousingRoomState>
}>()

const emit = defineEmits(['reset'])

function closeHousingDialog(): void {
  emit('reset')
}

const housingRoomId = computed<boolean>(() => !!props.form.values.id)
const housingRoomParams = computed(() => ({
  url: `${apiNames.housing_room}/${!housingRoomId.value ? apiNames.store_action : apiNames.update_action}`,
  method: !housingRoomId.value ? apiNames.post : apiNames.put,
}))

const { isPending, mutateAsync } = useModifyHousingRoom(housingRoomParams)

const handleLoginSubmit = props.form.handleSubmit((values: HousingRoomState) => {
  return submitToastHandler<null>(
    mutateAsync(values),
    `${!housingRoomId.value ? 'Agregando' : 'Editando'}...`,
    () => {
      closeHousingDialog()
      return `Habitación ${!housingRoomId.value ? 'agregada' : 'actualizada'} con éxito`
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

const housing = ref<HousingI[]>([])

onMounted(async () => {
  housing.value = (await fetchData<HousingI[]>(`${apiNames.housing}/${apiNames.get_active}`)).data
})

</script>

<template>
  <DialogContent class="sm:max-w-[600px] text-slate-800 dark:dark:text-slate-200">
    <DialogHeader>
      <DialogTitle>{{ housingRoomId ? 'Editar' : 'Agregar' }} habitación</DialogTitle>
      <DialogDescription>
        Haz los cambios de la habitación aquí. Click {{ housingRoomId ? 'Editar' : 'Agregar' }} cuando termines.
      </DialogDescription>
    </DialogHeader>

    <form @submit="handleLoginSubmit" keep-values>
      <section class="flex flex-col sm:grid grid-cols-2 gap-x-2 gap-y-1 overflow-y-auto max-h-[71vh] p-1">
        <FormField v-slot="{ componentField }" name="housing_id">
          <FormItem>
            <FormLabel>Propiedad</FormLabel>
            <Select v-bind="componentField">
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona la propiedad" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  <SelectItem v-for="doc in housing" :value="doc.id.toString()">
                    {{ doc.name }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="room_number">
          <FormItem>
            <FormLabel>Habitación</FormLabel>
            <FormControl>
              <Input v-bind="componentField" autocomplete="off" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </section>
      <DialogFooter>
        <Button type="submit" class="w-full mt-3 p-1" :disabled="isPending">
          {{ housingRoomId ? 'Editar' : 'Agregar' }}
        </Button>
      </DialogFooter>
    </form>
  </DialogContent>
</template>

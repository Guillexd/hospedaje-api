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
import { Textarea } from '@/components/ui/textarea'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { useFetchTenancies } from '@/tenancy/composables/useFetchTenancies'
import { X } from 'lucide-vue-next'
import { CaretSortIcon, CheckIcon } from '@radix-icons/vue'
import type { FormContext } from 'vee-validate'
import type { HousingPaymentState } from '../../types/types'
import { submitToastHandler } from '../../utils/utils'
import { useModifyHousingPayment } from '../composables/useModifyHousingPayment'
import { apiNames } from '../../enums/apiNames'
import { computed, reactive, ref, watch } from 'vue'
import { useFetchHousingRoom } from '@/housing-room/composables/useFetchHousingRoom'

const props = defineProps<{
  form: FormContext<HousingPaymentState>
}>()

const emit = defineEmits(['reset'])

const housingPaymentId = computed<boolean>(() => !!props.form.values.id)
const housingPaymentParams = computed(() => ({
  url: `${apiNames.housing_payment}/${!housingPaymentId.value ? apiNames.store_action : apiNames.update_action}`,
  method: !housingPaymentId.value ? apiNames.post : apiNames.put,
}))

const { isPending, mutateAsync } = useModifyHousingPayment(housingPaymentParams)

const handleHousingPaymentSubmit = props.form.handleSubmit((values: HousingPaymentState) => {
  return submitToastHandler<null>(
    mutateAsync(values),
    `${!housingPaymentId.value ? 'Agregando' : 'Editando'}...`,
    () => {
      closeHousingPaymentDialog()
      return `Alquiler ${!housingPaymentId.value ? 'agregado' : 'actualizado'} con éxito`
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

const openTenancySelect = ref(false)
const valueTenancy = ref<string>('')
const keyTenancy = ref<number>(1)

const paramsTenancies = reactive({
  page: 1,
  limit: 20,
  searchParam: '',
  startDate: '',
  finishDate: '',
})

const { data: tenancies } = useFetchTenancies('', paramsTenancies)

const openHousingRoomSelect = ref(false)
const valueHousingRoom = ref<string>('')
const keyHousingRoom = ref<number>(1)

const paramsHousingRoom = reactive({
  page: 1,
  limit: 20,
  searchParam: '',
  active: 1,
})

const { data: housingRoom } = useFetchHousingRoom('', paramsHousingRoom)

function closeHousingPaymentDialog(): void {
  emit('reset')
  changeParams(false)
}

function changeParams(state: boolean) {
  if (!!state) {
    paramsTenancies.searchParam = props.form.values.tenancy_name
    valueTenancy.value = props.form.values.tenancy_name
    paramsHousingRoom.searchParam = props.form.values.housing_room
    valueHousingRoom.value = `${props.form.values.housing_room} - ${props.form.values.housing}`
  } else {
    paramsTenancies.searchParam = ''
    valueTenancy.value = ''
    paramsHousingRoom.searchParam = ''
    valueHousingRoom.value = ''
    keyTenancy.value++
    keyHousingRoom.value++
  }
}

watch(housingPaymentId, (newValue) => {
  changeParams(newValue)
})

</script>

<template>
  <DialogContent class="sm:max-w-[600px] text-slate-800 dark:dark:text-slate-200">
    <DialogHeader>
      <DialogTitle>{{ housingPaymentId ? 'Editar' : 'Agregar' }} alquiler</DialogTitle>
      <DialogDescription>
        Haz los cambios del alquiler aquí. Click {{ housingPaymentId ? 'Editar' : 'Agregar' }} cuando termines.
      </DialogDescription>
    </DialogHeader>

    <form @submit="handleHousingPaymentSubmit" keep-values>
      <section class="flex flex-col sm:grid grid-cols-2 gap-x-2 gap-y-1 overflow-y-auto max-h-[71vh] p-1">
        <FormField v-slot="{ componentField }" name="tenancy_id">
          <FormItem>
            <FormLabel>Inquilino</FormLabel>

            <Popover v-model:open="openTenancySelect">
              <PopoverTrigger as-child>
                <FormControl>
                  <Button type="button" variant="outline" role="combobox"
                    :class="cn('w-full sm:w-64 justify-between', !componentField.modelValue && 'text-muted-foreground')">
                    {{ valueTenancy || 'Selecciona al inquilino...' }}
                    <CaretSortIcon class="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>

              <PopoverContent class="w-[370px] sm:w-64 p-0">
                <Command :key="keyTenancy" v-model="valueTenancy" class="p-0">
                  <CommandInput class="w-full px-4 py-2" placeholder="Busca al inquilino..."
                    @input="($event) => paramsTenancies.searchParam = $event.target.value" />
                  <X v-if="valueTenancy.length > 0 || paramsTenancies.searchParam.length > 0"
                    class="absolute right-5 top-3" :size="20" @click="() => {
                      paramsTenancies.searchParam = ''
                      valueTenancy = ''
                      keyTenancy++
                    }" />
                  <CommandEmpty>Sin resultados.</CommandEmpty>
                  <CommandList>
                    <CommandGroup>
                      <CommandItem v-for="tenancy in tenancies" :key="tenancy.id" :value="tenancy.name" @select="() => {
                        props.form.setFieldValue('tenancy_id', tenancy.id)
                        valueTenancy = tenancy.name
                        openTenancySelect = false
                      }">
                        {{ tenancy.name }}
                        <CheckIcon
                          :class="cn('ml-auto h-4 w-4', props.form.values.tenancy_id == tenancy.id ? 'opacity-100' : 'opacity-0')" />
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="housing_room_id">
          <FormItem>
            <FormLabel>Habitación</FormLabel>

            <Popover v-model:open="openHousingRoomSelect">
              <PopoverTrigger as-child>
                <FormControl>
                  <Button type="button" variant="outline" role="combobox"
                    :class="cn('w-full sm:w-64 justify-between', !componentField.modelValue && 'text-muted-foreground')">
                    {{ valueHousingRoom || 'Selecciona la habitación...' }}
                    <CaretSortIcon class="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>

              <PopoverContent class="w-[370px] sm:w-64 p-0">
                <Command :key="keyHousingRoom" v-model="valueHousingRoom" class="p-0">
                  <CommandInput class="w-full px-4 py-2" placeholder="Busca al inquilino..."
                    @input="($event) => paramsHousingRoom.searchParam = $event.target.value" />
                  <X v-if="valueHousingRoom.length > 0 || paramsHousingRoom.searchParam.length > 0"
                    class="absolute right-5 top-3" :size="20" @click="() => {
                      paramsHousingRoom.searchParam = ''
                      valueHousingRoom = ''
                      keyHousingRoom++
                    }" />
                  <CommandEmpty>Sin resultados.</CommandEmpty>
                  <CommandList>
                    <CommandGroup>
                      <CommandItem
                        v-for="room in housingRoom.filter(room => room.is_available || room.id == form.values.housing_room_id)"
                        :key="room.id" :value="`${room.room_number} - ${room.housing}`" @select="() => {
                          props.form.setFieldValue('housing_room_id', room.id)
                          valueHousingRoom = `${room.room_number} - ${room.housing}`
                          openHousingRoomSelect = false
                        }">
                        {{ `${room.room_number} - ${room.housing}` }}
                        <CheckIcon
                          :class="cn('ml-auto h-4 w-4', props.form.values.housing_room_id == room.id ? 'opacity-100' : 'opacity-0')" />
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="rental_start_date">
          <FormItem>
            <FormLabel>Fecha de ingreso</FormLabel>
            <FormControl>
              <Input type="datetime-local" v-bind="componentField" autocomplete="off" class="block" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="rental_end_date">
          <FormItem>
            <FormLabel>Fecha de culminación</FormLabel>
            <FormControl>
              <Input type="datetime-local" v-bind="componentField" autocomplete="off" class="block" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="payment">
          <FormItem :class="!form.values.payment_date && 'col-span-full'">
            <FormLabel>Pago</FormLabel>
            <FormControl>
              <Input type="number" step="0.01" v-bind="componentField" autocomplete="off" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="payment_date">
          <FormItem :class="!form.values.payment_date && 'hidden'">
            <FormLabel>Fecha de pago</FormLabel>
            <FormControl>
              <Input type="datetime-local" v-bind="componentField" autocomplete="off" class="block" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="description">
          <FormItem class="col-span-2">
            <FormLabel>Descripción (opcional)</FormLabel>
            <FormControl>
              <Textarea placeholder="Una descripción acerca del alquiler" rows="5" class="resize-none"
                v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </section>
      <DialogFooter>
        <Button type="submit" class="w-full mt-3 p-1" :disabled="isPending">
          {{ housingPaymentId ? 'Editar' : 'Agregar' }}
        </Button>
      </DialogFooter>
    </form>
  </DialogContent>
</template>

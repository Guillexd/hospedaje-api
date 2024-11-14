<script setup lang="ts">
import { Ban, CircleSlash, Eye, FilePlus2, MessageCircleMore, MoreHorizontal, PhoneOutgoing, SquarePen } from 'lucide-vue-next'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '../../components/ui/dropdown-menu'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '../../components/ui/button'
import type { HousingPaymentI, HousingPaymentState } from '../../types/types'
import DialogTrigger from '../../components/ui/dialog/DialogTrigger.vue'
import { computed, ref } from 'vue'
import HousingPaymentDetail from './HousingPaymentDetail.vue'
import { callPerson, messagePerson, submitToastHandler } from '@/utils/utils'
import { apiNames } from '@/enums/apiNames'
import { useCollectHousingPayment } from '../composables/useCollectHousingPayment'

const props = defineProps<{
  housingPayment: HousingPaymentI
}>()

const emit = defineEmits(['update:housing-payment-form'])

function updateFormHousingPayment(): void {
  emit('update:housing-payment-form', props.housingPayment)
}

const isDrawerOpen = ref<boolean>(false)
const isAlertDialogOpen = ref<boolean>(false)
const collectAndNewPaymentOrJustCollectOrCancel = ref<1 | 2 | 3>(1)

const openDrawer = () => {
  isDrawerOpen.value = true
}

const updateDrawerState = (state: boolean) => {
  isDrawerOpen.value = state
}

const openAlertDialog = (option: 1 | 2 | 3) => {
  isAlertDialogOpen.value = true
  collectAndNewPaymentOrJustCollectOrCancel.value = option
}

const updateAlertDialogState = (state: boolean) => {
  isAlertDialogOpen.value = state
}

const collectionParams = computed(() => ({
  url: `${apiNames.housing_payment}/${collectAndNewPaymentOrJustCollectOrCancel.value === 1 ? apiNames.collect_and_payment : collectAndNewPaymentOrJustCollectOrCancel.value === 2 ? apiNames.just_collect : apiNames.cancel_collect}`,
  method: apiNames.post,
}))

const { mutateAsync } = useCollectHousingPayment(collectionParams)

const husingPaymentState = computed((): HousingPaymentState => {
  return {
    id: props.housingPayment.id,
    housing_room_id: (props.housingPayment as HousingPaymentState).housing_room_id,
    tenancy_id: (props.housingPayment as HousingPaymentState).tenancy_id,
    payment: props.housingPayment.payment,
    rental_start_date: props.housingPayment.rental_start_date,
    rental_end_date: props.housingPayment.rental_end_date,
    description: props.housingPayment.description,
  }
})

const handleClick = () => {
  return submitToastHandler<null>(
    mutateAsync(husingPaymentState.value),
    `${collectAndNewPaymentOrJustCollectOrCancel.value === 1 ? 'Cobrando y agregando nuevo alquiler' : collectAndNewPaymentOrJustCollectOrCancel.value === 2 ? 'Cobrando' : 'Cancelando'}...`,
    () => {
      return `Alquiler ${collectAndNewPaymentOrJustCollectOrCancel.value === 1 ? 'cobrado y uno nuevo creado' : collectAndNewPaymentOrJustCollectOrCancel.value === 2 ? 'cobrado' : 'cancelado'} con éxito para ${props.housingPayment.tenancy_name}`
    },
    (err) => {
      if (typeof err === 'object') {
        return `Acción fallida`
      }
      return err
    },
  )
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="w-8 h-8 p-0">
        <span class="sr-only">Abrir menu</span>
        <MoreHorizontal class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Opciones</DropdownMenuLabel>
      <DropdownMenuItem v-if="!housingPayment.payment_date"
        class="flex items-center gap-x-2 text-amber-700 dark:text-amber-500 py-2 cursor-pointer" @click="openAlertDialog(1)">
        <FilePlus2 class="w-5 h-5" />
        Cobrar y agregar alquiler
      </DropdownMenuItem>
      <DropdownMenuItem v-if="!housingPayment.payment_date"
        class="flex items-center gap-x-2 text-yellow-700 dark:text-yellow-500 py-2 cursor-pointer" @click="openAlertDialog(2)">
        <CircleSlash class="w-5 h-5" />
        Solo cobrar
      </DropdownMenuItem>
      <DropdownMenuItem v-if="!!housingPayment.payment_date"
        class="flex items-center gap-x-2 text-rose-700 dark:text-rose-500 py-2 cursor-pointer" @click="openAlertDialog(3)">
        <Ban class="w-5 h-5" />
        Cancelar cobro
      </DropdownMenuItem>
      <DropdownMenuItem @click.stop="openDrawer" class="flex items-center gap-x-2 py-2 cursor-pointer">
        <Eye class="w-5 h-5" />
        Ver
      </DropdownMenuItem>
      <DialogTrigger class="w-full">
        <DropdownMenuItem @click="updateFormHousingPayment"
          class="flex items-center gap-x-2 text-sky-700 dark:text-sky-500 py-2 cursor-pointer">
          <SquarePen class="w-5 h-5" />
          Editar
        </DropdownMenuItem>
      </DialogTrigger>
      <DropdownMenuItem as="a" class="flex items-center gap-x-2 text-red-700 dark:text-red-500 py-2 cursor-pointer"
        :href="callPerson(housingPayment.tenancy_phone)">
        <PhoneOutgoing class="w-5 h-5" />
        Llamar
      </DropdownMenuItem>
      <DropdownMenuItem as="a" class="flex items-center gap-x-2 text-green-700 dark:text-green-500 py-2 cursor-pointer"
        :href="messagePerson(housingPayment.tenancy_phone, '?text=Buen%20día')" target="_blank">
        <MessageCircleMore class="w-5 h-5" />
        Whatsapp
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>

  <HousingPaymentDetail :is-drawer-open="isDrawerOpen" :housing-payment="housingPayment"
    @update:drawer-state="updateDrawerState" />

  <AlertDialog :open="isAlertDialogOpen" @update:open="updateAlertDialogState($event)">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle class="dark:text-slate-200">
          {{ `¿Estás seguro que quieres ${collectAndNewPaymentOrJustCollectOrCancel === 1 ? 'cobrar y agregar un nuevo alquiler'
            : collectAndNewPaymentOrJustCollectOrCancel === 2 ?
            'solo cobrar el alquiler' : 'cancelar este cobro de alquiler'}` }}
        </AlertDialogTitle>
        <AlertDialogDescription>
          {{ `Esta accion ${collectAndNewPaymentOrJustCollectOrCancel === 1 ? 'cobrará y agregará un nuevo alquiler para' : collectAndNewPaymentOrJustCollectOrCancel === 2 ? 'solo cobrará el alquiler de' : 'cancelará este cobro de alquiler de'}` }}
          <span class="font-bold text-slate-300">{{ housingPayment.tenancy_name }} - {{
            housingPayment.tenancy_identity_document }}: {{ housingPayment.tenancy_document_number }}</span>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel class="dark:text-slate-200">Cancelar</AlertDialogCancel>
        <AlertDialogAction @click="handleClick">Sí, ¡seguro!</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

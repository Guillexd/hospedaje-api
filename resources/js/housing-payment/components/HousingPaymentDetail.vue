<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '../../components/ui/drawer'
import type { HousingPaymentI } from '@/types/types'
import { ref } from 'vue'
import { CircleCheckBig, CircleX, IdCard } from 'lucide-vue-next'
import { keyNames } from '@/enums/keyNames'
import { getLocaleDate } from '@/utils/utils'

defineProps<{
  isDrawerOpen: boolean,
  housingPayment: HousingPaymentI,
}>()

const emit = defineEmits(['update:drawer-state'])

function updateDrawerState(value: boolean) {
  emit('update:drawer-state', value)
}

const iconSize = (window.innerWidth > 1023 && window.innerWidth < 1290) ? 270 : 350

const selectedImage = ref<string | null>(null)
const transitionName = ref<string>('')

function openImage(image: string, name: string) {
  transitionName.value = name
  if (document.startViewTransition) {
    document.startViewTransition(() => {
      selectedImage.value = image
    })
  } else {
    selectedImage.value = image
  }
}

function closeImage() {
  if (document.startViewTransition) {
    document.startViewTransition(() => {
      selectedImage.value = null
      transitionName.value = ''
    })
  } else {
    selectedImage.value = null
    transitionName.value = ''
  }
}
</script>

<template>
  <Drawer :open="isDrawerOpen" @update:open="updateDrawerState($event)">
    <DrawerContent>
      <div :class="`p-4 overflow-y-auto ${!selectedImage ? 'max-h-[80vh] sm:max-h-[90vh]' : 'h-[97vh]'}`">
        <DrawerHeader class="max-w-lg mx-auto">
          <DrawerTitle class="text-xl font-semibold dark:text-slate-200">Detalles del alquiler</DrawerTitle>
          <DrawerDescription class="text-gray-500">
            Aquí puedes ver los detalles de este alquiler.
          </DrawerDescription>
        </DrawerHeader>
        <main class="grid lg:grid-cols-[auto_1fr_auto] gap-3">
          <section class="bg-white dark:bg-slate-300 shadow-lg rounded-lg p-4 max-w-xl w-full mx-auto lg:order-2">
            <h3 class="text-lg font-bold">Información del alquiler</h3>
            <div class="flex justify-between">
              <span class="font-medium">Nombre del inquilino:</span>
              <span class="text-gray-700">{{ housingPayment.tenancy_name }}</span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium">{{ housingPayment.tenancy_identity_document }}:</span>
              <span class="text-gray-700">{{ housingPayment.tenancy_document_number }}</span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium">Teléfono:</span>
              <span class="text-gray-700">{{ housingPayment.tenancy_phone }}</span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium">{{ housingPayment.housing }}</span>
              <span class="text-gray-700">Habitación {{ housingPayment.housing_room }}</span>
            </div>
            <p class="text-gray-700 font-semibold text-center">
              {{ getLocaleDate(housingPayment.rental_start_date) }}
              hasta
              {{ getLocaleDate(housingPayment.rental_end_date) }}
            </p>
            <div class="flex justify-between">
              <span class="font-medium">Pago:</span>
              <span class="text-gray-700 font-bold">{{ housingPayment.payment.toLocaleString(keyNames.lang, {
                style: "currency", currency: "PEN"
              }) }}</span>
            </div>
            <div class="flex justify-between font-bold">
              <span class="font-medium">Estado:</span>
              <div v-if="!!housingPayment.payment_date" class="flex items-center gap-1 text-green-700">
                <CircleCheckBig :size="33" />
                {{ getLocaleDate(housingPayment.payment_date) }}
              </div>
              <div v-if="!housingPayment.payment_date" class="flex items-center gap-1 text-blue-700">
                <CircleX :size="33" />
                Pendiente
              </div>
            </div>

            <p v-if="!!housingPayment.description" class="text-black whitespace-pre-wrap font-medium mt-5 text-justify">
              {{ housingPayment.description }}</p>
          </section>

          <picture class="mx-auto w-full sm:w-[50vw] lg:w-[25vw] lg:order-1">
            <img v-if="!!housingPayment.first_document_image_url" :src="housingPayment.first_document_image_url"
              alt="documento" class="rounded-lg mx-auto" :style="{ viewTransitionName: !!selectedImage ? '' : `img-1` }"
              @click.stop="openImage(housingPayment.first_document_image_url, `img-1`)">
            <section v-else class="animate-pulse">
              <IdCard class="mx-auto text-slate-500" :size="iconSize" />
            </section>
          </picture>

          <picture class="mx-auto w-full sm:w-[50vw] lg:w-[25vw] lg:order-3">
            <img v-if="!!housingPayment.second_document_image_url" :src="housingPayment.second_document_image_url"
              alt="documento" class="rounded-lg mx-auto" :style="{ viewTransitionName: !!selectedImage ? '' : `img-2` }"
              @click.stop="openImage(housingPayment.second_document_image_url, `img-2`)">
            <section v-else class="animate-pulse">
              <IdCard class="mx-auto text-slate-500" :size="iconSize" />
            </section>
          </picture>
        </main>
        <DrawerFooter class="mt-4">
          <DrawerClose as-child>
            <Button variant="outline" class="max-w-lg w-full mx-auto dark:text-slate-200">
              Cerrar
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </div>
      <picture v-if="!!selectedImage"
        class="fixed top-0 left-0 w-screen h-screen flex items-center justify-center backdrop-blur-md z-50"
        @click.stop="closeImage">
        <img :src="selectedImage" class="max-h-[98vh] rounded-2xl mx-auto" alt="documento"
          :style="{ viewTransitionName: transitionName }">
      </picture>
    </DrawerContent>
  </Drawer>
</template>

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
import type { HousingRoomI } from '@/types/types'
import { BadgeCheck, BadgeX } from 'lucide-vue-next'

defineProps<{
  isDrawerOpen: boolean,
  housing_room: HousingRoomI,
}>()

const emit = defineEmits(['update:drawer-state'])

function updateDrawerState(value: boolean) {
  emit('update:drawer-state', value)
}
</script>

<template>
  <Drawer :open="isDrawerOpen" @update:open="updateDrawerState($event)">
    <DrawerContent>
      <div class="mx-auto w-full max-w-lg p-4">
        <DrawerHeader>
          <DrawerTitle class="text-xl font-semibold dark:text-slate-200">Detalles de la habitación</DrawerTitle>
          <DrawerDescription class="text-gray-500">
            Aquí puedes ver los detalles de esta habitación.
          </DrawerDescription>
        </DrawerHeader>

        <div class="mt-4 bg-white dark:bg-slate-300 shadow-lg rounded-lg p-4">
          <div class="mb-4">
            <h3 class="text-lg font-bold">Información detallada</h3>
            <div class="flex justify-between">
              <span class="font-medium">Habitación:</span>
              <span class="text-gray-700">{{ housing_room.room_number }}</span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium">Propiedad:</span>
              <span class="text-gray-700">{{ housing_room.housing }}</span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium">Estado:</span>
              <span class="text-gray-700 font-semibold flex gap-x-2">
                {{ housing_room.is_active ? 'Activo' : 'No activo' }}
                <BadgeCheck v-if="housing_room.is_active" class="text-green-500" />
                <BadgeX v-else class="text-red-700" />
              </span>
            </div>
          </div>
        </div>

        <DrawerFooter class="mt-4">
          <DrawerClose as-child>
            <Button variant="outline" class="w-full dark:text-slate-200">
              Cerrar
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </div>
    </DrawerContent>
  </Drawer>
</template>

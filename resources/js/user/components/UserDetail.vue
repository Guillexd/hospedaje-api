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
import type { UserI } from '@/types/types'

defineProps<{
  isDrawerOpen: boolean,
  user: UserI,
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
          <DrawerTitle class="text-xl font-semibold dark:text-slate-200">Detalles de usuario</DrawerTitle>
          <DrawerDescription class="text-gray-500">
            Aquí puedes ver los detalles de este usuario.
          </DrawerDescription>
        </DrawerHeader>

        <div class="mt-4 bg-white dark:bg-slate-300 shadow-lg rounded-lg p-4">
          <div class="mb-4">
            <h3 class="text-lg font-bold">Información Personal</h3>
            <div class="flex justify-between">
              <span class="font-medium">Nombre:</span>
              <span class="text-gray-700">{{ user.name }}</span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium">DNI:</span>
              <span class="text-gray-700">{{ user.dni }}</span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium">Teléfono:</span>
              <span class="text-gray-700">{{ user.phone }}</span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium">Correo:</span>
              <span class="text-gray-700">{{ user.email }}</span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium">Fecha de Nacimiento:</span>
              <span class="text-gray-700">{{ user.birth_date }}</span>
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

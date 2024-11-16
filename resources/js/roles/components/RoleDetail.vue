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
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import type { RoleI } from '@/types/types'
import { Check } from 'lucide-vue-next'

defineProps<{
  isDrawerOpen: boolean,
  role: RoleI,
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
          <DrawerTitle class="text-xl font-semibold dark:text-slate-200">Detalles del rol</DrawerTitle>
          <DrawerDescription class="text-gray-500">
            Aquí puedes ver los detalles de este rol.
          </DrawerDescription>
        </DrawerHeader>

        <div class="mt-4 bg-white dark:bg-slate-300 shadow-lg rounded-lg p-4">
          <div class="mb-4">
            <h3 class="text-lg font-bold">Información de rol</h3>
            <div class="flex justify-between">
              <span class="font-medium">Nombre:</span>
              <span class="text-gray-700">{{ role.description }}</span>
            </div>
            <div class="flex flex-col">
              <span class="font-medium">Permisos:</span>
              <Command class="mt-4">
                <CommandInput placeholder="Busca un permiso..." />
                <CommandList>
                  <CommandEmpty>No hay resultados.</CommandEmpty>
                  <CommandItem v-for="permission in role.permissions" class="flex text-green-700 dark:text-green-600"
                    :value="permission.description">
                    <Check class="mr-2" />
                    {{ permission.description }}
                  </CommandItem>
                </CommandList>
              </Command>
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

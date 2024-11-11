<script setup lang="ts">
import { Eye, MoreHorizontal, SquarePen } from 'lucide-vue-next'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '../../components/ui/dropdown-menu'
import { Button } from '../../components/ui/button'
import type { HousingRoomI } from '../../types/types'
import DialogTrigger from '../../components/ui/dialog/DialogTrigger.vue'
import { ref } from 'vue'
import HousingRoomDetail from './HousingRoomDetail.vue'

const props = defineProps<{
  housing_room: HousingRoomI
}>()

const emit = defineEmits(['update:housing-room-form'])

function updateFormHousingRoom(): void {
  emit('update:housing-room-form', props.housing_room)
}

const isDrawerOpen = ref<boolean>(false)

const openDrawer = () => {
  isDrawerOpen.value = true
}

const updateDrawerState = (state: boolean) => {
  isDrawerOpen.value = state
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
      <DropdownMenuItem @click.stop="openDrawer" class="flex items-center gap-x-2 py-2 cursor-pointer">
        <Eye class="w-5 h-5" />
        Ver
      </DropdownMenuItem>
      <DialogTrigger class="w-full">
        <DropdownMenuItem @click="updateFormHousingRoom" class="flex items-center gap-x-2 text-sky-800 py-2 cursor-pointer">
          <SquarePen class="w-5 h-5" />
          Editar
        </DropdownMenuItem>
      </DialogTrigger>
    </DropdownMenuContent>
  </DropdownMenu>

  <HousingRoomDetail :is-drawer-open="isDrawerOpen" :housing_room="housing_room" @update:drawer-state="updateDrawerState" />
</template>

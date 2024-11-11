<script setup lang="ts">
import { Eye, MoreHorizontal, SquarePen } from 'lucide-vue-next'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '../../components/ui/dropdown-menu'
import { Button } from '../../components/ui/button'
import type { HousingI } from '../../types/types'
import DialogTrigger from '../../components/ui/dialog/DialogTrigger.vue'
import { ref } from 'vue'
import HousingDetail from './HousingDetail.vue'

const props = defineProps<{
  housing: HousingI
}>()

const emit = defineEmits(['update:housing-form'])

function updateFormHousing(): void {
  emit('update:housing-form', props.housing)
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
        <DropdownMenuItem @click="updateFormHousing" class="flex items-center gap-x-2 text-sky-800 py-2 cursor-pointer">
          <SquarePen class="w-5 h-5" />
          Editar
        </DropdownMenuItem>
      </DialogTrigger>
    </DropdownMenuContent>
  </DropdownMenu>

  <HousingDetail :is-drawer-open="isDrawerOpen" :housing="housing" @update:drawer-state="updateDrawerState" />
</template>

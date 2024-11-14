<script setup lang="ts">
import { Eye, MessageCircleMore, MoreHorizontal, PhoneOutgoing, SquarePen } from 'lucide-vue-next'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '../../components/ui/dropdown-menu'
import { Button } from '../../components/ui/button'
import type { TenancyI } from '../../types/types'
import DialogTrigger from '../../components/ui/dialog/DialogTrigger.vue'
import { ref } from 'vue'
import TenancyDetail from './TenancyDetail.vue'
import { callPerson, messagePerson } from '@/utils/utils'

const props = defineProps<{
  tenancy: TenancyI
}>()

const emit = defineEmits(['update:tenancy-form'])

function updateFormTenancy(): void {
  emit('update:tenancy-form', props.tenancy)
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
        <DropdownMenuItem @click="updateFormTenancy" class="flex items-center gap-x-2 text-sky-700 dark:text-sky-500 py-2 cursor-pointer">
          <SquarePen class="w-5 h-5" />
          Editar
        </DropdownMenuItem>
      </DialogTrigger>
      <DropdownMenuItem as="a" class="flex items-center gap-x-2 text-red-700 dark:text-red-500 py-2 cursor-pointer" :href="callPerson(tenancy.phone)">
        <PhoneOutgoing class="w-5 h-5" />
        Llamar
      </DropdownMenuItem>
      <DropdownMenuItem as="a" class="flex items-center gap-x-2 text-green-700 dark:text-green-500 py-2 cursor-pointer"
        :href="messagePerson(tenancy.phone, '?text=Buen%20día')" target="_blank">
        <MessageCircleMore class="w-5 h-5" />
        Whatsapp
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>

  <TenancyDetail :is-drawer-open="isDrawerOpen" :tenancy="tenancy" @update:drawer-state="updateDrawerState" />
</template>

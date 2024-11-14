<script setup lang="ts">
import { Eye, MessageCircleMore, MoreHorizontal, PhoneOutgoing, SquarePen } from 'lucide-vue-next'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '../../components/ui/dropdown-menu'
import { Button } from '../../components/ui/button'
import type { UserI } from '../../types/types'
import DialogTrigger from '../../components/ui/dialog/DialogTrigger.vue'
import { ref } from 'vue'
import UserDetail from './UserDetail.vue'
import { callPerson, messagePerson } from '@/utils/utils'

const props = defineProps<{
  user: UserI
}>()

const emit = defineEmits(['update:user-form'])

function updateFormUser(): void {
  emit('update:user-form', props.user)
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
        <DropdownMenuItem @click="updateFormUser" class="flex items-center gap-x-2 text-sky-700 dark:text-sky-500 py-2 cursor-pointer">
          <SquarePen class="w-5 h-5" />
          Editar
        </DropdownMenuItem>
      </DialogTrigger>
      <DropdownMenuItem as="a" class="flex items-center gap-x-2 text-red-700 dark:text-red-500 py-2 cursor-pointer" :href="callPerson(user.phone)">
        <PhoneOutgoing class="w-5 h-5" />
        Llamar
      </DropdownMenuItem>
      <DropdownMenuItem as="a" class="flex items-center gap-x-2 text-green-700 dark:text-green-500 py-2 cursor-pointer"
        :href="messagePerson(user.phone, '?text=Buen%20día')" target="_blank">
        <MessageCircleMore class="w-5 h-5" />
        Whatsapp
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>

  <UserDetail :is-drawer-open="isDrawerOpen" :user="user" @update:drawer-state="updateDrawerState" />
</template>

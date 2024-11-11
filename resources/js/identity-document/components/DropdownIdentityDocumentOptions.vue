<script setup lang="ts">
import { MoreHorizontal, SquarePen } from 'lucide-vue-next'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '../../components/ui/dropdown-menu'
import { Button } from '../../components/ui/button'
import type { IdentityDocumentI } from '../../types/types'
import DialogTrigger from '../../components/ui/dialog/DialogTrigger.vue'

const props = defineProps<{
  identity_document: IdentityDocumentI
}>()

const emit = defineEmits(['update:identity-document-form'])

function updateFormIdentityDocument(): void {
  emit('update:identity-document-form', props.identity_document)
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
      <DialogTrigger class="w-full">
        <DropdownMenuItem @click="updateFormIdentityDocument" class="flex items-center gap-x-2 text-sky-800 py-2 cursor-pointer">
          <SquarePen class="w-5 h-5" />
          Editar
        </DropdownMenuItem>
      </DialogTrigger>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

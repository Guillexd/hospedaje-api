<script setup lang="ts">
import { DialogTrigger } from '../components/ui/dialog'
import Button from '../components/ui/button/Button.vue'
import { Loader } from 'lucide-vue-next'

defineProps({
  title: {
    required: true,
    type: String,
  },
  icon: {
    required: true,
    type: Function,
  },
  isFetching: {
    required: true,
    type: Boolean,
  },
})

const emit = defineEmits(['reset:initial-form'])

function setInitialForm(): void {
    emit('reset:initial-form')
}
</script>

<template>
  <div class="w-full flex flex-col md:flex-row justify-center md:justify-between">
    <section class="font-bold text-3xl text-center sm:flex justify-center items-end text-slate-800 dark:text-slate-200">
      <component :is="icon" class="hidden sm:block h-12 w-12 mr-2" />
      <span class="text-center">{{ title }}</span>
    </section>
    <DialogTrigger as-child>
      <Button variant="default" class="mx-auto md:mx-0 py-6 mt-4 md:mt-0" :disabled="isFetching" @click="setInitialForm">
        <span class="text-lg font-bold">{{ isFetching ? 'Cargando' : 'Agregar' }}</span>
        <component v-if="isFetching" :is="Loader" class="h-8 w-8 ml-2 animate-spin" />
        <component v-else :is="icon" class="h-8 w-8 ml-2" />
      </Button>
    </DialogTrigger>
  </div>
</template>

<script setup lang="ts">
import { X } from 'lucide-vue-next'

defineProps<{
  filters: Array<{
    tag: string,
    name: string,
    render: boolean,
    handleClick: () => void,
  }>;
  render: boolean,
}>()
</script>

<template>
  <section v-if="render"
    class="mt-3 overflow-hidden flex gap-y-1 items-center flex-wrap cursor-pointer">
    <span class='font-medium me-4 dark:text-white'>Filtros activos: </span>
    <template v-for="(filter, index) in filters">
      <div v-if="filter.render" @click="filter.handleClick"
        class="bg-slate-300 dark:bg-slate-700 text-slate-800 dark:text-slate-300 rounded-lg ps-2 me-2 hover:bg-vetgreen-100 cursor-pointer text-sm flex justify-center items-center">
        <span><strong>{{ filter.tag }}: </strong>{{ filter.name }}</span>
        <X :size="30" class="px-1 animate-pulse" />
      </div>
    </template>
  </section>
</template>

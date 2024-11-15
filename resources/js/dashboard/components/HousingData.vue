
<script setup lang="ts">
import { keyNames } from '@/enums/keyNames'
import { ArrowDownUp, BookUser } from 'lucide-vue-next';

defineProps<{
  expectedAmount: number,
  tenancies: number,
}>()
</script>

<template>
  <section class="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6">
    <div
      class="bg-white dark:bg-slate-800 dark:text-white shadow-lg rounded-lg p-6 flex flex-col justify-between border-l-4 border-teal-500 dark:border-teal-400">
      <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
        Monto total esperado en
        <strong class="capitalize font-bold">{{ new Date().toLocaleString(keyNames.lang, { month: 'long' }) }}</strong>
      </h3>
      <span class="text-4xl font-bold text-teal-600 dark:text-teal-400 mt-2">
        {{ expectedAmount.toLocaleString(keyNames.lang, { style: 'currency', currency: 'PEN' }) }}
      </span>
      <div class="mt-4 flex items-center text-sm text-slate-600 dark:text-slate-400">
        <ArrowDownUp class="h-5 w-5 mr-1 text-teal-500 dark:text-teal-300" />
        <span class="text-slate-500 dark:text-slate-300">Ingreso mensual proyectado</span>
      </div>
    </div>

    <div
      class="bg-white dark:bg-slate-800 dark:text-white shadow-lg rounded-lg p-6 flex flex-col justify-between border-l-4 border-indigo-500 dark:border-indigo-400">
      <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
        Cantidad de inquilinos activos en
        <strong class="capitalize font-bold">{{ new Date().toLocaleString(keyNames.lang, { month: 'long' }) }}</strong>
      </h3>
      <span class="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mt-2">
        {{ tenancies }}
      </span>
      <div class="mt-4 flex items-center text-sm text-slate-600 dark:text-slate-400">
        <BookUser class="h-6 w-6 mr-1 text-indigo-500 dark:text-indigo-300" />
        <span class="text-slate-500 dark:text-slate-300">Inquilinos activos</span>
      </div>
    </div>
  </section>
</template>

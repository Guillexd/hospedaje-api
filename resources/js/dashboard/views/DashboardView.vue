<script setup lang="ts">
import { DonutChart } from '@/components/ui/chart-donut'
import { ArrowDownUp, ChartPie, ChartBar } from 'lucide-vue-next'
import { keyNames } from '@/enums/keyNames'
import { LineChart } from '@/components/ui/chart-line'
import type { DashboardI } from '@/types/types'

const data: DashboardI = {
  housingState: [
    {
      housing: 'Hos. Arequipa',
      data: [
        { name: 'Cuartos ocupados', total: 8 },
        { name: 'Cuartos disponibles', total: 10 },
        { name: 'Cuartos inactivos', total: 2 },
      ]
    },
    {
      housing: 'Llamus',
      data: [
        { name: 'Cuartos ocupados', total: 6 },
        { name: 'Cuartos disponibles', total: 2 },
        { name: 'Cuartos inactivos', total: 1 },
      ]
    },
  ],
  incomeState: [
    { month: 'Enero', income: Math.floor(Math.random() * (1000 - 300 + 1)) + 300 },
    { month: 'Abril', income: Math.floor(Math.random() * (1000 - 300 + 1)) + 300 },
    { month: 'Agosto', income: Math.floor(Math.random() * (1000 - 300 + 1)) + 300 },
    { month: 'Diciembre', income: Math.floor(Math.random() * (1000 - 300 + 1)) + 300 },
  ]
}

const formatedData = data.incomeState.map(item => ({
  month: item.month,
  Ingreso: item.income,
}))

const formatCurrency = (tick: any) => {
  return typeof tick === 'number'
    ? tick.toLocaleString(keyNames.lang, { style: 'currency', currency: 'PEN' })
    : '';
}

// const payments = ref<HousingPaymentI[]>([])

// onMounted(async () => {
//   payments.value = (await fetchData<HousingPaymentI[]>(`${apiNames.housing_payment}/${apiNames.get_rent_expire}`)).data
// })
</script>

<template>
  <section class="w-full flex flex-col md:flex-row justify-center md:justify-between">
    <div class="font-bold text-3xl text-center flex justify-center items-center text-slate-800 dark:text-slate-200">
      <ChartPie class="h-12 w-12 mr-2" />
      <span class="text-center">Dashboard</span>
    </div>
  </section>

  <section class="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6">
    <div
      class="bg-white dark:bg-slate-800 dark:text-white shadow-lg rounded-lg p-6 flex flex-col justify-between border-l-4 border-teal-500 dark:border-teal-400">
      <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
        Monto total esperado en
        <strong class="capitalize font-bold">{{ new Date().toLocaleString(keyNames.lang, { month: 'long' }) }}</strong>
      </h3>
      <span class="text-4xl font-bold text-teal-600 dark:text-teal-400 mt-2">
        S/. 2000.00
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
        50
      </span>
      <div class="mt-4 flex items-center text-sm text-slate-600 dark:text-slate-400">
        <ChartBar class="h-5 w-5 mr-1 text-indigo-500 dark:text-indigo-300" />
        <span class="text-slate-500 dark:text-slate-300">Inquilinos activos</span>
      </div>
    </div>
  </section>

  <section class="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6">
    <DonutChart v-for="(chart, index) in data.housingState" :key="index" index="name" :category="'total'"
      :data="chart.data" :type="'pie'"
      class="w-full h-[60vh] rounded-lg shadow-lg border-b-yellow-100 border-2 bg-white dark:bg-slate-800 pb-20"
      :colors="[
        'rgba(52, 152, 219, 0.8)',
        'rgba(46, 204, 113, 0.8)',
        'rgba(135, 206, 235, 0.8)',
      ]">
      <h4 class="text-xl font-bold text-teal-700 dark:text-teal-300 text-center my-4">Estado de las habitaciones
        en {{ chart.housing }}</h4>
    </DonutChart>
    <LineChart :data="formatedData" index="month" :categories="['Ingreso']" :showLegend="false"
      :y-formatter="formatCurrency"
      class="col-span-full rounded-lg shadow-lg border-b-yellow-100 border-2 bg-white dark:bg-slate-800 pb-20"
      :colors="['rgba(52, 152, 219, 0.8)']">
      <h4 class="text-xl font-bold text-teal-700 dark:text-teal-300 text-center my-4">Ingresos por Cuatrimestre</h4>
    </LineChart>
  </section>
</template>

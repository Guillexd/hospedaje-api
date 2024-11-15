<script setup lang="ts">
import { DonutChart } from '@/components/ui/chart-donut'
import { keyNames } from '@/enums/keyNames'
import { LineChart } from '@/components/ui/chart-line'
import { VisBulletLegend } from '@unovis/vue'
import { BulletShape } from '@unovis/ts'

interface HousingData {
  name: string
  total: number
}

interface HousingState {
  housing: string
  data: HousingData[]
}

interface IncomeState {
  month: string
  Ingreso: number
}

const props = defineProps<{
  housingState: HousingState[]
  incomeState: IncomeState[]
}>()

const colors = [
  'rgba(46, 204, 113, 0.7)',
  'rgba(52, 152, 219, 0.7)',
  'rgba(135, 206, 235, 0.7)',
]

const formatLegend = (data: HousingData[]) => {
  const format = data.map((el, i) => (
    {
      ...el,
      shape: BulletShape.Circle,
      color: colors[i],
    }
  ))
  return format
}

const formatCurrency = (tick: any) => {
  return typeof tick === 'number'
    ? tick.toLocaleString(keyNames.lang, { style: 'currency', currency: 'PEN' })
    : ''
}
</script>
<template>
  <section class="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6">
    <DonutChart v-for="(chart, index) in props.housingState" :key="index" index="name" :category="'total'"
      :data="chart.data" :type="'pie'"
      class="w-full h-[60vh] rounded-lg shadow-lg border-green-500 dark:border-green-400 border-l-4 bg-white dark:bg-slate-800 pb-48"
      :colors="colors">
      <h4 class="text-xl font-semibold text-green-700 dark:text-green-400 text-center my-4 pb-24">
        Estado de las habitaciones en
        <strong class="capitalize font-bold">
          {{ chart.housing }}
          <VisBulletLegend :items="formatLegend(chart.data)" orientation="vertical" class="absolute mx-10"
            label-font-size="medium" />
        </strong>
      </h4>
    </DonutChart>
    <LineChart :data="props.incomeState" index="month" :categories="['Ingreso']" :showLegend="false"
      :y-formatter="formatCurrency"
      class="col-span-full rounded-lg shadow-lg border-sky-500 dark:border-sky-400 border-l-4 bg-white dark:bg-slate-800 pb-20"
      :colors="['rgba(52, 152, 219, 0.8)']">
      <h4 class="text-xl font-bold text-sky-700 dark:text-sky-300 text-center my-4">Ingresos por Cuatrimestre</h4>
    </LineChart>
  </section>
</template>

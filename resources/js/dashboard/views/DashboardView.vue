<script setup lang="ts">
import { DonutChart } from '@/components/ui/chart-donut'
import { AreaChart } from '@/components/ui/chart-area'

const data1 = [
  { name: 'Jan', total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Feb', total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Mar', total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Apr', total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
  { name: 'May', total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Jun', total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Jul', total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
]

const data2 = [
  { name: 'Ene', total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Feb', total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Mar', total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Abr', total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
  { name: 'May', total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Jun', total: Math.floor(Math.random() * 2000) + 500, predicted: Math.floor(Math.random() * 2000) + 500 },
]
</script>

<template>

    <DonutChart index="name" :category="'total'" :data="data1" :type="'pie'"
      :colors="['#4F8A8B', '#F4A300', '#DA3F3A', '#71C8B9', '#2C3E50', '#E74C3C']" :filterOpacity="10" />
    <AreaChart index="name" :data="data2" :categories="['total', 'predicted']" />

</template>



Cuartos ocupados vs. Cuartos disponibles: Comparativa entre la cantidad de cuartos ocupados y los disponibles.
Ejemplo de gráfico: Gráfico de torta mostrando la proporción de ocupación.


Total de pagos mensuales: Monto total pagado por todos los inquilinos cada mes.
Ejemplo de gráfico: Gráfico de barras con los pagos mensuales.


Porcentaje de ocupación mensual/anual: Cuántos cuartos están ocupados en comparación con la capacidad total de los
cuartos.
Ejemplo de gráfico: Gráfico de barras o líneas mostrando la ocupación mensual durante el último año.


Gráfico de Líneas
El gráfico de líneas es ideal para mostrar cómo cambian las tendencias a lo largo del tiempo y comparar diferentes
series de datos.
Ejemplo: Ingresos Mensuales por Alquiler

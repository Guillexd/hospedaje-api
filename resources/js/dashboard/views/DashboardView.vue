<script setup lang="ts">
import { keyNames } from '@/enums/keyNames'
import type { DashboardI } from '@/types/types'
import { computed, onMounted, ref } from 'vue'
import { fetchData } from '@/utils/utils'
import { apiNames } from '@/enums/apiNames'
import Title from '../components/Title.vue'
import HousingData from '../components/HousingData.vue'
import HousingGraphics from '../components/HousingGraphics.vue'

const formattedDate = (date: string) => {
  return new Date(date).toLocaleDateString(keyNames.lang, {
    year: 'numeric',
    month: 'long',
  })
}

const dashbord = ref<DashboardI>()

const formatedData = computed(() => {
  if (!dashbord.value) return {
    expectedAmount: 0,
    tenancies: 0,
    housingState: [],
    incomeState: []
  }
  return {
    ...dashbord.value,
    incomeState: dashbord.value.incomeState.map(item => ({
      month: formattedDate(item.month),
      Ingreso: parseFloat(item.income),
    }))
  }
})

onMounted(async () => {
  dashbord.value = (await fetchData<DashboardI>(`${apiNames.dashboard}/${apiNames.list_action}`)).data
})
</script>

<template>
  <Title />
  <HousingData :expected-amount="formatedData.expectedAmount" :tenancies="formatedData.tenancies" />
  <HousingGraphics :housing-state="formatedData.housingState" :income-state="formatedData.incomeState" />
</template>

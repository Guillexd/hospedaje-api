<script setup lang="ts">
import { type PropType } from 'vue'
import type { DateRange } from 'radix-vue'
import RangeCalendar from '../components/ui/range-calendar/RangeCalendar.vue'
import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date'
import { keyNames } from '@/enums/keyNames'

defineProps({
  dates: {
    type: Object as PropType<DateRange | undefined>,
    required: true,
  },
  minValue: {
    type: CalendarDate,
    default: new CalendarDate(2020, 1, 1)
  },
  maxValue: {
    type: CalendarDate,
    default: today(getLocalTimeZone())
  },
})

const emit = defineEmits<{ (event: 'update:dates', newRange: DateRange): void }>()

function onDateChange(newRange: DateRange) {
  emit('update:dates', newRange)
}
</script>

<template>
  <RangeCalendar :default-value="dates" @update:model-value="(value) => onDateChange(value)"
    calendar-label="Fechas" :min-value="minValue" :max-value="maxValue" initial-focus
    class="rounded-md border dark:text-white capitalize" :locale="keyNames.lang" />
</template>

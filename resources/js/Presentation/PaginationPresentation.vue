<script setup lang="ts">
import { type PropType } from 'vue'
import { Button } from '../components/ui/button'
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from '../components/ui/pagination'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { PaginationMeta } from '../types/types'

const props = defineProps({
  meta: {
    type: Object as PropType<PaginationMeta>,
    required: true,
  },
  onChangePage: {
    type: Function as PropType<(page: number) => void>,
    required: true,
  },
  onChangeLimit: {
    type: Function as PropType<(limit: number) => void>,
    required: true,
  },
})

const siblingCount = window.innerWidth >= 640 ? 1 : 0
</script>

<template>
  <Pagination :total="meta.total" :show-edges="true" :sibling-count="siblingCount"
    :default-page="meta.current_page" :items-per-page="meta.per_page" class="flex justify-center mt-5 text-slate-800 dark:text-slate-200">
    <PaginationList v-slot="{ items }" class="flex items-center gap-1">

      <PaginationFirst @click="props.onChangePage(1)" />
      <PaginationPrev @click="props.onChangePage(meta.current_page - 1)" />

      <template v-for="(item, index) in items" :key="index">
        <PaginationListItem v-if="item.type === 'page'" :value="item.value" as-child>
          <Button class="w-10 h-10 p-0" :variant="item.value === meta.current_page ? 'default' : 'outline'"
            @click="props.onChangePage(item.value)">
            {{ item.value }}
          </Button>
        </PaginationListItem>

        <!-- ... 1 ... -->
        <PaginationEllipsis v-else :index="index" />
      </template>

      <PaginationNext @click="props.onChangePage(meta.current_page + 1)" />
      <PaginationLast @click="props.onChangePage(meta.last_page)" />
    </PaginationList>
  </Pagination>

  <section class="flex justify-between items-center mt-4 lg:mt-0">
    <span class="text-center text-sm md:text-base font-medium text-slate-800 dark:text-slate-200 pr-4">Mostrando {{ meta.from }} hasta {{ meta.to }} de {{ meta.total }} resultados</span>
    <Select :default-value="meta.per_page.toString()" @update:model-value="(value) => props.onChangeLimit(parseInt(value))">
      <SelectTrigger class="w-[180px] text-slate-800 dark:text-slate-200">
        <SelectLabel>Por página</SelectLabel>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="5">
            5
          </SelectItem>
          <SelectItem value="10">
            10
          </SelectItem>
          <SelectItem value="20">
            20
          </SelectItem>
          <SelectItem value="50">
            50
          </SelectItem>
          <SelectItem value="100">
            100
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </section>
</template>

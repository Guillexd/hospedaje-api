<script setup lang="ts">
import { ChevronDown, Trash2 } from 'lucide-vue-next'
import { Button } from '../components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu'
import { Input } from '../components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table'
import { valueUpdater } from '../lib/utils'
import { FlexRender, getCoreRowModel, useVueTable, type VisibilityState } from '@tanstack/vue-table'
import { computed, ref, type PropType } from 'vue'
import { submitToastHandler, useModifyData } from '../utils/utils'
import { apiNames } from '@/enums/apiNames'
import AlertPresentation from './AlertPresentation.vue'

const props = defineProps({
  data: {
    type: Object as PropType<any>,
    required: true,
  },
  columns: {
    type: Array as PropType<any[]>,
    required: true
  },
  defaultVisibleColumns: {
    type: Object as PropType<Record<string, boolean>>,
    default: { id: false }
  },
  deleteName: {
    type: String,
    default: ''
  },
  deleteUrl: {
    type: String,
    default: ''
  },
  titleDialog: {
    type: String,
    default: ''
  },
  descriptionDialog: {
    type: String,
    default: ''
  },
  onSearchInput: {
    type: Function as PropType<(searchInPut: string) => void>,
    required: true,
  },
  inputRender: {
    type: Number,
    default: 0,
  },
})

const columnVisibility = ref<VisibilityState>(props.defaultVisibleColumns)
const rowSelection = ref({})

const table = useVueTable({
  get data() {
    return props.data
  },
  columns: props.columns,
  getCoreRowModel: getCoreRowModel(),
  onColumnVisibilityChange: updaterOrValue => valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: updaterOrValue => valueUpdater(updaterOrValue, rowSelection),
  state: {
    get columnVisibility() { return columnVisibility.value },
    get rowSelection() { return rowSelection.value },
  },
  manualFiltering: true,
  manualSorting: true,
  manualPagination: true,
})

const Ids = computed<number[]>(() => {
  const selectedRows = table.getSelectedRowModel().rows
  return selectedRows.map(row => row.getValue('id'))
})

const { isPending, mutateAsync } = useModifyData<{ ids: number[] }>(props.deleteName, {
  url: props.deleteUrl,
  method: apiNames.delete,
})

const deleteRows = () => {
  return submitToastHandler(mutateAsync({
    ids: Ids.value
  }),
    'Eliminando...',
    () => {
      rowSelection.value = {}
      return 'Acción exitosa'
    },
    (err) => {
      if (typeof err === 'object') {
        return err.message
      }
      return err
    },
  )
}
</script>

<template>
  <div class="flex justify-between gap-2 items-center py-4">
    <section class="flex flex-1 gap-x-2">
      <AlertPresentation v-if="table.getSelectedRowModel().rows.length" :title="titleDialog"
        :description="descriptionDialog" :on-action="deleteRows">
        <Button class="bg-red-400 dark:bg-red-400" :disabled="isPending">
          <Trash2 />
        </Button>
      </AlertPresentation>

      <Input class="flex-1 max-w-sm bg-white dark:bg-slate-200 placeholder:dark:text-slate-500"
        placeholder="Filtrar datos..."
        @update:model-value="(value) => onSearchInput(value.toString().length > 2 ? value.toString() : '')"
        :key="inputRender" />
    </section>

    <DropdownMenu>
      <DropdownMenuTrigger class="text-slate-800 dark:text-slate-200">
        <Button variant="outline">
          Columnas
          <ChevronDown class="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuCheckboxItem v-for="column in table.getAllColumns().filter((column) => column.getCanHide())"
          :key="column.id" :checked="column.getIsVisible()" @update:checked="(value) => {
            column.toggleVisibility(!!value)
          }">
          {{ column.columnDef.header }}
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>

  <div class="rounded-md border">
    <Table class="text-base">
      <TableHeader>
        <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
          <TableHead v-for="header in headerGroup.headers" :key="header.id">
            <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
              :props="header.getContext()" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody class="text-slate-950 dark:text-slate-100">
        <template v-if="table.getRowModel().rows?.length">
          <template v-for="row in table.getRowModel().rows" :key="row.id">
            <TableRow :data-state="row.getIsSelected() && 'selected'">
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
              </TableCell>
            </TableRow>
          </template>
        </template>

        <TableRow v-else>
          <TableCell :colspan="columns.length" class="h-24 text-center">
            No hay resultados.
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>

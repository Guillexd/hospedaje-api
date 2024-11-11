import { computed, type Reactive, type Ref } from 'vue'
import { fetchData, useFetchData } from '@/utils/utils'
import type { HousingI, PaginationMeta } from '@/types/types'
import { apiNames } from '@/enums/apiNames'

export function useFetchHousing(housingKey: string, params: Reactive<{ page: number, limit: number, searchParam: string }>): {
  isFetching: Ref<boolean>
  isPlaceholderData: Ref<boolean>
  data: Ref<HousingI[]>
  meta: Ref<PaginationMeta | null>
} {
  const fetchHousing = () => fetchData<HousingI[]>(`${apiNames.housing}/${apiNames.list_action}?page=${params.page}&limit=${params.limit}&searchInput=${params.searchParam}`)

  const { data: dataProps, ...props } = useFetchData<HousingI[]>(
    housingKey,
    fetchHousing,
    params
  )

  const data = computed(() => dataProps.value?.data ?? [])
  const meta = computed(() => dataProps.value?.meta ?? null)

  return { data, meta, ...props }
}

import { computed, type Reactive, type Ref } from 'vue'
import { fetchData, useFetchData } from '@/utils/utils'
import type { HousingRoomI, PaginationMeta } from '@/types/types'
import { apiNames } from '@/enums/apiNames'

export type RoomState = 'all' | 'available' | 'not_available'

export function useFetchHousingRoom(housingKey: string, params: Reactive<{ page: number, limit: number, searchParam: string, active?: number, roomState?: RoomState }>): {
  isFetching: Ref<boolean>
  isPlaceholderData: Ref<boolean>
  data: Ref<HousingRoomI[]>
  meta: Ref<PaginationMeta | null>
} {
  const fetchHousingRoom = () => fetchData<HousingRoomI[]>(`${apiNames.housing_room}/${apiNames.list_action}?page=${params.page}&limit=${params.limit}${!params.active ? '' : '&active=1'}&searchInput=${params.searchParam}${params.roomState === 'available' ? '&available=1' : params.roomState === 'not_available' ? '&not_available=1' : ''}`)

  const { data: dataProps, ...props } = useFetchData<HousingRoomI[]>(
    housingKey,
    fetchHousingRoom,
    params
  )

  const data = computed(() => dataProps.value?.data ?? [])
  const meta = computed(() => dataProps.value?.meta ?? null)

  return { data, meta, ...props }
}

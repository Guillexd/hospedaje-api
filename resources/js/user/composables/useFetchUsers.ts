import { computed, type Reactive, type Ref } from 'vue'
import { fetchData, useFetchData } from '@/utils/utils'
import type { PaginationMeta, UserI } from '@/types/types'
import { apiNames } from '@/enums/apiNames'

export function useFetchUser(userKey: string, params: Reactive<{ page: number, limit: number, searchParam: string, startDate: string, finishDate: string }>): {
  isFetching: Ref<boolean>
  isPlaceholderData: Ref<boolean>
  data: Ref<UserI[]>
  meta: Ref<PaginationMeta | null>
} {
  const fetchUsers = () => fetchData<UserI[]>(`${apiNames.users}/${apiNames.list_action}?page=${params.page}&limit=${params.limit}&searchInput=${params.searchParam}&startDate=${params.startDate}&finishDate=${params.finishDate}`)

  const { data: dataProps, ...props } = useFetchData<UserI[]>(
    userKey,
    fetchUsers,
    params
  )

  const data = computed(() => dataProps.value?.data ?? [])
  const meta = computed(() => dataProps.value?.meta ?? null)

  return { data, meta, ...props }
}

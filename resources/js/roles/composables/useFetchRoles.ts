import { computed, type Reactive, type Ref } from 'vue'
import { fetchData, useFetchData } from '@/utils/utils'
import type { PaginationMeta, RoleI } from '@/types/types'
import { apiNames } from '@/enums/apiNames'

export function useFetchRoles(roleKey: string, params: Reactive<{ page: number, limit: number, searchParam: string }>): {
  isFetching: Ref<boolean>
  isPlaceholderData: Ref<boolean>
  data: Ref<RoleI[]>
  meta: Ref<PaginationMeta | null>
} {
  const fetchRoles = () => fetchData<RoleI[]>(`${apiNames.roles}/${apiNames.list_action}?page=${params.page}&limit=${params.limit}&searchInput=${params.searchParam}`)

  const { data: dataProps, ...props } = useFetchData<RoleI[]>(
    roleKey,
    fetchRoles,
    params
  )

  const data = computed(() => dataProps.value?.data ?? [])
  const meta = computed(() => dataProps.value?.meta ?? null)

  return { data, meta, ...props }
}

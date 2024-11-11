import { computed, type Reactive, type Ref } from 'vue'
import { fetchData, useFetchData } from '@/utils/utils'
import type { IdentityDocumentI, PaginationMeta } from '@/types/types'
import { apiNames } from '@/enums/apiNames'

export function useFetchIdentityDocuments(identityDocumentKey: string, params: Reactive<{ page: number, limit: number, searchParam: string }>): {
  isFetching: Ref<boolean>
  isPlaceholderData: Ref<boolean>
  data: Ref<IdentityDocumentI[]>
  meta: Ref<PaginationMeta | null>
} {
  const fetchIdentityDocument = () => fetchData<IdentityDocumentI[]>(`${apiNames.identity_document}/${apiNames.list_action}?page=${params.page}&limit=${params.limit}&searchInput=${params.searchParam}`)

  const { data: dataProps, ...props } = useFetchData<IdentityDocumentI[]>(
    identityDocumentKey,
    fetchIdentityDocument,
    params
  )

  const data = computed(() => dataProps.value?.data ?? [])
  const meta = computed(() => dataProps.value?.meta ?? null)

  return { data, meta, ...props }
}

import { keyNames } from '@/enums/keyNames'
import type { TenancyState } from '@/types/types'
import { useModifyData } from '@/utils/utils'
import { type ComputedRef } from 'vue'

export function useModifyTenancy(tenancyParams: ComputedRef<{ url: string, method: string }>) {
  return useModifyData<TenancyState>(keyNames.tenancy, tenancyParams, { "Content-Type": "multipart/form-data" })
}

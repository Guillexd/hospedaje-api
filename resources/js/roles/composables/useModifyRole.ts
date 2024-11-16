import { keyNames } from '@/enums/keyNames'
import type { RoleState } from '@/types/types'
import { useModifyData } from '@/utils/utils'
import { type ComputedRef } from 'vue'

export function useModifyRole(rolesParams: ComputedRef<{ url: string, method: string }>) {
  return useModifyData<RoleState>(keyNames.roles, rolesParams)
}

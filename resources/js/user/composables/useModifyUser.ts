import { keyNames } from '@/enums/keyNames'
import type { UserState } from '@/types/types'
import { useModifyData } from '@/utils/utils'
import { type ComputedRef } from 'vue'

export function useModifyUser(userParams: ComputedRef<{ url: string, method: string }>) {
  return useModifyData<UserState>(keyNames.users, userParams)
}

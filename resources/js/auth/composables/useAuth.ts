import type { AuthState } from '@/types/types'
import { useModifyData } from '@/utils/utils'

export function useAuth(url: string, method: string) {
  return useModifyData<AuthState>('', { url, method })
}

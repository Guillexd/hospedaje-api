import { keyNames } from '@/enums/keyNames'
import type { IdentityDocumentState } from '@/types/types'
import { useModifyData } from '@/utils/utils'
import { type ComputedRef } from 'vue'

export function useModifyIdentityDocument(identityDocumentParams: ComputedRef<{ url: string, method: string }>) {
  return useModifyData<IdentityDocumentState>(keyNames.identity_document, identityDocumentParams)
}

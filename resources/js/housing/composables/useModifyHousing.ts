import { keyNames } from '@/enums/keyNames'
import type { HousingState } from '@/types/types'
import { useModifyData } from '@/utils/utils'
import { type ComputedRef } from 'vue'

export function useModifyHousing(housingParams: ComputedRef<{ url: string, method: string }>) {
  return useModifyData<HousingState>(keyNames.housing, housingParams)
}

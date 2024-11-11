import { keyNames } from '@/enums/keyNames'
import type { HousingPaymentState } from '@/types/types'
import { useModifyData } from '@/utils/utils'
import { type ComputedRef } from 'vue'

export function useCollectHousingPayment(collectParams: ComputedRef<{ url: string, method: string }>) {
  return useModifyData<HousingPaymentState>(keyNames.housing_payment, collectParams)
}

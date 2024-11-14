import { computed, type Reactive, type Ref } from 'vue'
import { fetchData, useFetchData } from '@/utils/utils'
import type { PaginationMeta, HousingPaymentI } from '@/types/types'
import { apiNames } from '@/enums/apiNames'

export type PaymentState = 'all' | 'rent_debtors' | 'rent_payers'

export function useFetchHousingPayments(housingPaymentKey: string, params: Reactive<{ page: number, limit: number, searchParam: string, startDate: string, finishDate: string, paymentState?: PaymentState }>): {
  isFetching: Ref<boolean>
  isPlaceholderData: Ref<boolean>
  data: Ref<HousingPaymentI[]>
  meta: Ref<PaginationMeta | null>
} {
  const fetchHousingPayments = () => fetchData<HousingPaymentI[]>(`${apiNames.housing_payment}/${apiNames.list_action}?page=${params.page}&limit=${params.limit}&searchInput=${params.searchParam}&startDate=${params.startDate}&finishDate=${params.finishDate}${params.paymentState === 'rent_debtors' ? '&rent_debtors=1' : params.paymentState === 'rent_payers' ? '&rent_payers=1' : ''}`)

  const { data: dataProps, ...props } = useFetchData<HousingPaymentI[]>(
    housingPaymentKey,
    fetchHousingPayments,
    params
  )

  const data = computed(() => dataProps.value?.data ?? [])
  const meta = computed(() => dataProps.value?.meta ?? null)

  return { data, meta, ...props }
}

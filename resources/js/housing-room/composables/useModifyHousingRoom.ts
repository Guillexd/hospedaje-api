import { keyNames } from '@/enums/keyNames'
import type { HousingRoomState } from '@/types/types'
import { useModifyData } from '@/utils/utils'
import { type ComputedRef } from 'vue'

export function useModifyHousingRoom(housingRoomParams: ComputedRef<{ url: string, method: string }>) {
  return useModifyData<HousingRoomState>(keyNames.housing_room, housingRoomParams)
}

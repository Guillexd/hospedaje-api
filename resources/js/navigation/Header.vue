<script setup lang="ts">
import {
  Banknote,
  Bell,
  IdCard,
  LogOut,
  Mail,
  Moon,
  Phone,
  User,
  UserPen,
} from 'lucide-vue-next'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from '../components/ui/dropdown-menu'
import { ToggleGroup, ToggleGroupItem } from '../components/ui/toggle-group'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import { useScreenModeStore } from '@/stores/screen-mode'
import { keyNames } from '@/enums/keyNames'
import { onMounted, ref } from 'vue'
import type { HousingPaymentI } from '@/types/types'
import { dateCalculator, fetchData } from '@/utils/utils'
import { apiNames } from '@/enums/apiNames'

const emit = defineEmits<{
  (event: 'updateSidebarOpen', value: boolean): void
}>()

const screenMode = useScreenModeStore()
const authStore = useAuthStore()
const router = useRouter()

const toggleSidebar = () => {
  emit('updateSidebarOpen', true)
}

const handleLogOut = () => {
  authStore.logOut('Cerrando sesión', 'Sesión cerrada con éxito', 'Hubo un error al intentar cerrar sesión', () => router.push({ name: 'Login' }))
}

const searchRentDebtors = (customer: string) => {
  router.push({ name: 'HousingPayment', query: { customer } })
}

const payments = ref<HousingPaymentI[]>([])

onMounted(async () => {
  payments.value = (await fetchData<HousingPaymentI[]>(`${apiNames.housing_payment}/${apiNames.get_rent_expire}`)).data
})

</script>

<template>
  <header
    class="min-w-72 p-3 flex items-center justify-between px-6 py-3 border-b-4 border-slate-300 sticky top-0 z-10 bg-white dark:bg-slate-950">
    <section class="flex items-center">
      <button class="text-gray-500 focus:outline-none xl:hidden" @click="toggleSidebar">
        <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6H20M4 12H20M4 18H11" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round"></path>
        </svg>
      </button>
    </section>

    <section class="flex justify-center items-center gap-x-7">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div
            class="relative top-1 p-1 cursor-pointer hover:bg-slate-200 focus:bg-slate-200 dark:hover:bg-gray-700 dark:focus:bg-gray-700 rounded-full text-slate-950 dark:text-slate-50">
            <Bell :size="25" />
            <span v-if="payments.length > 0"
              class="absolute top-0 p-[2px] bg-red-700 text-white rounded-full text-xs font-bold">
              {{ payments.length }}
            </span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-96">
          <DropdownMenuLabel>Alquileres a Vencer En 7 días</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup class="max-h-96 overflow-y-auto overflow-x-hidden">
            <template v-for="payment in payments" :key="payment.id">
              <DropdownMenuItem class="p-3 text-sm text-gray-800 dark:text-gray-100 cursor-pointer"
                @click="searchRentDebtors(payment.tenancy_document_number)">

                <Banknote class="w-10 text-blue-600 dark:text-blue-400 mr-4" :size="40" />
                <section class="flex-1 text-xs">
                  <p class="font-semibold text-sm text-gray-900 dark:text-gray-100">
                    Pago pendiente de <span class="text-blue-600 dark:text-blue-400">{{ payment.tenancy_name }}</span>
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    DNI: <span class="font-semibold text-gray-800 dark:text-gray-200">{{ payment.tenancy_document_number
                      }}</span>
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    <span class="font-semibold text-blue-600 dark:text-blue-400">{{ payment.housing }}</span>
                    - Habitación <span class="font-bold text-gray-800 dark:text-gray-200">{{ payment.housing_room
                      }}</span>
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Vencimiento: {{
                    dateCalculator(payment.rental_end_date) }}</p>
                </section>
                <p class="font-medium text-blue-600 dark:text-blue-400 mt-1">{{
                  payment.payment.toLocaleString(keyNames.lang, { style: "currency", currency: "PEN" }) }}</p>

              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </template>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <button class="relative block w-8 h-8 overflow-hidden rounded-full shadow focus:outline-none">
            <img class="object-cover w-full h-full" src="/assets/img/profile.avif" alt="tu avatar">
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-56">
          <DropdownMenuLabel>Perfil</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User class="mr-2" :size="19" />
              <span>{{ authStore.user.name }}</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Mail class="mr-2 h-4 w-4" />
              <span>{{ authStore.user.email }}</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IdCard class="mr-2 h-4 w-4" />
              <span>{{ authStore.user.dni }}</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Phone class="mr-2 h-4 w-4" />
              <span>{{ authStore.user.phone }}</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Roles de usuario</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem v-for="role in authStore.user.roles">
              <UserPen class="mr-2" :size="19" />
              <span>{{ role }}</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem class="focus:bg-inherit dark:focus:bg-inherit flex justify-center">
            <ToggleGroup type="single" class="grid grid-cols-1 w-full" v-model:model-value="screenMode.mode">
              <ToggleGroupItem value="dark">
                <Moon class="h-5 w-5" />
              </ToggleGroupItem>
            </ToggleGroup>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem @click="handleLogOut" class="hover:cursor-pointer">
            <LogOut class="mr-2 h-4 w-4" />
            <span>Cerrar sesión</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  </header>
</template>

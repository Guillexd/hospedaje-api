import { computed, reactive, watch } from 'vue'
import { defineStore } from 'pinia'
import { type AxiosResponse } from 'axios'
import { toast } from 'vue-sonner'
import type { ApiResponse, AuthUserI } from '@/types/types'
import { Permissions } from '@/enums/permissions'
import { apiNames } from '@/enums/apiNames'

export const initialAuthState: AuthUserI = {
  id: undefined,
  name: '',
  email: '',
  dni: '',
  phone: '',
  roles: [],
  permissions: [],
}

export const useAuthStore = defineStore('auth', () => {
  const user = reactive<AuthUserI>(initialAuthState)
  const isAuthenticated = computed<boolean>(() => !!user.id)

  function setUser(userData: AuthUserI) {
    Object.assign(user, userData)
  }

  function checkAuth(loading: string, successMessage: string, errorMessage: string, onSuccess: () => void) {
    return toast.promise(window.axios.get(apiNames.user),
      {
        loading,
        success: (res: AxiosResponse<ApiResponse<AuthUserI>>) => {
          Object.assign(user, res.data.data)
          onSuccess()
          return successMessage
        },
        error: errorMessage,
      }
    )
  }

  function logOut(loading: string, successMessage: string, errorMessage: string, onSuccess: () => void) {
    return toast.promise(window.axios.post(apiNames.logout),
      {
        loading,
        success: () => {
          Object.assign(user, initialAuthState)
          onSuccess()
          return successMessage
        },
        error: errorMessage,
      }
    )
  }

  watch(user, (value) => {
    console.log(value)
    console.log(value.permissions.includes(Permissions.see_dashboard as never))
  })

  // falta hacer el crud de roles y permisos (ten consideraciones com oqeu no puedse eliiminar ni agregar permisos, o ver que pasa si eliminas roles)

  return { user, isAuthenticated, setUser, checkAuth, logOut }
})

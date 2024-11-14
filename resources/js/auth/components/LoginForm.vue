<script setup lang="ts">
import { useForm } from 'vee-validate'
import { Button } from '../../components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/form'
import { Input } from '../../components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/card'
import { Eye, EyeOff } from 'lucide-vue-next'
import { ref } from 'vue'
import { useAuth } from '../composables/useAuth'
import type { AuthState, AuthUserI } from '../../types/types'
import { useRouter } from 'vue-router'
import { submitToastHandler } from '../../utils/utils'
import { useAuthStore } from '../../stores/auth'
import { apiNames } from '@/enums/apiNames'

const initialStateAuthUser = {
  email: '',
  password: ''
}

const form = useForm({ initialValues: initialStateAuthUser })

const { isPending, mutateAsync } = useAuth(apiNames.login, apiNames.post)
const router = useRouter()
const authStore = useAuthStore()

const handleLoginSubmit = form.handleSubmit((values: AuthState) => {
  return submitToastHandler<AuthUserI>(
    mutateAsync(values),
    'Iniciando sesión...',
    (res) => {
      authStore.setUser(res.data.data)
      router.push({ name: 'Dashboard' })
      return 'Inicio de sesión exitoso'
    },
    (err) => {
      if (typeof err === 'object') {
        form.setErrors(err)
        return 'Inicio de sesión fallido'
      }
      return err
    },
  )
})

const showPassword = ref<boolean>(false)
</script>

<template>
  <Card class="w-full sm:w-2/3 lg:flex-1 lg:max-w-[500px] bg-gray-200">
    <CardHeader class="text-center">
      <CardTitle>Hospedaje Santa Lucía</CardTitle>
      <CardDescription>Bienvenido</CardDescription>
    </CardHeader>
    <CardContent>
      <form @submit="handleLoginSubmit" keep-values>
        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel>Correo electrónico</FormLabel>
            <FormControl>
              <Input type="text" placeholder="usuario@example.com" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <FormLabel>Contraseña</FormLabel>
            <FormControl>
              <div class="relative transition-all ease-in-out">
                <Eye v-if="!showPassword && form.values.password?.length !== 0"
                  class="absolute right-2 bottom-0 hover:scale-110 cursor-pointer" :size="33"
                  @click="showPassword = true" />
                <EyeOff v-if="showPassword && form.values.password?.length !== 0"
                  class="absolute right-2 bottom-0 hover:scale-110 cursor-pointer" :size="33"
                  @click="showPassword = false" />
                <Input :type="showPassword ? 'text' : 'password'" autocomplete="on" placeholder="*****"
                  v-bind="componentField" />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <div class="mt-5 flex justify-center items-center">
          <Button type="submit" :disabled="isPending">
            Iniciar sesión
          </Button>
        </div>
      </form>
    </CardContent>
    <CardFooter class="text-xs">
      © {{ new Date().getFullYear() }} Santa Lucía Hospedaje. Todos los derechos reservados.
    </CardFooter>
  </Card>
</template>

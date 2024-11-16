<script setup lang="ts">
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/form'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '../../components/ui/dialog'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import type { FormContext } from 'vee-validate'
import type { UserState } from '../../types/types'
import { X } from 'lucide-vue-next'
import { CaretSortIcon, CheckIcon } from '@radix-icons/vue'
import { searchDoc, submitToastHandler } from '../../utils/utils'
import { useModifyUser } from '../composables/useModifyUser'
import { apiNames } from '../../enums/apiNames'
import { computed, reactive, ref, watch } from 'vue'
import { Search } from 'lucide-vue-next'
import { useFetchRoles } from '@/roles/composables/useFetchRoles'
import { cn } from '@/lib/utils'

const props = defineProps<{
  form: FormContext<UserState>
}>()

const emit = defineEmits(['reset'])

const userId = computed<boolean>(() => !!props.form.values.id)
const userParams = computed(() => ({
  url: `${apiNames.users}/${!userId.value ? apiNames.store_action : apiNames.update_action}`,
  method: !userId.value ? apiNames.post : apiNames.put,
}))

const { isPending, mutateAsync } = useModifyUser(userParams)

const handleUserSubmit = props.form.handleSubmit((values: UserState) => {
  values.password_confirmation = values.password
  return submitToastHandler<null>(
    mutateAsync(values),
    `${!userId.value ? 'Agregando' : 'Editando'}...`,
    () => {
      closeUserDialog()
      return `Usuario ${!userId.value ? 'agregado' : 'actualizado'} con éxito`
    },
    (err) => {
      if (typeof err === 'object') {
        props.form.setErrors(err)
        return `Acción fallida`
      }
      return err
    },
  )
})

const searchPersonByDocumentNumber = () => {
  searchDoc(props.form.values.dni as number, (razonSocial) => {
    props.form.setValues({ name: razonSocial })
  }, (nombres, apellidoPaterno, apellidoMaterno) => {
    props.form.setValues({ name: `${nombres} ${apellidoPaterno} ${apellidoMaterno}` })
  })
}

const openRoleSelect = ref(false)
const valueRole = ref<string>('')
const keyRole = ref<number>(1)

const paramsRole = reactive({
  page: 1,
  limit: 20,
  searchParam: '',
  active: 1,
})

const { data: roles } = useFetchRoles('', paramsRole)

function closeUserDialog(): void {
  emit('reset')
  changeParams(false)
}

function changeParams(state: boolean) {
  if (!!state) {
    paramsRole.searchParam = props.form.values.role
    valueRole.value = props.form.values.role
  } else {
    paramsRole.searchParam = ''
    valueRole.value = ''
    keyRole.value++
  }
}

watch(userId, (newValue) => {
  changeParams(newValue)
})
</script>

<template>
  <DialogContent class="sm:max-w-[600px] text-slate-800 dark:dark:text-slate-200">
    <DialogHeader>
      <DialogTitle>{{ userId ? 'Editar' : 'Agregar' }} usuario</DialogTitle>
      <DialogDescription>
        Haz los cambios del usuario aquí. Click {{ userId ? 'Editar' : 'Agregar' }} cuando termines.
      </DialogDescription>
    </DialogHeader>

    <form @submit="handleUserSubmit" keep-values>
      <section class="flex flex-col sm:grid grid-cols-2 gap-x-2 gap-y-1 overflow-y-auto max-h-[71vh] p-1">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <FormLabel>Nombre</FormLabel>
            <FormControl>
              <Input v-bind="componentField" autocomplete="off" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="dni">
          <FormItem>
            <FormLabel>DNI</FormLabel>
            <FormControl>
              <div class="relative transition-all ease-in-out">
                <Search
                  class="absolute left-1 bottom-1 hover:scale-110 cursor-pointer text-green-500" :size="30"
                  @click="searchPersonByDocumentNumber" />
                <Input type="number" class="pl-11" v-bind="componentField" autocomplete="off" max="999999999" />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="phone">
          <FormItem>
            <FormLabel>Celular</FormLabel>
            <FormControl>
              <Input type="number" v-bind="componentField" autocomplete="off" max="999999999" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="role_id">
          <FormItem>
            <FormLabel>Rol</FormLabel>

            <Popover v-model:open="openRoleSelect">
              <PopoverTrigger as-child>
                <FormControl>
                  <Button type="button" variant="outline" role="combobox"
                    :class="cn('w-full sm:w-64 justify-between', !componentField.modelValue && 'text-muted-foreground')">
                    {{ valueRole || 'Selecciona el rol...' }}
                    <CaretSortIcon class="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>

              <PopoverContent class="w-[370px] sm:w-64 p-0">
                <Command :key="keyRole" v-model="valueRole" class="p-0">
                  <CommandInput class="w-full px-4 py-2" placeholder="Busca el rol..."
                    @input="($event) => paramsRole.searchParam = $event.target.value" />
                  <X v-if="valueRole.length > 0 || paramsRole.searchParam.length > 0"
                    class="absolute right-5 top-3" :size="20" @click="() => {
                      paramsRole.searchParam = ''
                      valueRole = ''
                      keyRole++
                    }" />
                  <CommandEmpty>Sin resultados.</CommandEmpty>
                  <CommandList>
                    <CommandGroup>
                      <CommandItem
                        v-for="role in roles"
                        :key="role.id" :value="role.description" @select="() => {
                          props.form.setFieldValue('role_id', role.id)
                          valueRole = role.description
                          openRoleSelect = false
                        }">
                        {{ role.description }}
                        <CheckIcon
                          :class="cn('ml-auto h-4 w-4', props.form.values.role_id == role.id ? 'opacity-100' : 'opacity-0')" />
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel>Correo electrónico</FormLabel>
            <FormControl>
              <Input v-bind="componentField" autocomplete="off" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-if="!userId" v-slot="{ componentField }" name="password">
          <FormItem>
            <FormLabel>Contraseña</FormLabel>
            <FormControl>
              <Input v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </section>
      <DialogFooter>
        <Button type="submit" class="w-full mt-3 p-1" :disabled="isPending">
          {{ userId ? 'Editar' : 'Agregar' }}
        </Button>
      </DialogFooter>
    </form>
  </DialogContent>
</template>

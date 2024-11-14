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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import type { FormContext } from 'vee-validate'
import type { IdentityDocumentI, TenancyState } from '../../types/types'
import { fetchData, searchDoc, submitToastHandler } from '../../utils/utils'
import { useModifyTenancy } from '../composables/useModifyTenancy'
import { apiNames } from '../../enums/apiNames'
import { computed, onMounted, ref } from 'vue'
import { Search } from 'lucide-vue-next'
import FileUpload from '@/Presentation/FileUpload.vue'


const props = defineProps<{
  form: FormContext<TenancyState>
}>()

const emit = defineEmits(['reset'])

function closeTenancyDialog(): void {
  emit('reset')
}

const tenancyId = computed<boolean>(() => !!props.form.values.id)
const tenancyParams = computed(() => ({
  url: `${apiNames.tenancy}/${!tenancyId.value ? apiNames.store_action : apiNames.update_action}`,
  method: apiNames.post,
}))

const { isPending, mutateAsync } = useModifyTenancy(tenancyParams)

const handleTenancySubmit = props.form.handleSubmit((values: TenancyState) => {
  return submitToastHandler<null>(
    mutateAsync(values),
    `${!tenancyId.value ? 'Agregando' : 'Editando'}...`,
    () => {
      closeTenancyDialog()
      return `Inquilino ${!tenancyId.value ? 'agregado' : 'actualizado'} con éxito`
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
  searchDoc(props.form.values.document_number ?? 1, (razonSocial) => {
    props.form.setValues({ name: razonSocial })
  }, (nombres, apellidoPaterno, apellidoMaterno) => {
    props.form.setValues({ name: `${nombres} ${apellidoPaterno} ${apellidoMaterno}` })
  })
}

const docs = ref<IdentityDocumentI[]>([])

onMounted(async () => {
  docs.value = (await fetchData<IdentityDocumentI[]>(`${apiNames.identity_document}/${apiNames.get_all}`)).data
})
</script>

<template>
  <DialogContent class="sm:max-w-[600px] text-slate-800 dark:dark:text-slate-200">
    <DialogHeader>
      <DialogTitle>{{ tenancyId ? 'Editar' : 'Agregar' }} inquilino</DialogTitle>
      <DialogDescription>
        Haz los cambios del inquilino aquí. Click {{ tenancyId ? 'Editar' : 'Agregar' }} cuando termines.
      </DialogDescription>
    </DialogHeader>

    <form @submit="handleTenancySubmit" keep-values>
      <section class="flex flex-col sm:grid grid-cols-2 gap-x-2 gap-y-1 overflow-y-auto max-h-[71vh] p-1">
        <FormField v-slot="{ componentField }" name="identity_document_id">
          <FormItem>
            <FormLabel>Tipo de documento</FormLabel>
            <Select v-bind="componentField">
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el tipo de documento" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  <SelectItem v-for="doc in docs" :value="doc.id.toString()">
                    {{ doc.abbreviation }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="document_number">
          <FormItem>
            <FormLabel>Número de documento</FormLabel>
            <FormControl>
              <div v-if="!!form.values.identity_document_id && ['1', '2'].includes(form.values.identity_document_id.toString())" class="relative transition-all ease-in-out">
                <Search class="absolute left-1 bottom-1 hover:scale-110 cursor-pointer text-green-500" :size="30"
                  @click="searchPersonByDocumentNumber" />
                <Input type="number" class="pl-11" v-bind="componentField" autocomplete="off" />
              </div>
              <Input v-else type="number" v-bind="componentField" autocomplete="off" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <FormLabel>Nombre</FormLabel>
            <FormControl>
              <Input v-bind="componentField" autocomplete="off" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="phone">
          <FormItem>
            <FormLabel>Teléfono</FormLabel>
            <FormControl>
              <Input type="number" v-bind="componentField" autocomplete="off" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField name="first_document_image_url">
          <FormItem>
            <FormLabel>1° imagen del documento</FormLabel>
            <FileUpload @update:model-value="(file) => form.setValues({ first_document_image_url: file })" />
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField name="second_document_image_url">
          <FormItem>
            <FormLabel>2° imagen del documento</FormLabel>
            <FileUpload @update:model-value="(file) => form.setValues({ second_document_image_url: file })" />
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="description">
          <FormItem class="col-span-2">
            <FormLabel>Descripción (opcional)</FormLabel>
            <FormControl>
              <Textarea placeholder="Una descripción acerca del inquilino" rows="5" class="resize-none"
                v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </section>
      <DialogFooter>
        <Button type="submit" class="w-full mt-3 p-1" :disabled="isPending">
          {{ tenancyId ? 'Editar' : 'Agregar' }}
        </Button>
      </DialogFooter>
    </form>
  </DialogContent>
</template>

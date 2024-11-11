<script setup lang="ts">
import FormControl from '@/components/ui/form/FormControl.vue'
import Input from '@/components/ui/input/Input.vue'
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'update:modelValue', payload: File | undefined): void
}>()

const imageSrc = ref<string | undefined>(undefined)

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0] as File | undefined

  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      imageSrc.value = reader.result as string
    }
    reader.readAsDataURL(file)
  } else {
    imageSrc.value = undefined
  }

  emit('update:modelValue', file)
}
</script>


<template>
  <FormControl>
    <Input type="file" accept="image/*" class="bg-slate-200 dark:bg-slate-700" @change="onFileChange" />
  </FormControl>
  <img v-if="imageSrc" :src="imageSrc" alt="Imagen" class="mx-auto rounded-lg" />
</template>

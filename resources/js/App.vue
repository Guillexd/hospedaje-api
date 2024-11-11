<script setup lang="ts">
import { onMounted } from 'vue'
import { Toaster } from 'vue-sonner'
import { useScreenModeStore } from './stores/screen-mode'

onMounted(() => {
  useScreenModeStore()
})
</script>

<template>
  <Toaster richColors position="top-right" closeButton />
  <router-view />
</template>

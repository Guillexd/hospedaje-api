<script setup lang="ts">
import { Toaster } from 'vue-sonner'
import { useScreenModeStore } from './stores/screen-mode'

const screenMode = useScreenModeStore()
</script>

<template>
  <Toaster richColors position="top-right" closeButton: :theme="screenMode.isInDarkMode ? 'dark' : 'light'" :duration="900" />
  <router-view />
</template>

import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useScreenModeStore = defineStore('screen-mode', () => {
  const nameScreenMode: string = 'screenMode'
  const mode = ref<'dark' | 'light'>(
    localStorage.getItem(nameScreenMode) as 'dark' | 'light' || 'light'
  )

  const isInDarkMode = computed<boolean>(() => mode.value === 'dark')

  watch(mode, (newValue) => {
    const body = document.body
    if (newValue === 'dark') {
      body.classList.add('dark')
    } else {
      body.classList.remove('dark')
    }
    localStorage.setItem(nameScreenMode, newValue)
  }, { immediate: true })

  return { mode, isInDarkMode }
})

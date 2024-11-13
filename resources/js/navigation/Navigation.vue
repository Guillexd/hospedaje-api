<script setup lang="ts">
import { ref } from 'vue'
import Header from './Header.vue'
import NavBar from './NavBar.vue'
import Loader from '../Presentation/Loader.vue'
import { Permissions } from '../enums/permissions'
import { useAuthStore } from '../stores/auth'
import Footer from '../Presentation/Footer.vue'
import { ArrowBigUpDash } from 'lucide-vue-next'

const authStore = useAuthStore()
console.log(authStore.user)
console.log(authStore.user.permissions?.includes(Permissions.AdminAccess as never)) // NO SE PORQUE NO LEE PERMISSION XD

const sidebarOpen = ref(false)
const toggleSidebar = (newValue: boolean): void => {
  sidebarOpen.value = newValue
}

const scrollableDiv = ref<HTMLDivElement | null>(null)
const scrollToTopBtn = ref<HTMLButtonElement | null>(null)

const handleScroll = () => {
  if (scrollableDiv.value) {
    if (scrollableDiv.value.scrollTop > 400) {
      scrollToTopBtn.value?.classList.remove('hidden')
    } else {
      scrollToTopBtn.value?.classList.add('hidden')
    }
  }
}

const scrollToTop = () => {
  if (scrollableDiv.value) {
    scrollableDiv.value.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
}
</script>

<template>
  <div v-if="authStore.isAuthenticated" class="flex h-screen dark:bg-slate-950">
    <div :class="sidebarOpen ? 'block' : 'hidden'" @click="sidebarOpen = false"
      class="fixed inset-0 z-20 transition-opacity bg-black opacity-50 xl:hidden"></div>
    <NavBar :sidebar-open="sidebarOpen" @updateSidebarOpen="toggleSidebar" />
    <div class="flex flex-col flex-1 overflow-hidden overflow-y-auto" ref="scrollableDiv" @scroll="handleScroll">
      <Header @updateSidebarOpen="toggleSidebar" />
      <main class="px-4 md:px-12 py-4 md:py-8">
        <router-view />
      </main>
      <Footer />
    </div>
    <button ref="scrollToTopBtn" type="button" @click="scrollToTop"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg p-2 text-center items-center me-2 absolute right-2 md:right-8 bottom-3 animate-bounce hidden">
      <ArrowBigUpDash :size="40" />
    </button>
  </div>
  <Loader v-else />
</template>

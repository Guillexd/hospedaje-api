<script setup>
import LoginForm from '../components/LoginForm.vue'
import LoginImage from '../components/LoginImage.vue'
</script>

<template>
  <div class="bg-gradient-to-r from-gray-400 via-orange-600 to-yellow-500 dark:from-gray-800 dark:via-purple-900 dark:to-indigo-900">
    <div class="container flex flex-col-reverse lg:flex-row justify-center items-center h-screen w-screen gap-10">
      <LoginForm />
      <LoginImage/>
    </div>
  </div>
</template>

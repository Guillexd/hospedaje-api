<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
function goToUsers() {
    router.push({ name: 'Users'})
}

onMounted(() => {
    console.log('FUE P') // hacer la tabla de usuarios de una vez y todo esta listo
})
</script>
<template>
    <div>
        <button @click="goToUsers">Usuarios</button>
    </div>
</template>

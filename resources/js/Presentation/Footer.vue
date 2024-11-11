<script setup lang="ts">
import { messagePerson } from '@/utils/utils';
</script>

<template>
  <footer>
    <div class="mx-auto py-8 px-4 text-slate-800 dark:text-slate-200">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="text-center"><img src="/assets/img/sl2.jpg" alt="Logo de la Empresa"
            class="w-24 mb-4 mx-auto rounded-lg">
          <h3 class="text-lg font-semibold mb-4">Hospedaje Santa Lucía</h3>
        </div>
        <div class="text-center">
          <h3 class="text-lg font-semibold mb-4">Redes Sociales</h3>
          <div class="flex justify-center">
            <div class="flex justify-center items-center w-1/2">
              <div class="flex-col justify-center lg:px-6 px-2 md:pt-10">
                <div class="flex justify-center items-center rounded-full mx-auto w-10 h-10 shadow-lg">
                  <a href="https://www.facebook.com" target="_blank">
                    <img src="/assets/img/facebook.png" alt="Vision" class="w-full h-full">
                  </a>
                </div>
              </div>
              <div class="flex-col justify-center lg:px-6 px-2 md:pt-10">
                <div class="flex justify-center items-center rounded-full mx-auto w-10 h-10 shadow-lg">
                  <a href="https://www.youtube.com" target="_blank">
                    <img src="/assets/img/youtube.png" alt="Mision" class="w-full h-full">
                  </a>
                </div>
              </div>
              <div class="flex-col justify-center lg:px-6 px-2 md:pt-10">
                <div class="flex justify-center items-center rounded-full mx-auto w-10 h-10 shadow-lg">
                  <a href="https://www.tiktok.com" target="_blank">
                    <img src="/assets/img/tiktok.png" alt="Valores" class="w-full h-full">
                  </a>
                </div>
              </div>
              <div class="flex-col justify-center lg:px-6 px-2 md:pt-10">
                <div class="flex justify-center items-center  rounded-full mx-auto w-10 h-10 shadow-lg">
                  <a :href="messagePerson('995578780')" target="_blank">
                    <img src="/assets/img/whatsapp.png" alt="Valores" class="w-full h-full">
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center">
          <h3 class="text-lg font-semibold mb-4">Contacto</h3>
          <p>Teléfono: (+51) 949 015 847</p>
          <p>Teléfono: (+51) 995 578 780</p>
        </div>
      </div>
      <section class="flex justify-center min-w-full">
        <div class="min-w-[calc(90%)] h-1 rounded-full my-6 bg-slate-400"></div>
      </section>
      <div class="border-gray-700 mt-2 pt-2 text-center">
        <p>© {{ new Date().getFullYear() }} Hospedaje Santa Lucía. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
</template>

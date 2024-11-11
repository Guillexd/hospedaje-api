<script setup lang="ts">
import { BedSingle, House, IdCard, KeyRound, User, Users } from 'lucide-vue-next'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '../components/ui/command'
import { messagePerson } from '@/utils/utils'

defineProps({
  sidebarOpen: {
    required: true,
    type: Boolean,
  },
})
const emit = defineEmits<{
  (event: 'updateSidebarOpen', value: boolean): void
}>()
const closeSidebar = () => {
  emit('updateSidebarOpen', false)
}
</script>

<template>
  <nav :class="sidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
    class="fixed inset-y-0 left-0 z-30 w-[17rem] overflow-y-auto transition duration-300 transform xl:translate-x-0 xl:static xl:inset-0 -translate-x-full ease-in border-r-2 border-slate-300">
    <Command class="p-3 font-medium bg-teal-300">
      <picture
        class="hover:scale-[106%] transition flex items-center justify-center mt-4 overflow-hidden mx-auto rounded-full h-32 w-32">
        <a :href="messagePerson('995578780')" target="_blank" rel="noopener noreferrer" class="m-3 ms-4 cursor-zoom-in"
          title="Presione para contactarse con el soporte técnico del sistema">
          <img src="/assets/img/sl2.jpg" class="scale-[180%]">
        </a>
      </picture>
      <CommandInput placeholder="Escribe una opción para buscar" />
      <CommandList class="min-h-[70vh]">
        <CommandEmpty>No hay resultados.</CommandEmpty>

        <template v-for="(group, groupIndex) in [
          {
            heading: 'Frecuentes',
            items: [
              { icon: Users, name: 'Tenancy', value: 'inquilinos', text: 'Inquilinos' },
              { icon: KeyRound, name: 'HousingPayment', value: 'Alquileres', text: 'Alquileres' },
            ]
          },
          {
            heading: 'Administrativo',
            items: [
              { icon: IdCard, name: 'Dashboard', value: 'inicio', text: 'Inicio' },
              { icon: User, name: 'Users', value: 'usuarios', text: 'Usuarios' },
              { icon: IdCard, name: 'IdentityDoc', value: 'documento de identidad', text: 'Documentos de identidad' },
            ]
          },
          {
            heading: 'Alquiler',
            items: [
              { icon: House, name: 'Housing', value: 'propiedades', text: 'Propiedades' },
              { icon: BedSingle, name: 'HousingRoom', value: 'habitaciones', text: 'Habitaciones' },
            ]
          },
        ]" :key="groupIndex">
          <CommandGroup :heading="group.heading">
            <template v-for="(item, itemIndex) in group.items" :key="itemIndex">
              <router-link v-if="item.name" :to="{ name: item.name }" v-slot="{ isExactActive }">
                <CommandItem :value="item.value"
                  :class="isExactActive ? 'bg-teal-100 dark:bg-slate-800' : 'hover:bg-teal-100 dark:hover:bg-slate-800 cursor-pointer'"
                  @click="closeSidebar">
                  <component :is="item.icon" class="mr-2 animate-pulse" />
                  {{ item.text }}
                </CommandItem>
              </router-link>
              <CommandItem v-else :value="item.value">
                {{ item.text }}
              </CommandItem>
            </template>
          </CommandGroup>
          <CommandSeparator />
        </template>

      </CommandList>
    </Command>
  </nav>
</template>

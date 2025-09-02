<script setup>
import { ref } from 'vue'
import Menubar from 'primevue/menubar'

const items = ref([
  { label: 'Home', icon: 'pi pi-home', to: '/' },
  { label: 'History', icon: 'pi pi-history', to: '/history' }
])
</script>

<template>
  <div class="card">
    <Menubar :model="items">
      <template #item="{ item }">
        <router-link v-ripple class="flex items-center" :to="item.to">
          <button type="button" class="p-menubaritem-link flex items-center">
            <i :class="item.icon"></i>
            <span class="ml-2">{{ item.label }}</span>
          </button>
        </router-link>
      </template>
    </Menubar>
  </div>

  <router-view />
</template>
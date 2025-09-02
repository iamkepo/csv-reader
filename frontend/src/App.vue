<template>
  <div class="card">
    <Menubar :model="items">
      <template #item="{ item }">
        <router-link v-ripple class="flex items-center" :to="item.to">
          <Button :severity="item.to === currentPath ? 'primary' : 'secondary'">
            <i :class="item.icon"></i>
            <span class="ml-2">{{ item.label }}</span>
          </Button>
        </router-link>
      </template>
    </Menubar>
  </div>

  <router-view />
</template>
<script setup>
import { ref, computed } from 'vue'
import Menubar from 'primevue/menubar'
import Button from 'primevue/button'

const items = ref([
  { label: 'Home', icon: 'pi pi-home', to: '/' },
  { label: 'History', icon: 'pi pi-history', to: '/history' }
])
const currentPath = computed(() => window.location.pathname)
</script>

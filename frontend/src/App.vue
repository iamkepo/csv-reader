<script setup>
import { ref, computed } from 'vue'
import Home from './pages/Home.vue'
import History from './pages/History.vue'

import Menubar from 'primevue/menubar';
import Badge from 'primevue/badge';

const NotFound = { template: '<h1>Not Found</h1>' }

const routes = {
  '/': Home,
  '/history': History
}

const items = ref([
  { label: 'Home', icon: 'pi pi-home', to: '/' },
  { label: 'History', icon: 'pi pi-history', to: '/history' }
])

const currentPath = ref(window.location.hash || '#/')

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash || '#/'
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})
</script>

<template>
  <div class="card">
    <Menubar :model="items">
      <template #item="{ item, root }">
        <a v-ripple class="flex items-center" :href="'#' + item.to">
          <span>{{ item.label }}</span>
          <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
          <span v-if="item.shortcut" class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut }}</span>
          <i v-if="item.items" :class="['pi pi-angle-down ml-auto', { 'pi-angle-down': root, 'pi-angle-right': !root }]"></i>
        </a>
      </template>
    </Menubar>
  </div>

  <component :is="currentView" />
</template>
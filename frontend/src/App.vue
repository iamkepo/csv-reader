<script setup>
  import { ref, computed } from 'vue'
  import Home from './pages/Home.vue'
  import History from './pages/History.vue'

  // Fallback view for unknown routes
  const NotFound = { template: '<h1>Not Found</h1>' }

  const routes = {
    '/': Home,
    '/history': History
  }

  const currentPath = ref(window.location.hash)

  window.addEventListener('hashchange', () => {
    currentPath.value = window.location.hash
  })

  const currentView = computed(() => {
    return routes[currentPath.value.slice(1) || '/'] || NotFound
  })
</script>

<template>
  <a href="#/">Home</a> |
  <a href="#/history">History</a> |
  <a href="#/non-existent-path">Broken Link</a>
  <component :is="currentView" />
</template>

<template>
  <div class="flex min-h-screen">
    <!-- Sidebar -->
    <Menu :model="menuItems" class="w-20">
      <!-- Logo -->
      <template #start>
        <span class="inline-flex items-center gap-2 px-2 py-3">
          <i class="pi pi-rocket text-2xl text-primary"></i>
          <span class="text-xl font-semibold">PRIME<span class="text-primary">APP</span></span>
        </span>
      </template>

      <!-- Custom item rendering with vue-router -->
      <template #item="{ item, props }">
        <router-link v-slot="{ href, navigate }" :to="item.to" custom>
          <a v-ripple :href="href" @click="navigate" class="flex items-center px-2 py-2 w-full rounded-md hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors duration-200"
              :class="{'bg-primary-100 text-primary font-semibold': isActive(item.to)}">
            <i :class="item.icon + ' mr-2'"></i>
            <span>{{ item.label }}</span>
            <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
          </a>
        </router-link>
      </template>
    </Menu>

    <Toast />

    <!-- Main content -->
    <main class="flex-1 p-6 bg-gray-100 dark:bg-surface-900">
      <slot />
    </main>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'
  import Menu from 'primevue/menu'
  import Badge from 'primevue/badge'
  import Toast from 'primevue/toast'

  const route = useRoute()

  const menuItems = ref([
    { label: 'Home', icon: 'pi pi-home', to: '/' },
    { label: 'Statistics', icon: 'pi pi-chart-line', to: '/statistics' },
    { label: 'Profile', icon: 'pi pi-user', to: '/profile' },
    { label: 'History', icon: 'pi pi-folder', to: '/history', badge: 5 }
  ])

  function isActive(path) {
    return route.path === path
  }
</script>
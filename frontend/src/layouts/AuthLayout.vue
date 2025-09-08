<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-6">
    <Toast />
    <Card class="w-full max-w-md">
      <template #title>
        <h2 class="text-center text-2xl font-bold">{{ title }}</h2>
      </template>

      <template #content>
        <slot />
      </template>
    </Card>
  </div>
</template>

<script setup>
  import Toast from 'primevue/toast'
  import Card from 'primevue/card' // <-- use default import

  defineProps({
    title: {
      type: String,
      default: 'Authentication'
    }
  })
</script>
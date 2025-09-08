<template>
  <DashboardLayout>
    <h1 class="text-2xl font-bold mb-4">Profile</h1>
    <form class="flex flex-col gap-4 max-w-md">
      <InputText v-model="name" placeholder="Name" />
      <InputText v-model="email" placeholder="Email" />
      <Button label="Update Profile" @click.prevent="onUpdate" />
    </form>
  </DashboardLayout>
</template>

<script setup>
  import DashboardLayout from '@/layouts/DashboardLayout.vue'
  import InputText from 'primevue/inputtext'
  import Button from 'primevue/button'
  import { ref } from 'vue'

  const name = ref('John Doe')
  const email = ref('john@example.com')

  function onUpdate() {
    console.log('update profile', { name: name.value, email: email.value })
  }
</script>
<template>
  <AuthLayout title="Reset Password">
    <form class="flex flex-col gap-4">
      <InputText v-model="email" placeholder="Enter your email" />
      <Button label="Send reset link" class="w-full" @click.prevent="onReset" />
      <router-link to="/login" class="text-center text-sm text-blue-600">Back to Login</router-link>
    </form>
  </AuthLayout>
</template>

<script setup>
import AuthLayout from '@/layouts/AuthLayout.vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { ref } from 'vue'

const email = ref('')

function onReset() {
  console.log('reset password for', email.value)
}
</script>
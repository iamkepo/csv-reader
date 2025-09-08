<template>
  <AuthLayout title="Register">
    <form class="flex flex-col gap-4">
      <InputText v-model="name" placeholder="Name" />
      <InputText v-model="email" placeholder="Email" />
      <Password v-model="password" placeholder="Password" toggleMask />
      <Password v-model="confirmPassword" placeholder="Confirm Password" toggleMask />

      <Button label="Register" class="w-full" @click.prevent="onRegister" />
      <router-link to="/login" class="text-center text-sm text-blue-600">Already have an account? Login</router-link>
    </form>
  </AuthLayout>
</template>

<script setup>
import AuthLayout from '@/layouts/AuthLayout.vue'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

function onRegister() {
  console.log('register with', name.value, email.value, password.value)
}
</script>
<template>
  <AuthLayout title="Login">
    <Form v-slot="$form" :initialValues="initialValues" :resolver="resolver" @submit="onFormSubmit" class="flex flex-col gap-4">
      <InputText v-model="$form.email" placeholder="Email" class="w-full" />
      <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{ $form.email.error?.message }}</Message>
      <Password v-model="$form.password" placeholder="Password" toggleMask class="w-full" />
      <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">{{ $form.password.error?.message }}</Message>

      <Button type="submit" label="Login" class="w-full" />
      <router-link to="/register" class="text-center text-sm text-blue-600">No account? Register</router-link>
      <router-link to="/forget" class="text-center text-sm text-gray-500">Forgot password?</router-link>
    </Form>
  </AuthLayout>
</template>

<script setup>
import AuthLayout from '@/layouts/AuthLayout.vue'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Message from 'primevue/message'
import { useToast } from 'primevue/usetoast';
import { Form } from '@primevue/forms';
import { z } from 'zod'
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { ref } from 'vue'

const initialValues = ref({
  email: '',
  password: ''
})
const toast = useToast();
const schema = z.object({
  email: z.string().email().min(1, { message: 'Email is required via Zod.' }),
  password: z.string().min(1, { message: 'Password is required via Zod.' })
})

const resolver = zodResolver(schema)

const onFormSubmit = ({ valid }) => {
  if (valid) {
    toast.add({ severity: 'success', summary: 'Form is submitted.', life: 3000 });
    console.log('form submitted', initialValues.value)
  } else {
    toast.add({ severity: 'error', summary: 'Form is invalid.', life: 3000 });
  }
}

</script>
<script lang="ts" setup>
import { reactive } from 'vue'

import { useAuthStore } from '@/api/modules/auth/auth.store'

function passwordMapper(password: string) {
  return password.replaceAll(/./g, '#')
}

const authStore = useAuthStore()
const userData = reactive({
  email: authStore.userData?.userEmail || '',
  phone: authStore.userData?.userPhone || '',
  firstName: authStore.userData?.userName || '',
  lastName: authStore.userData?.userLastName,
  password: passwordMapper(authStore.userData?.userPassword || '')
})
</script>

<template>
  <div>
    <h2 class="heading mb-40 font-hnd text-button-black">General info</h2>
    <form @submit.prevent class="flex flex-col gap-y-16">
      <AppInput placeholder="e-mail" v-model="userData.email" />
      <AppInput placeholder="phone number" v-model="userData.phone" />
      <AppInput placeholder="first name" v-model="userData.firstName" />
      <AppInput placeholder="last name" v-model="userData.lastName" />
      <AppInput
        placeholder="password"
        v-model="userData.password"
        type="password"
      />
    </form>
  </div>
</template>

<style lang="scss" scoped>
@import './style.scss';
</style>

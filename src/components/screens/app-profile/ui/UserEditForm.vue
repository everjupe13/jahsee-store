<script lang="ts" setup>
import { reactive } from 'vue'
import { useModal } from 'vue-final-modal'

import { useUserStore } from '@/api/modules/user/user.store'

import UserEditFormModal from './UserEditFormModal.vue'

function passwordMapper(password: string) {
  return password.replaceAll(/./g, '#')
}

const userStore = useUserStore()
const userData = reactive({
  email: userStore.profile?.userEmail || '',
  phone: userStore.profile?.userPhone || '',
  firstName: userStore.profile?.userName || '',
  lastName: userStore.profile?.userLastName,
  password: passwordMapper(userStore.profile?.userPassword || '')
})

const { open: _open, close } = useModal({
  component: UserEditFormModal,
  attrs: {
    onConfirm() {
      close()
    }
  }
})
</script>

<template>
  <form @submit.prevent class="flex flex-col gap-y-16">
    <AppInput placeholder="e-mail" v-model="userData.email" disabled />
    <AppInput placeholder="phone number" v-model="userData.phone" disabled />
    <AppInput placeholder="first name" v-model="userData.firstName" disabled />
    <AppInput placeholder="last name" v-model="userData.lastName" disabled />
    <AppInput
      placeholder="password"
      v-model="userData.password"
      disabled
      type="password"
    />
  </form>
</template>

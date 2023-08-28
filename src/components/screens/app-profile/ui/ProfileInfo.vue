<script lang="ts" setup>
import { reactive } from 'vue'
import { useModal } from 'vue-final-modal'

import { useAuthStore } from '@/api/modules/auth/auth.store'

import UserEditFormModal from './UserEditFormModal.vue'

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

const { open, close } = useModal({
  component: UserEditFormModal,
  attrs: {
    onConfirm() {
      close()
    }
  }
})

const onClicked = () => {
  console.log('clicked')
  open()
}
</script>

<template>
  <div>
    <h2 class="heading mb-40 font-hnd text-button-black">General info</h2>
    <form @submit.prevent class="flex flex-col gap-y-16">
      <AppInput
        placeholder="e-mail"
        v-model="userData.email"
        disabled
        @click="onClicked"
      />
      <AppInput
        placeholder="phone number"
        v-model="userData.phone"
        disabled
        @click="onClicked"
      />
      <AppInput
        placeholder="first name"
        v-model="userData.firstName"
        disabled
        @click="onClicked"
      />
      <AppInput
        placeholder="last name"
        v-model="userData.lastName"
        disabled
        @click="onClicked"
      />
      <AppInput
        placeholder="password"
        v-model="userData.password"
        type="password"
        disabled
        @click="onClicked"
      />
    </form>
  </div>
</template>

<style lang="scss" scoped>
@import './style.scss';
</style>

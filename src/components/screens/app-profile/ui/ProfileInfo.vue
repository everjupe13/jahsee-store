<script lang="ts" setup>
import { onMounted, reactive, watch } from 'vue'
import { useModal } from 'vue-final-modal'

import { useUserStore } from '@/api/modules/user'

import ProfileTabHeading from './ProfileTabHeading.vue'
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
  password: passwordMapper('*************')
})

onMounted(() => {
  ;(userData.email = userStore.profile?.userEmail || ''),
    (userData.phone = userStore.profile?.userPhone || ''),
    (userData.firstName = userStore.profile?.userName || ''),
    (userData.lastName = userStore.profile?.userLastName),
    (userData.password = passwordMapper('*************'))
})

watch(
  () => userStore.profile,
  () => {
    ;(userData.email = userStore.profile?.userEmail || ''),
      (userData.phone = userStore.profile?.userPhone || ''),
      (userData.firstName = userStore.profile?.userName || ''),
      (userData.lastName = userStore.profile?.userLastName),
      (userData.password = passwordMapper('*************'))
  },
  { deep: true }
)

const { open: openUserForm, close: closeUserForm } = useModal({
  component: UserEditFormModal,
  attrs: {
    onConfirm() {
      closeUserForm()
    }
  }
})

const onInputClick = () => {
  openUserForm()
}
</script>

<template>
  <div>
    <ProfileTabHeading>General info</ProfileTabHeading>
    <form @submit.prevent class="flex flex-col gap-y-16">
      <AppInput
        placeholder="e-mail"
        v-model="userData.email"
        readonly
        @click="onInputClick"
      />
      <AppInput
        placeholder="phone number"
        v-model="userData.phone"
        readonly
        @click="onInputClick"
      />
      <AppInput
        placeholder="first name"
        v-model="userData.firstName"
        readonly
        @click="onInputClick"
      />
      <AppInput
        placeholder="last name"
        v-model="userData.lastName"
        readonly
        @click="onInputClick"
      />
      <AppInput
        placeholder="password"
        v-model="userData.password"
        type="password"
        readonly
        @click="onInputClick"
      />
    </form>
  </div>
</template>

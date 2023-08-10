<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { email, minLength, required } from '@vuelidate/validators'
import { reactive } from 'vue'

import { useAuthStore } from '@/api/modules/auth/auth.store'

// const emit = defineEmits(['submit'])

const formData = reactive({
  email: '',
  name: '',
  lastName: '',
  password: ''
})

const rules = {
  email: { required, email },
  name: { required },
  password: { required, minLengthValue: minLength(6) }
}

const v$ = useVuelidate(rules, formData)

const store = useAuthStore()
const onSubmitForm = () => {
  if (v$.value.$invalid) {
    v$.value.$validate()
    return
  }

  store.signUpUser({
    email: formData.email,
    name: formData.name,
    lastName: formData.lastName,
    password: formData.password
  })
}
</script>

<template>
  <form
    class="mx-auto max-w-[580px] bg-white p-30 pb-30 md:p-60 md:pb-50"
    @submit.prevent="onSubmitForm"
  >
    <div
      class="mb-30 text-center font-hnd text-[30px] font-medium uppercase leading-tight tracking-[1.6px] text-button-black md:mb-40 md:text-[40px]"
    >
      Welcome to ayaysee
    </div>
    <div class="mb-30 md:mb-40">
      <AppInput
        v-model="v$.email.$model"
        placeholder="e-mail*"
        class="mb-15"
        :is-valid="v$.email.$dirty ? !v$.email.$invalid : true"
        :is-dirty="v$.email.$dirty"
        :validation-message="v$.email.$silentErrors[0]?.$message"
      />
      <AppInput
        v-model="v$.name.$model"
        placeholder="first name*"
        class="mb-15"
        :is-valid="v$.name.$dirty ? !v$.name.$invalid : true"
        :is-dirty="v$.name.$dirty"
        :validation-message="v$.name.$silentErrors[0]?.$message"
      />
      <AppInput
        v-model="formData.lastName"
        placeholder="last name"
        class="mb-15"
      />
      <AppInput
        v-model="v$.password.$model"
        placeholder="password*"
        type="password"
        :is-valid="v$.password.$dirty ? !v$.password.$invalid : true"
        :is-dirty="v$.password.$dirty"
        :validation-message="v$.password.$silentErrors[0]?.$message"
      />
    </div>
    <AppButton fluid class="mb-25">Sign Up</AppButton>
    <div class="text-center font-medium leading-none text-[#6a6e7a]">
      Already have an account?
      <router-link to="/login" class="text-button-black">Log in</router-link>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.title {
  color: #000;
  text-align: center;
  font-size: 40px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
  letter-spacing: 1.6px;
  text-transform: uppercase;

  @apply font-hnd;

  @media (max-width: 767px) {
    font-size: 30px;
  }
}
</style>

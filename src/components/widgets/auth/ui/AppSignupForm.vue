<script lang="ts" setup>
import AppInput from '@/components/shared/AppInput.vue'

const emit = defineEmits(['submit'])
const onSubmitForm = () => {
  emit('submit')
}
</script>

<template>
  <form
    class="mx-auto max-w-[580px] bg-white p-30 pb-30 md:p-60 md:pb-50"
    @submit.prevent="onSubmitForm"
  >
    <div class="title mb-30 md:mb-40">Welcome to ayaysee</div>
    <div class="mb-30 md:mb-40">
      <AppInput
        placeholder="e-mail*"
        class="mb-15"
        :validatable="true"
        validation-message="Invalid e-mail"
      />
      <AppInput placeholder="first name*" class="mb-15" :validatable="false" />
      <AppInput placeholder="last name" class="mb-15" :validatable="false" />
      <AppInput
        placeholder="password*"
        type="password"
        :validatable="true"
        validation-message="Password must be at least 8 char"
      />
    </div>
    <AppButton fluid class="mb-25">Sign Up</AppButton>
    <div class="post-message">
      Already have an account?
      <router-link to="/login" class="post-message__link">Log in</router-link>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.title {
  color: #000;
  text-align: center;
  font-family: 'Helvetica Now Display';
  font-size: 40px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
  letter-spacing: 1.6px;
  text-transform: uppercase;

  @media (max-width: 767px) {
    font-size: 30px;
  }
}

.post-message {
  color: #6a6e7a;
  text-align: center;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;

  &__link {
    color: #000;
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
  }
}
</style>

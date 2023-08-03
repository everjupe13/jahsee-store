<script lang="ts" setup>
import AppFormButton from './AppFormButton.vue'
import AppFormInput from './AppFormInput.vue'

const emit = defineEmits(['submit'])
const onSubmitForm = () => {
  emit('submit')
}
</script>

<template>
  <form
    class="tw-mx-auto tw-max-w-[580px] tw-bg-white tw-p-30 tw-pb-30 md:tw-p-60 md:tw-pb-50"
    @submit.prevent="onSubmitForm"
  >
    <div class="title tw-mb-30 md:tw-mb-40">Welcome to ayaysee</div>
    <div class="tw-mb-30 md:tw-mb-40">
      <AppFormInput
        placeholder="e-mail*"
        class="tw-mb-15"
        :validatable="true"
        validation-message="Invalid e-mail"
      />
      <AppFormInput
        placeholder="first name*"
        class="tw-mb-15"
        :validatable="false"
      />
      <AppFormInput
        placeholder="last name"
        class="tw-mb-15"
        :validatable="false"
      />
      <AppFormInput
        placeholder="password*"
        type="password"
        :validatable="true"
        validation-message="Password must be at least 8 char"
      />
    </div>
    <AppFormButton class="tw-mb-25">Log In</AppFormButton>
    <div class="post-message">
      Already have an account?
      <router-link to="/signup" class="post-message__link">Log in</router-link>
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

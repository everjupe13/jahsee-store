<script lang="ts" setup>
import { ref } from 'vue'

const lastStep = ref(false)
const proceedChangePassword = () => {
  lastStep.value = true
}
</script>

<template>
  <AppContainer>
    <section class="tw-pt-30 md:tw-pt-50 -tw-mx-15 md:tw-mx-0">
      <form @submit.prevent class="form">
        <div class="form__title tw-mb-30 md:tw-mb-57">CHANGE YOUR PASSWORD</div>
        <template v-if="!lastStep">
          <div class="form__body !tw-mb-0 !md:tw-mb-30">
            <AppInput placeholder="EMAIL*" class="tw-mb-20 md:tw-mb-45" />
          </div>
          <div class="form__error-message">
            Unknown profile
          </div>
          <div class="tw-flex tw-flex-col md:tw-flex-row tw-w-[300px] md:tw-w-auto tw-justify-center tw-gap-x-40">
            <AppButton type="button" @click="$router.push('/login')" class="btn form__btn tw-mb-10 md:tw-mb-25 tw-w-[240px] !tw-bg-[#969EAB]" theme="alternative">CANCEL</AppButton>
            <AppButton type="button" class="btn form__btn tw-mb-25 tw-w-[240px] tw-justify-center" @click="proceedChangePassword">SEND</AppButton>
          </div>
        </template>
        <template v-else>
          <p class="reset-pass__text">The link to reset your password has been sent to you by email</p>
        </template>
      </form>
    </section>
  </AppContainer>
</template>

<style lang="scss" scoped>
.reset-pass__text {
  margin-bottom: 40px;

  color: #000;
  font-family: Montserrat;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-transform: uppercase;
}
</style>
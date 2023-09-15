<!-- TODO: depricated -->
<script lang="ts" setup>
import { ref } from 'vue'

const lastStep = ref(false)
const proceedChangePassword = () => {
  lastStep.value = true
}
</script>

<template>
  <AppContainer>
    <section class="-mx-15 pb-40 pt-30 md:mx-0 md:pt-40">
      <form @submit.prevent class="form">
        <div class="form__title mb-30 md:mb-57">CHANGE YOUR PASSWORD</div>
        <template v-if="!lastStep">
          <div class="form__body !md:mb-30 !mb-0">
            <AppInput placeholder="EMAIL*" class="mb-20 md:mb-45" />
          </div>
          <div class="form__error-message">Unknown profile</div>
          <div
            class="flex w-[300px] flex-col justify-center gap-x-40 md:w-auto md:flex-row"
          >
            <AppButton
              type="button"
              @click="$router.push('/login')"
              class="btn form__btn mb-10 w-[240px] !bg-[#969EAB] md:mb-25"
              theme="alternative"
            >
              CANCEL
            </AppButton>
            <AppButton
              type="button"
              class="btn form__btn mb-25 w-[240px] justify-center"
              @click="proceedChangePassword"
            >
              SEND
            </AppButton>
          </div>
        </template>
        <template v-else>
          <p class="reset-pass__text">
            The link to reset your password has been sent to you by email
          </p>
        </template>
      </form>
    </section>
  </AppContainer>
</template>

<style lang="scss" scoped>
.reset-pass__text {
  margin-bottom: 40px;

  color: #000;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-transform: uppercase;
}
</style>

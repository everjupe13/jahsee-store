<script lang="ts" setup>
import { ref } from 'vue'

const lastStep = ref(false)
const proceedChangePassword = () => {
  lastStep.value = true
}
</script>

<template>
  <AppContainer>
    <section class="-tw-mx-15 tw-pt-30 md:tw-mx-0 md:tw-pt-50">
      <form @submit.prevent class="form">
        <div class="form__title tw-mb-30 md:tw-mb-57">CHANGE YOUR PASSWORD</div>
        <template v-if="!lastStep">
          <div class="form__body !md:tw-mb-30 !tw-mb-0">
            <AppInput placeholder="PASSWORD*" class="tw-mb-20 md:tw-mb-45" />
            <AppInput
              placeholder="CONFIRM PASSWORD*"
              class="tw-mb-20 md:tw-mb-45"
            />
          </div>
          <div class="form__error-message">the password is incorrect</div>
          <div class="tw-flex tw-justify-center tw-gap-x-40">
            <AppButton
              type="button"
              class="btn form__btn tw-mb-25 tw-w-[240px] tw-justify-center"
              @click="proceedChangePassword"
            >
              SEND
            </AppButton>
          </div>
        </template>
        <template v-else>
          <p class="reset-pass__text">Your password has been reset</p>
          <AppButton
            type="button"
            @click="$router.push('/login')"
            class="btn form__btn tw-mb-25"
          >
            GO BACK TO SIGN IN
          </AppButton>
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

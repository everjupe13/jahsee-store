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
            <AppInput placeholder="EMAIL*" class="tw-mb-20 md:tw-mb-45" />
          </div>
          <div class="form__error-message">Unknown profile</div>
          <div
            class="tw-flex tw-w-[300px] tw-flex-col tw-justify-center tw-gap-x-40 md:tw-w-auto md:tw-flex-row"
          >
            <AppButton
              type="button"
              @click="$router.push('/login')"
              class="btn form__btn tw-mb-10 tw-w-[240px] !tw-bg-[#969EAB] md:tw-mb-25"
              theme="alternative"
            >
              CANCEL
            </AppButton>
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
  font-family: Montserrat;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-transform: uppercase;
}
</style>

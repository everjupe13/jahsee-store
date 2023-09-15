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
            <AppInput placeholder="PASSWORD*" class="mb-20 md:mb-45" />
            <AppInput placeholder="CONFIRM PASSWORD*" class="mb-20 md:mb-45" />
          </div>
          <div class="form__error-message">the password is incorrect</div>
          <div class="flex justify-center gap-x-40">
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
          <p class="reset-pass__text">Your password has been reset</p>
          <AppButton
            type="button"
            @click="$router.push('/login')"
            class="btn form__btn mb-25"
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
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-transform: uppercase;
}
</style>

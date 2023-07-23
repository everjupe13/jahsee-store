<script lang="ts" setup>

</script>

<template>
  <AppContainer>
    <section class="tw-pt-30 md:tw-pt-50 -tw-mx-15 md:tw-mx-0">
      <form @submit.prevent class="form">
        <div class="form__title tw-mb-30 md:tw-mb-57">Welcome to ayaysee</div>
        <div class="form__body !tw-mb-0 !md:tw-mb-30">
          <AppInput placeholder="EMAIL*" class="tw-mb-20 md:tw-mb-45" />
          <div class="tw-relative tw-pb-20 md:tw-pb-45">
            <AppInput placeholder="CREATE A PASSWORD*" />
            <span class="form__input-hint">Password must be at least 8 char</span>
          </div>
          <AppInput placeholder="FIRST NAME" class="tw-mb-20 md:tw-mb-45" />
          <AppInput placeholder="LAST NAME" class="tw-mb-20 md:tw-mb-45" />
        </div>
        <div class="form__error-message">
          this email is already in use
        </div>
        <AppButton class="btn form__btn tw-mb-25">sign up</AppButton>
        <router-link to="/login" class="form__link">Already have an account?</router-link>
      </form>
    </section>
  </AppContainer>
</template>

<style lang="scss" scoped>
  
</style>
<script lang="ts" setup>

</script>

<template>
  <AppContainer>
    <section class="tw-pt-30 md:tw-pt-50 -tw-mx-15 md:tw-mx-0">
      <form class="form">
        <div class="form__title tw-mb-30 md:tw-mb-57">Welcome to ayaysee</div>
        <div class="form__body !tw-mb-0 !md:tw-mb-30">
          <AppInput placeholder="EMAIL*" class="tw-mb-20 md:tw-mb-45" />
          <div class="tw-relative tw-pb-20 md:tw-pb-45">
            <AppInput placeholder="CREATE A PASSWORD*" />
            <router-link to="/" class="form__input-hint">FORGOT PASSWORD?</router-link>
          </div>
        </div>
        <div class="form__error-message">
          the email or password is incorrect
        </div>
        <AppButton class="btn form__btn tw-mb-25">Log In</AppButton>
        <router-link to="/signup" class="form__link">Don’t have an account? </router-link>
      </form>
    </section>
  </AppContainer>
</template>

<style lang="scss" scoped>
  
</style>
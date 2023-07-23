<script lang="ts" setup>

</script>

<template>
  <AppContainer>
    <section class="tw-pt-30 md:tw-pt-50 -tw-mx-15 md:tw-mx-0">
      <form @submit.prevent class="form">
        <div class="form__title tw-mb-30 md:tw-mb-57">edit account details</div>
        <div class="form__body !tw-mb-0 !md:tw-mb-30">
          <AppInput placeholder="FIRST NAME" class="tw-mb-20 md:tw-mb-45" />
          <AppInput placeholder="LAST NAME" class="tw-mb-20 md:tw-mb-45" />
          <AppInput placeholder="EMAIL" class="tw-mb-20 md:tw-mb-45" />
          <AppInput placeholder="PHONE NUMBER" class="tw-mb-20 md:tw-mb-45" />
        </div>
        <div class="tw-flex tw-flex-col md:tw-flex-row tw-w-[300px] md:tw-w-auto tw-justify-center tw-gap-x-40">
          <AppButton type="button" @click="$router.push('/profile')" class="btn form__btn tw-mb-10 md:tw-mb-25 tw-w-[240px] !tw-bg-[#969EAB]" theme="alternative">CANCEL</AppButton>
          <AppButton class="btn form__btn tw-mb-25 tw-w-[240px] tw-justify-center">SAVE</AppButton>
        </div>
      </form>
    </section>
  </AppContainer>
</template>

<style lang="scss" scoped>
  
</style>
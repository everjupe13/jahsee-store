<script lang="ts" setup></script>

<template>
  <AppContainer>
    <section class="-mx-15 pb-40 pt-30 md:mx-0 md:pt-40">
      <form @submit.prevent class="form">
        <div class="form__title mb-30 md:mb-57">edit account details</div>
        <div class="form__body !md:mb-30 !mb-0">
          <AppInput placeholder="FIRST NAME" class="mb-20 md:mb-45" />
          <AppInput placeholder="LAST NAME" class="mb-20 md:mb-45" />
          <AppInput placeholder="EMAIL" class="mb-20 md:mb-45" />
          <AppInput placeholder="PHONE NUMBER" class="mb-20 md:mb-45" />
        </div>
        <div
          class="flex w-[300px] flex-col justify-center gap-x-40 md:w-auto md:flex-row"
        >
          <AppButton
            type="button"
            @click="$router.push('/profile')"
            class="btn form__btn mb-10 w-[240px] !bg-[#969EAB] md:mb-25"
            theme="alternative"
          >
            CANCEL
          </AppButton>
          <AppButton class="btn form__btn mb-25 w-[240px] justify-center">
            SAVE
          </AppButton>
        </div>
      </form>
    </section>
  </AppContainer>
</template>

<style lang="scss" scoped></style>

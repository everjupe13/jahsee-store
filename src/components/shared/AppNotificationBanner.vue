<script lang="ts" setup>

defineOptions({
  name: 'AppNotificationBanner'
})
</script>

<template>
  <div class="notification tw-flex tw-items-center tw-gap-x-5 md:tw-gap-x-14">
    <img src="@/assets/img/hearth-icon.svg" alt="" class="notification__icon">
    <p class="notification__text tw-font-medium">
      <slot></slot>
    </p>
  </div>
</template>

<style lang="scss" scoped>
.notification {
  position: relative;
  padding: 20px 20px 20px 15px;

  display: flex;
  align-items: center;

  background-color: var(--color-green);
  clip-path: polygon(0% 0%, 92.2% 0%, 93.5% 0.7%, 93.75% 1.1%, 94.2% 2.4%, 99.5% 34%, 99.75% 35.7%, 99.9% 37.4%, 100% 40%, 100% 100%, 0% 100%);
  border-radius: 10px;

  overflow: hidden;

  @media (min-width: 768px) {
    padding: 32px;
  }

  &__icon {
    position: relative;

    width: 20px;
    height: 20px;

    @media (min-width: 768px) {
      width: 28px;
      height: 28px;
    }
  }

  &__text {
    position: relative;
    font-size: 14px;

    @media (min-width: 768px) {
      font-size: 16px;
    }
  }
}
</style>
<script lang="ts" setup>


</script>

<template>
  <footer class="footer">
    <AppContainer>
      <div class="tw-flex tw-items-center footer__wrapper">
        <a href="" class="">
          <img src="@/assets/img/tg-icon.svg" alt="">
        </a>
        <a href="" class="">
          <img src="@/assets/img/ig-icon.svg" alt="">
        </a>
        <a href="" class="">
          <img src="@/assets/img/vk-icon.svg" alt="">
        </a>
        <a href="" class="">
          <img src="@/assets/img/tw-icon.svg" alt="">
        </a>
        <a href="" class="">
          <img src="@/assets/img/disc-icon.svg" alt="">
        </a>
        <a href="/" class="footer__link">SUPPORT</a>
      </div>
    </AppContainer>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  position: absolute;
  bottom: 130px;
  left: 0;
  right: 0;

  &__wrapper {
    column-gap: 222px;
  }

  &__link {
    color: #969EAB;
    font-size: 32px;
    font-weight: 400;
    line-height: normal;
  }
}
</style>
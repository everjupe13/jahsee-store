<script lang="ts" setup>
import AppHeader from '@/components/features/AppHeader.vue'
import AppFooter from '@/components/features/AppFooter.vue'

defineOptions({
  name: 'AppLayout'
})



</script>

<template>
  <AppHeader></AppHeader>
  <main>
    <slot></slot>
  </main>
  <AppFooter></AppFooter>
</template>

<style lang="scss">
#app {
  position: relative;
  overflow: hidden;
  &::after {
    content: '';

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    z-index: -2;

    background: url('@/assets/img/background.jpg') center center/cover no-repeat;
    // background-repeat: repeat;
    // mix-blend-mode: overlay;
  }

  &.animated::before {
    content: '';

    position: absolute;
    top: -520px;
    // left: 50%;
    right: -270px;
    z-index: -1;
    // transform: translateX(-50%);

    width: 1334px;
    // height: calc(100% - 150px);
    height: 1960px;
    // border-radius: 100%;
    // background: rgba(93, 104, 121, 0.54);
    // mix-blend-mode: color-dodge;

    background: url('@/assets/img/big-logo-back.svg') center center/cover no-repeat;
    opacity: 0.02;
    animation: posing-levitation 20s linear infinite;
    // filter: blur(250px);

    @keyframes posing-levitation {
      0% {
        transform: translate(0, 0);
      }
      50% {
        transform: translate(-50px, -10px) scale(1.1, 1.25);
      }
      100% {
        transform: translate(0, 0);
      }
    }
  }
}
</style>

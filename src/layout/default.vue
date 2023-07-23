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
  &::after {
    content: '';

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    z-index: -2;

    background: url('@/assets/img/background-noise.png') center center;
    background-repeat: repeat;
    mix-blend-mode: overlay;
  }

  &::before {
    content: '';

    position: absolute;
    top: 150px;
    left: 50%;
    z-index: -1;
    transform: translateX(-50%);

    width: 1332px;
    height: calc(100% - 150px);
    border-radius: 100%;
    background: rgba(93, 104, 121, 0.54);
    mix-blend-mode: color-dodge;
    filter: blur(250px);
  }
}
</style>

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
    inset: 0;
    z-index: -1;
    
    background: url('@/assets/img/background-noise.png') center center;
    mix-blend-mode: overlay;
  }
}
</style>

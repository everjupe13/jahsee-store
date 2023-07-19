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
main {
  // pb
}
</style>

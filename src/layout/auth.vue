<script lang="ts" setup>
import { AppFooter } from '@/components/widgets/AppFooter'
import { AppHeader } from '@/components/widgets/AppHeader'

defineOptions({
  name: 'AppLayoutLogin'
})
</script>

<template>
  <AppHeader></AppHeader>
  <main
    class="main-section-layout"
    data-aos="zoom-out"
    data-aos-duration="600"
    data-aos-delay="700"
  >
    <slot></slot>
  </main>
  <AppFooter class="pointer-events-none opacity-0"></AppFooter>
</template>

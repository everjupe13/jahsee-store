<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { AppFooter } from '@/components/widgets/AppFooter'
import { AppHeader } from '@/components/widgets/AppHeader'

defineOptions({
  name: 'AppLayout'
})

const route = useRoute()
const isFooterVisible = computed(() => route?.meta?.footerVisible !== false)
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
  <AppFooter
    :class="{ 'pointer-events-none opacity-0': !isFooterVisible }"
  ></AppFooter>
</template>

<style lang="scss"></style>

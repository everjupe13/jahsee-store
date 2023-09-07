<script lang="ts" setup>
import { VueFinalModal } from 'vue-final-modal'
</script>

<template>
  <VueFinalModal
    class="flex items-center justify-center"
    content-class="md:px-40 md:py-50 bg-white max-w-[600px] w-full px-20 py-30 md:mx-10"
  >
    <slot></slot>
  </VueFinalModal>
</template>

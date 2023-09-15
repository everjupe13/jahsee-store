<script lang="ts" setup>
import { VueFinalModal } from 'vue-final-modal'
</script>

<template>
  <VueFinalModal
    class="flex items-center justify-center"
    content-class="lg:px-30 lg:pb-30 lg:pt-40 md:px-25 md:pb-25 md:pt-30 bg-white max-w-[600px] w-full px-20 pb-20 pt-30 mx-10 md:mx-0"
  >
    <slot></slot>
  </VueFinalModal>
</template>

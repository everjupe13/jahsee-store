<script lang="ts" setup>
import { VueFinalModal } from 'vue-final-modal'

const props = defineProps({
  image: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <VueFinalModal
    class="flex items-center justify-center"
    content-class="w-full max-w-[500px] md:m-10 flex items-center justify-center"
  >
    <div
      class="min-h-[200px] bg-button-black/80"
      :class="{
        'h-[500px] w-full max-w-[300px] bg-button-black/90': !props.image
      }"
    >
      <img :src="props.image" alt="" />
    </div>
  </VueFinalModal>
</template>

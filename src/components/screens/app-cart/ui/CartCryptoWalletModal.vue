<script lang="ts" setup>
import { onMounted } from 'vue'

onMounted(() => {
  setTimeout(() => {
    window.DePayButtons.init({ document: document })
  }, 500)
})

const props = defineProps({
  payload: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div
    class="DePayButton"
    label="Pay"
    integration="e2352749-f1c7-441c-bba9-d9624e2222b8"
    blockchains='["ethereum","bsc","polygon","solana"]'
    :payload="props.payload"
  ></div>
  <!-- <noscript>
    <a href="https://depay.com">Web3 Payments</a>
    are only supported with JavaScript enabled.
  </noscript> -->
</template>

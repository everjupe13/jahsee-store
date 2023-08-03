<script setup lang="ts">
import { computed, onMounted, onUnmounted, provide, ref } from 'vue'

import Layout from '@/layout/default.vue'

const appWidth = ref(window.innerWidth)

function setSizing() {
  appWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', setSizing, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('resize', setSizing)
})

const isMdScreen = computed(() => appWidth.value < 768)
const isLgScreen = computed(() => appWidth.value > 992)

provide('isMdScreen', isMdScreen)
provide('isLgScreen', isLgScreen)
</script>

<template>
  <Layout>
    <router-view></router-view>
  </Layout>
</template>

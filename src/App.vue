<script setup lang="ts">
import Layout from '@/layout/default.vue'
import { provide, ref, onMounted, onUnmounted, computed } from 'vue'

const appWidth = ref(window.innerWidth)

function setSizing() {
  appWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener(
    'resize',
    setSizing,
    { passive: true }
  )
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

<style lang="scss" scoped>

</style>

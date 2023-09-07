<script setup lang="ts">
import { computed, onMounted, onUnmounted, provide, ref } from 'vue'

import { NetworkLoader } from '@/components/widgets/loaders'
import Layout from '@/layout/default.vue'

import { AuthController } from './components/screens/app-root'

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
  <Suspense>
    <AuthController>
      <Layout>
        <RouterView></RouterView>
      </Layout>
      <NetworkLoader></NetworkLoader>
    </AuthController>
  </Suspense>
</template>

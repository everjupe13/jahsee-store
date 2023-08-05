<script lang="ts" setup>
import 'plyr/dist/plyr.css'

import Plyr from 'plyr'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import { DROPS_DATA } from '@/api/domain/drops'

const videoRef = ref(null)
const videoPlayer = ref()
const route = useRoute()
const currentDropData = ref(
  DROPS_DATA.find(data => data.dropSlug === route.params.dropSlug)
)
const defaultPoster = new URL(
  '@/assets/media/catalog-video-plug-poster.png',
  import.meta.url
).href
const defaultVideo = new URL(
  '@/assets/media/catalog-video-plug.mp4',
  import.meta.url
).href

const videoPoster = currentDropData.value?.videoPoster || defaultPoster
const videoSource = currentDropData.value?.video || defaultVideo

onMounted(() => {
  if (!videoRef.value) {
    return
  }

  const localStoragePlyrData = JSON.parse(localStorage.getItem('plyr') || '{}')
  if (!localStoragePlyrData.muted) {
    localStorage.removeItem('plyr')
  }

  videoPlayer.value = new Plyr(videoRef.value, {
    muted: true,
    autoplay: true,
    disableContextMenu: true,
    loop: { active: true },
    hideControls: true,
    controls: [],
    displayDuration: false,
    fullscreen: { enabled: false, fallback: false },
    ...(process.env.NODE_ENV === 'development' ? { debug: true } : {})
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  videoPlayer.value.on('pause', (event: any) => {
    const instance = event.detail.plyr
    instance.play()
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  videoPlayer.value.on('canplaythrough', (event: any) => {
    const instance = event.detail.plyr
    instance.config.muted = true
    instance.play()
  })
})
</script>

<template>
  <div class="pointer-events-none">
    <video
      ref="videoRef"
      :poster="videoPoster"
      :src="videoSource"
      width="630"
      height="572"
      loop="true"
      :muted="true"
      autoplay="true"
      playsinline="true"
      class="pointer-events-none"
    >
      <source :src="videoSource" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<style lang="scss" scoped></style>

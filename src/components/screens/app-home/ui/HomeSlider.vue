<script lang="ts" setup>
import 'swiper/css'
import 'swiper/css/free-mode'

import type { Swiper as ISwiper } from 'swiper'
import { FreeMode } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { provide, ref } from 'vue'

import { useCatalogStore } from '@/api/modules/catalog'

import HomeSliderCard from './HomeSliderCard.vue'

const modules = [FreeMode]

const isSwiperEnd = ref(false)
const isSwiperBeginning = ref(true)

provide('swiperOptions', {
  isSwiperEnd,
  isSwiperBeginning
})

const onSlideChange = (swiper: ISwiper) => {
  isSwiperEnd.value = swiper.isEnd
  isSwiperBeginning.value = swiper.isBeginning
}

const catalogStore = useCatalogStore()
</script>

<template>
  <swiper
    v-if="catalogStore.sortedCatalog.length > 0"
    @slideChange="onSlideChange"
    :space-between="40"
    :modules="modules"
    :slide-to-clicked-slide="true"
    class="drop-gallery"
    data-aos="zoom-out"
    data-aos-delay="50"
    data-aos-duration="600"
  >
    <swiper-slide v-for="item in catalogStore.sortedCatalog" :key="item.id">
      <HomeSliderCard v-bind="item" />
    </swiper-slide>
  </swiper>
</template>

<style lang="scss" scoped>
.swiper {
  overflow: visible !important;

  .swiper-slide {
    @apply opacity-20;
    transition: opacity 0.25s ease;
  }

  .swiper-slide-active {
    @apply opacity-100;
  }
}
</style>

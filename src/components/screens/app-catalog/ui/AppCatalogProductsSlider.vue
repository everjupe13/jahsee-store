<script lang="ts" setup>
import 'swiper/css'
import 'swiper/css/free-mode'

import type { Swiper as ISwiper } from 'swiper'
import { FreeMode } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { computed, inject, provide, type Ref, ref } from 'vue'
import { useRoute } from 'vue-router'

import { useCatalogStore } from '@/api/modules/catalog'

import AppCatalogProductSliderCard from './AppCatalogProductSliderCard.vue'
import AppCatalogSliderButtons from './AppCatalogSliderButtons.vue'

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
  swiperActiveIndex.value = swiper.activeIndex
}
const onSwiper = (swiper: ISwiper) => {
  swiperRef.value = swiper
}

const swiperRef: Ref<ISwiper | null> = ref(null)
const swiperActiveIndex = ref(0)
const breakpoints = {
  768: {
    slidesPerView: 3
  }
}
const isMdScreen = inject('isMdScreen') as Ref<boolean | undefined>

const route = useRoute()
const catalogStore = useCatalogStore()

const currentCatalog =
  catalogStore.catalog &&
  catalogStore.catalog?.find(
    catalog => catalog.dropSlug === route.params.dropSlug
  )

const slidesProgress = computed(() => {
  const slidesCount = currentCatalog?.products?.length || 0
  if (!slidesCount) {
    return '0 of 0'
  }

  const currentIndex = swiperActiveIndex.value + 1
  const currentIndexRange = isMdScreen.value
    ? `${currentIndex}`
    : `${currentIndex}-${currentIndex + 2}`

  return `${currentIndexRange} of ${slidesCount}`
})
</script>

<template>
  <swiper
    v-if="
      currentCatalog?.products.length && currentCatalog?.products.length > 0
    "
    data-aos="zoom-out"
    data-aos-delay="50"
    data-aos-duration="600"
    class="mb-60"
    :space-between="24"
    :modules="modules"
    :slides-per-view="1"
    :slides-per-group="1"
    :breakpoints="breakpoints"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide v-for="item in currentCatalog?.products || []" :key="item.id">
      <AppCatalogProductSliderCard
        v-bind="{
          productName: item.productName,
          productId: item.id,
          image: item.thumbImage
        }"
      />
    </swiper-slide>

    <template #container-start>
      <div
        v-if="!swiperRef?.isLocked"
        class="mb-30 flex flex-wrap items-center justify-between md:flex-nowrap lg:mb-40"
      >
        <p class="font-medium leading-none tracking-[0.64px]">
          {{ slidesProgress }}
        </p>
        <AppCatalogSliderButtons />
      </div>
    </template>
  </swiper>
</template>

<script lang="ts" setup>
import 'swiper/css'
import 'swiper/css/free-mode'

import type { Swiper as ISwiper } from 'swiper'
import { FreeMode } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { provide, ref } from 'vue'

import { ICatalog, useCatalogStore } from '@/api/modules/catalog'
import { RouteNamesEnum } from '@/router/router.types'

import { AppHomeCardTagDividerIconRaw } from '../models/tagDivider'
import AppHomeSliderButtons from './AppHomeSliderButtons.vue'

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

const renderTagsString = (drop: ICatalog): string => {
  if (!Array.isArray(drop.products)) {
    return ''
  }

  return [`${drop.products.length} items`, drop.yearTag, drop.status]
    .map(tag => `<span>${tag}</span>`)
    .join(AppHomeCardTagDividerIconRaw)
}
</script>

<template>
  <swiper
    @slideChange="onSlideChange"
    :space-between="40"
    :modules="modules"
    class="drop-gallery"
    data-aos="zoom-out"
    data-aos-delay="50"
    data-aos-duration="600"
  >
    <swiper-slide v-for="item in catalogStore.sortedCatalog" :key="item.id">
      <div>
        <div class="mb-20 flex flex-wrap justify-between md:flex-nowrap">
          <div
            class="outlined-text heading grow-1 cursor-default select-none font-hnd"
            style="--stroke-width: 2px"
          >
            {{ item.name }}
          </div>
          <AppHomeSliderButtons class="swiper-slide-navs shrink-0" />
        </div>
        <div class="mb-20 block max-w-[800px]">
          <router-link
            :to="`${RouteNamesEnum.catalog}/${item.dropSlug}`"
            class="catalog-link relative block h-auto w-full"
          >
            <img
              :src="item.thumbImage"
              class="z-1 relative block w-full select-none object-fill"
            />
            <div
              class="sold-out z-2 pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-default select-none"
              v-if="item.status === 'sold out'"
            >
              Sold out
            </div>
          </router-link>
        </div>
        <div
          class="tags flex items-center gap-x-8"
          v-html="renderTagsString(item)"
        ></div>
      </div>
    </swiper-slide>
  </swiper>
</template>

<style lang="scss" scoped>
@import './AppHomeSlider.scss';
</style>

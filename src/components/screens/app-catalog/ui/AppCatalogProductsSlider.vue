<script lang="ts" setup>
import 'swiper/css'
import 'swiper/css/free-mode'

import type { Swiper as ISwiper } from 'swiper'
import { FreeMode } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { provide, ref } from 'vue'

import { DROPS_DATA } from '@/api/modules/drops'
import { RouteNamesEnum } from '@/router/router.types'

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
    <swiper-slide
      v-for="item in [...DROPS_DATA].sort((a, b) => b.id - a.id)"
      :key="item.id"
    >
      <div>
        <div class="mb-20 flex flex-wrap justify-between md:flex-nowrap">
          <div
            class="outlined-text heading grow-1 cursor-default select-none font-hnd"
            style="--stroke-width: 2px"
          >
            {{ item.name }}
          </div>
          <AppCatalogSliderButtons class="swiper-slide-navs shrink-0" />
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
      </div>
    </swiper-slide>
  </swiper>
</template>

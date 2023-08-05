<script lang="ts" setup>
import 'swiper/css'
import 'swiper/css/free-mode'

import type { Swiper as ISwiper } from 'swiper'
import { FreeMode } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { provide, ref } from 'vue'

import { RouteNamesEnum } from '@/router/router.types'

import AppHomeSliderButtons from './AppHomeSliderButtons.vue'

const modules = [FreeMode]

const SLIDER_DATA = [
  {
    id: 0,
    heading: 'Heading',
    dropSlug: 'first-drop',
    image: new URL('@/assets/img/home/3rd.png', import.meta.url).href,
    status: '',
    tags: ['4 items', 'Q2 2023', 'ACTIVE']
  },
  {
    id: 1,
    heading: 'Heading',
    dropSlug: 'second-drop',
    image: new URL('@/assets/img/home/2rd.png', import.meta.url).href,
    status: '',
    tags: ['3 items', 'Q2 2023', 'SOLD OUT'],
    soldOut: true
  },
  {
    id: 2,
    heading: 'Heading',
    dropSlug: 'third-drop',
    image: new URL('@/assets/img/home/1rd.png', import.meta.url).href,
    status: '',
    tags: ['5 items', 'Q2 2023', 'ACTIVE']
  }
]

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
    <swiper-slide v-for="item in SLIDER_DATA" :key="item.id">
      <div>
        <div class="mb-20 flex flex-wrap justify-between md:flex-nowrap">
          <div
            class="outlined-text heading grow-1 cursor-default select-none font-hnd"
            style="--stroke-width: 2px"
          >
            {{ item.heading }}
          </div>
          <AppHomeSliderButtons class="swiper-slide-navs shrink-0" />
        </div>
        <div class="mb-20 block max-w-[800px]">
          <router-link
            :to="`${RouteNamesEnum.catalog}/${item.dropSlug}`"
            class="catalog-link relative block h-auto w-full"
          >
            <img
              :src="item.image"
              class="z-1 relative block w-full select-none object-fill"
            />
            <div
              class="z-2 sold-out pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-default select-none"
              v-if="item.soldOut"
            >
              SOLD OUT
            </div>
          </router-link>
        </div>
        <div class="tags flex items-center gap-x-8">
          <template v-for="(tag, index) in item.tags" :key="index">
            <span>{{ tag }}</span>
            <span v-if="index !== item.tags.length - 1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <g>
                  <path d="M7 3H9V13H7V3Z" fill="white" />
                  <path
                    d="M3.17188 6.36523L4.17187 4.63318L12.8321 9.63318L11.8321 11.3652L3.17188 6.36523Z"
                    fill="white"
                  />
                  <path
                    d="M4.17188 11.3662L3.17188 9.63416L11.8321 4.63416L12.8321 6.36621L4.17188 11.3662Z"
                    fill="white"
                  />
                </g>
              </svg>
            </span>
          </template>
        </div>
      </div>
    </swiper-slide>
  </swiper>
</template>

<style lang="scss" scoped>
@import './AppHomeSlider.scss';
</style>

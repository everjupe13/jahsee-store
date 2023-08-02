<script lang="ts" setup>
import AppHomeSliderButtons from './AppHomeSliderButtons.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { FreeMode } from 'swiper/modules'
import { provide, ref } from 'vue'
import "swiper/css/free-mode"
import "swiper/css/navigation"
import "swiper/css/thumbs"
const modules = [FreeMode]

const SLIDER_DATA = [
  {
    heading: 'Heading',
    image: new URL('@/assets/img/home/3rd.png', import.meta.url).href,
    status: '',
    tags: [
      '4 items',
      'Q2 2023',
      'ACTIVE'
    ],
  },
  {
    heading: 'Heading',
    image: new URL('@/assets/img/home/2rd.png', import.meta.url).href,
    status: '',
    tags: [
      '3 items',
      'Q2 2023',
      'SOLD OUT'
    ],
    soldOut: true
  },
  {
    heading: 'Heading',
    image: new URL('@/assets/img/home/1rd.png', import.meta.url).href,
    status: '',
    tags: [
      '5 items',
      'Q2 2023',
      'ACTIVE'
    ]
  },
]

const isSwiperEnd = ref(false)
const isSwiperBeginning = ref(true)

provide('swiperOptions', {
  isSwiperEnd,
  isSwiperBeginning
})

const onSlideChange = (swiper: any) => {
  isSwiperEnd.value = swiper.isEnd
  isSwiperBeginning.value = swiper.isBeginning
}
</script>

<template>
  <swiper
    @slideChange="onSlideChange"
    :spaceBetween="40"
    :modules="modules"
    class="drop-gallery"
    data-aos="zoom-out"
    data-aos-delay="50"
    data-aos-duration="600"
  >
    <swiper-slide v-for="item in SLIDER_DATA">
      <div>
        <div class="tw-mb-20 tw-flex tw-flex-wrap md:tw-flex-nowrap tw-justify-between">
          <div class="outlined-text heading tw-grow-1 tw-select-none tw-cursor-default" style="--stroke-width: 2px;">{{ item.heading }}</div>
          <AppHomeSliderButtons class="swiper-slide-navs tw-shrink-0" />
        </div>
        <div class="tw-relative tw-block tw-max-w-[800px] tw-mb-20">
          <img :src="item.image" class="tw-relative tw-z-1 tw-block w-full tw-object-fill tw-select-none"/>
          <div class="tw-absolute tw-left-1/2 tw-top-1/2 -tw-translate-x-1/2 -tw-translate-y-1/2 tw-z-2 sold-out" v-if="item.soldOut">
            SOLD OUT
          </div>
        </div>
        <div class="tw-flex tw-gap-x-8 tw-items-center tags">
          <template v-for="(tag, index) in item.tags">
            <span>{{ tag }}</span>
            <span v-if="index !== item.tags.length - 1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <g>
                  <path d="M7 3H9V13H7V3Z" fill="white"/>
                  <path d="M3.17188 6.36523L4.17187 4.63318L12.8321 9.63318L11.8321 11.3652L3.17188 6.36523Z" fill="white"/>
                  <path d="M4.17188 11.3662L3.17188 9.63416L11.8321 4.63416L12.8321 6.36621L4.17188 11.3662Z" fill="white"/>
                </g>
              </svg>
            </span>
          </template>
        </div>
      </div>
    </swiper-slide>
  </swiper>
</template>

<style lang="scss">
@import './AppHomeSlider.scss';
</style>
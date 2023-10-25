<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts" setup>
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

import type { Swiper as ISwiper } from 'swiper'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { inject, ref } from 'vue'

type Props = {
  gallery: string[]
}

const props = defineProps<Partial<Props>>()

const isMdScreen = inject('isMdScreen')

const thumbsSwiper = ref<ISwiper | null>(null)
const setThumbsSwiper = (swiper: ISwiper) => {
  thumbsSwiper.value = swiper
}
const modules = [FreeMode, Navigation, Thumbs]
</script>

<template>
  <div class="flex gap-x-30 lg:gap-x-15">
    <swiper
      v-if="props.gallery && props.gallery.length > 0"
      :style="{
        '--swiper-navigation-color': '#969EAB',
        '--swiper-pagination-color': '#969EAB'
      }"
      :navigation="true"
      :thumbs="{ swiper: thumbsSwiper }"
      :modules="modules"
      :space-between="5"
      class="drop-gallery"
      data-aos="zoom-out"
      data-aos-delay="50"
      data-aos-duration="600"
    >
      <swiper-slide v-for="(item, index) in props.gallery" :key="index">
        <div class="drop-gallery__item">
          <img
            :src="item"
            class="block h-full w-full select-none object-cover"
          />
        </div>
      </swiper-slide>
    </swiper>

    <swiper
      @swiper="setThumbsSwiper"
      :space-between="20"
      :slides-per-view="4"
      :free-mode="true"
      :watch-slides-progress="true"
      :modules="modules"
      :direction="'vertical'"
      class="drop-gallery-thumb"
      v-if="!isMdScreen"
    >
      <swiper-slide v-for="(item, index) in props.gallery" :key="index">
        <div class="drop-gallery-thumb__item">
          <img
            :src="item"
            class="block h-full w-full select-none object-cover"
            data-aos="fade-left"
            :data-aos-delay="(index + 1) * 50"
            data-aos-duration="400"
          />
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<style lang="scss" scoped>
.drop-gallery {
  @apply h-[var(--dimension-ruler)] w-[var(--dimension-ruler)];

  @include phone-big {
    @apply aspect-[0.87] h-full w-full;
  }

  &__item {
    @apply h-[var(--dimension-ruler)] w-[var(--dimension-ruler)];

    @include phone-big {
      @apply h-full w-full;
    }
  }
}

.drop-gallery-thumb {
  @apply h-[var(--dimension-ruler)];

  &__item {
    height: calc((var(--dimension-ruler) - 20px * 3) / 4);
    width: calc((var(--dimension-ruler) - 20px * 3) / 4);
  }

  .swiper-slide {
    opacity: 0.4;
    @apply transition;
  }
  .swiper-slide-thumb-active {
    opacity: 1;
  }
}
</style>

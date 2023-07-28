<script lang="ts" setup>
import { ref, inject } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { AppDropInfo } from '@/components/widgets/app-drop'
import {
  ForwardLinkArrowIcon,
  DropdownCollapseArrowIcon
} from '@/components/icons'
import AppCollapse from '@/components/shared/AppCollapse.vue'
import AppBackNav from '@/components/features/AppBackNav.vue'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import "swiper/css/free-mode"
import "swiper/css/navigation"
import "swiper/css/thumbs"


const isMdScreen = inject('isMdScreen')

const thumbsSwiper = ref(null)
const setThumbsSwiper = (swiper: any) => {
  thumbsSwiper.value = swiper;
}
const modules = [FreeMode, Navigation, Thumbs]


const detailsOpened = ref(false)
const toggleDetailsOpened = () => {
  detailsOpened.value = !detailsOpened.value
}


const selectedSize = ref('')
const setSelectedSize = (value: string) => {
  const _size = CURRENT_DATA.sizes.find(size => size.label === value)

  if (selectedSize.value !== value && !_size?.disabled)
    selectedSize.value = value
}


const ZIP_DATA = {
  title: 'ZIP HOODIE',
  desc: 'Oversize Zip Hoodie that provides lightness, comfort and a sense of individual style that hardly anyone can comprehend.',
  cost: '$125.00',
  list: [
    'Fabric density - 360gr/m',
    '80% cotton',
    '20% polyester',
    'Chest - embroidery',
    'Hood - Puff',
    'Back - silkscreen'
  ],
  gallery: [
    new URL('@/assets/img/drop-zip-hoodie/1.png', import.meta.url).href,
    new URL('@/assets/img/drop-zip-hoodie/2.png', import.meta.url).href,
    new URL('@/assets/img/drop-zip-hoodie/3.png', import.meta.url).href,
    new URL('@/assets/img/drop-zip-hoodie/4.png', import.meta.url).href,
    new URL('@/assets/img/drop-zip-hoodie/5.png', import.meta.url).href,
  ],
  sizes: [
    {
      label: 'XS',
      disabled: false
    },
    {
      label: 'S',
      disabled: false
    },
    {
      label: 'M',
      disabled: false
    },
    {
      label: 'L',
      disabled: false
    },
    {
      label: 'XL',
      disabled: true
    },
    {
      label: 'XXL',
      disabled: false
    }
  ]
}

const SWEAT_DATA = {
  title: 'SWEATSHIRT',
  desc: 'A perfectly shaped limited edition oversized sweatshirt with excellent quality and name tags that will fit almost any look.',
  cost: '$80.00',
  list: [
    'Fabric density - 360gr/m',
    '80% cotton',
    '20% polyester',
    'Chest - embroidery',
    'Branded patch that tells you the bear market is about to end',
    'Tag that allows you to choose your individual nickname printed on it',
  ],
  gallery: [
    new URL('@/assets/img/drop-sweat/1.png', import.meta.url).href,
    new URL('@/assets/img/drop-sweat/2.png', import.meta.url).href,
    new URL('@/assets/img/drop-sweat/3.png', import.meta.url).href,
    new URL('@/assets/img/drop-sweat/4.png', import.meta.url).href,
  ],
  sizes: [
    {
      label: 'XS',
      disabled: false
    },
    {
      label: 'S',
      disabled: false
    },
    {
      label: 'M',
      disabled: false
    },
    {
      label: 'L',
      disabled: true
    },
    {
      label: 'XL',
      disabled: true
    },
    {
      label: 'XXL',
      disabled: false
    }
  ]
}

const route = useRoute()
const CURRENT_DATA = [ZIP_DATA, SWEAT_DATA][route.params.id as any - 1]
</script>

<template>
  <section class="drop">
    <AppContainer>
      <AppBackNav />

      <div class="drop__grid">
        <div class="drop__list">

          <div class="drop__header tw-mb-40">
            <AppDropInfo
              v-bind="{
                title: CURRENT_DATA.title,
                cost: CURRENT_DATA.cost,
                desc: CURRENT_DATA.desc
              }"
            />
          </div>

          <div class="drop__body">
            <div
              class="drop__options tw-mb-10 md:tw-mb-50"
              data-aos="fade-down"
              data-aos-delay="250" 
            >
              <div class="drop__options-item tw-cursor-pointer">
                <div class="drop__options-label">Size guide</div>
                <div class="drop__options-glass">
                  <ForwardLinkArrowIcon class="drop__options-icon" />
                </div>
              </div>

              <RouterLink :to="{ name: 'lore', params: { id: $route.params.id } }" class="drop__options-item tw-cursor-pointer">
                <div class="drop__options-label">Drop lore</div>
                <div class="drop__options-glass">
                  <ForwardLinkArrowIcon class="drop__options-icon" />
                </div>
              </RouterLink>

              <div class="drop__options-details-wrapper">
                <div
                  class="drop__options-item tw-cursor-pointer"
                  :class="[{'--active': detailsOpened}]"
                  @click="toggleDetailsOpened"
                >
                  <div class="drop__options-label">Details</div>
                  <div class="drop__options-glass">
                    <DropdownCollapseArrowIcon class="drop__options-icon" />
                  </div>
                </div>

                <div class="drop__options-details">
                  <AppCollapse v-model="detailsOpened" class="drop__options-details-collapse">
                    <ul class="details-list">
                      <li v-for="item in CURRENT_DATA.list" class="details-list__item">{{ item }}</li>
                    </ul>
                  </AppCollapse>
                </div>
              </div>

            </div>
            <div
              class="drop__controls"
              data-aos="fade-down"
              data-aos-delay="300"
            >
              <div class="size-picker">
                <button 
                  v-for="size in CURRENT_DATA.sizes"
                  :class="[
                    'size-picker__item',
                    { '--active': size.label === selectedSize },
                    { '--disabled': size.disabled }
                  ]"
                  :key="size.label"
                  @click="() => setSelectedSize(size.label)"
                >
                  <span class="size-picker__item-text">{{ size.label }}</span>
                </button>
              </div>
              <AppButton
                class="!tw-bg-[#fff] tw-h-80 tw-w-full tw-justify-center"
                theme="alternative"
                disabled
              >Sold out</AppButton>
            </div>
          </div>
        </div>
        <div class="drop__gallery">
          <swiper
            :style="{
              '--swiper-navigation-color': '#969EAB',
              '--swiper-pagination-color': '#969EAB',
            }"
            :spaceBetween="40"
            :navigation="true"
            :thumbs="{ swiper: thumbsSwiper }"
            :modules="modules"
            class="drop-gallery"
            data-aos="zoom-out"
            data-aos-delay="50"
            data-aos-duration="600"
          >
            <swiper-slide v-for="item in CURRENT_DATA.gallery">
              <div class="drop-gallery__item">
                <img :src="item" />
              </div>
            </swiper-slide>
          </swiper>

          <swiper
            @swiper="setThumbsSwiper"
            :spaceBetween="20"
            :slidesPerView="4"
            :freeMode="true"
            :watchSlidesProgress="true"
            :modules="modules"
            :direction="'vertical'"
            class="drop-gallery-thumb"
            v-if="!isMdScreen"
          >
            <swiper-slide v-for="(item, index) in CURRENT_DATA.gallery">
              <div class="drop-gallery-thumb__item">
                <img :src="item" alt="" data-aos="fade-left" :data-aos-delay="(index + 1) * 50" data-aos-duration="400" />
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </AppContainer>
  </section>
</template>

<style lang="scss" scoped>
.drop {
  padding-top: 40px;
  padding-bottom: 40px;

  @media (max-width: 767px) {
    padding-top: 20px;   
  }

  &__grid {
    display: grid;
    padding-top: 85px;
    // grid-template-columns: 650px calc(100% - 650px - 15px);
    grid-template-columns: calc(100% - 820px - 15px) 820px;
    column-gap: 15px;

    @media (max-width: 767px) {
      grid-template-columns: 100%; 
    }
  }

  &__list {
    display: flex;
    flex-direction: column;

    max-width: 490px;
  }

  &__body {
    margin-top: auto;
  }

  &__options {
    color: #F6F5FF;
    font-family: Montserrat;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    @media (max-width: 767px) {
      font-size: 18px;
    }
  }

  &__options-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    column-gap: 10px;

    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid rgba(255, 255, 255, .2);

    transition: .3s all ease;

    &:hover,
    &.--active {
      border-bottom: 1px solid rgba(255, 255, 255, 1);
      .drop__options-icon {
        opacity: 1
      }
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__options-label {
    color: #FFF;
    font-family: 'Helvetica Now Display';
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.64px;
    text-transform: uppercase;

    user-select: none;
  }

  &__options-glass {
    flex: 0 0 auto;
  }

  &__options-icon {
    opacity: 0.2;
    transition: .3s all ease;
  }

  &__options-details-wrapper {
    position: relative;
    z-index: 10;

    display: flex;
    flex-direction: column;
    row-gap: 15px;

    transform: translateZ(10px);
  }

  &__options-details {
    position: relative;
    z-index: 10;
  }

  &__options-details-collapse {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
  }

  &__controls {
    &.aos-animate {
      transform: none;
    }
  }

  &__gallery {
    display: flex;
    column-gap: 30px;

    @media (max-width: 767px) {
      grid-row: 1/2
    }
  }
}

.details-list {
  padding: 20px 30px;
  width: 100%;
  background-color: #0d0d0d;

  &__item {
    width: 100%;
    margin-bottom: 15px;

    color: #E1E1F1;
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 1.4;
    text-transform: uppercase;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.size-picker {
  display: flex;
  column-gap: 10px;
  margin-bottom: 10px;

  &__item {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 10px;
    width: calc((100% - 10px * 5) / 6);
    // height: 74px;
    aspect-ratio: 1;
    background-color: #242424;

    transition: .2s all ease;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }

    &.--active {
      background-color: #FFF;
      opacity: 1;

      .size-picker__item-text {
        color: #0A090A;
      }
    }

    &.--disabled {
      background-color: #242424;
      cursor: auto;
      opacity: 1;

      .size-picker__item-text {
        color: #545454;
      }
    }
  }

  &__item-text {
    display: block;

    color: #FFF;
    font-family: 'Helvetica Now Display';
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    text-transform: uppercase;

    transition: .2s all ease;
  }
}

.swiper-button-prev,
.swiper-button-next {
  transform: translateX(100%);
  width: 500px;
}

.drop-gallery {
  width: 666px;
  height: 666px;

  @media (max-width: 767px) {
    width: 100%;
    height: auto;
  }

  &__item {
    width: 666px;
    height: 666px;

    @media (max-width: 767px) {
      width: 100% 
    }

    img {
      display: block;
      width: 100%;
      height: 100%;

      object-fit: cover;
      user-select: none;
    }
  }
}

.drop-gallery-thumb {
  height: 666px;

  &__item {
    height: calc((666px - 20px * 3) / 4);
    width: calc((666px - 20px * 3) / 4);

    img {
      display: block;
      width: 100%;
      height: 100%;

      object-fit: fill;
      user-select: none;
    }
  }

  .swiper-slide {
    opacity: 0.4;
    @apply tw-transition
  }
  .swiper-slide-thumb-active {
    opacity: 1;
  }
}
</style>
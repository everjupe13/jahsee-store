<script lang="ts" setup>
import { ref, reactive } from 'vue'
import AppCollapse from '@/components/shared/AppCollapse.vue'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import "swiper/css/free-mode"
import "swiper/css/navigation"
import "swiper/css/thumbs"
import { useRoute } from 'vue-router'


const thumbsSwiper = ref(null)

const setThumbsSwiper = (swiper: any) => {
  thumbsSwiper.value = swiper;
}

const modules = [FreeMode, Navigation, Thumbs]

const detailsOpened = ref(false)
const toggleDetailsOpened = () => {
  detailsOpened.value = !detailsOpened.value
}

const sizesOpened = ref(false)
const toggleSizesOpened = () => {
  sizesOpened.value = !sizesOpened.value
}

const selectedSize = ref('')
const sizes = reactive([
  'XS',
  'S',
  'M',
  'L',
  'XL',
  'XXL'
])

const setSelectedSize = (value: string) => {
  if (selectedSize.value !== value)
    selectedSize.value = value
}


const route = useRoute()

const ZIP_DATA = {
  title: 'ZIP HOODIE',
  desc: 'Oversize Zip Hoodie that provides lightness, comfort and a sense of individual style that hardly anyone can comprehend.',
  cost: '$125',
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
  ]
}

const SWEAT_DATA = {
  title: 'SWEATSHIRT',
  desc: 'A perfectly shaped limited edition oversized sweatshirt with excellent quality and name tags that will fit almost any look.',
  cost: '$80',
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
  ]
}

const CURRENT_DATA = [ZIP_DATA, SWEAT_DATA][route.params.id as any - 1]
</script>

<template>
  <section class="drop">
    <AppContainer>
      <div class="drop__grid">
        <div class="drop__list">
          <div class="drop__header tw-pb-25">
            <div class="drop__title">{{ CURRENT_DATA.title }}</div>
          </div>
          <div class="drop__desc tw-mb-40" v-html="CURRENT_DATA.desc"></div>
          <div class="drop__cost tw-mb-60">
            {{ CURRENT_DATA.cost }}
          </div>
          <div class="drop__options tw-flex tw-gap-x-90 tw-flex-wrap">
            <div 
              class="drop__details-label tw-flex tw-items-center tw-gap-x-3 tw-cursor-pointer"
              @click="toggleDetailsOpened"
            >
              <span>THE DETAILS</span>&nbsp;
              <span class="tw-transition" :style="{ transform: detailsOpened ? 'rotate(90deg)' : 'rotate(0deg)' }">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="19" viewBox="0 0 10 19" fill="none">
                  <path d="M1.98156 0.655098L9.74653 8.95104C9.8387 9.04981 9.90413 9.1568 9.94284 9.27202C9.98155 9.38724 10.0006 9.51069 9.99999 9.64237C9.99999 9.77405 9.98063 9.8975 9.94192 10.0127C9.90321 10.1279 9.83808 10.2349 9.74653 10.3337L1.98156 18.6543C1.76651 18.8848 1.49769 19 1.17511 19C0.852533 19 0.576036 18.8765 0.345622 18.6296C0.115208 18.3827 0 18.0947 0 17.7655C0 17.4363 0.115208 17.1482 0.345622 16.9013L7.11981 9.64237L0.345622 2.38342C0.130569 2.15298 0.0230408 1.86888 0.0230408 1.53111C0.0230408 1.19335 0.138248 0.901342 0.368663 0.655098C0.599077 0.408194 0.867894 0.284742 1.17511 0.284742C1.48233 0.284742 1.75115 0.408194 1.98156 0.655098Z" fill="#F6F5FF"/>
                </svg>
              </span>
            </div>
            <div class="drop__sizes-label tw-cursor-pointer">SIZE GUIDE</div>
            <div class="drop__details-list tw-w-full tw-mt-35">
              <AppCollapse v-model="detailsOpened">
                <ul class="details-list">
                  <li v-for="item in CURRENT_DATA.list" class="details-list__item">{{ item }}</li>
                </ul>
              </AppCollapse>
            </div>
          </div>
          <div class="drop__controls tw-mt-60 tw-gap-x-35 tw-flex tw-items-start">
            <div class="drop__size">
              <div class="size-picker">
                <div :class="['size-picker__label', { '--selected': selectedSize }]" @click="toggleSizesOpened">
                  <span>{{ selectedSize || 'Select size' }}</span>
                  <span class="tw-transition" :style="{ transform: sizesOpened ? 'rotate(180deg)' : 'rotate(0deg)' }" >
                    <img src="@/assets/img/arrow-size-picker.svg" alt="">
                  </span>
                </div>
                <AppCollapse v-model="sizesOpened">
                  <div class="size-picker__options">
                    <div 
                      v-for="size in sizes"
                      :class="[
                        'size-picker__options-item',
                        { '--active': size === selectedSize }
                      ]"
                      @click="() => setSelectedSize(size)"
                    >
                      {{ size }}
                    </div>
                  </div>
                </AppCollapse>
              </div>
            </div>
            <AppButton class="!tw-bg-[#969EAB]" theme="alternative">SOLD OUT</AppButton>
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
          >
            <swiper-slide v-for="item in CURRENT_DATA.gallery">
              <div class="drop-gallery__item">
                <img :src="item" />
              </div>
            </swiper-slide>
          </swiper>

          <swiper
            @swiper="setThumbsSwiper"
            :spaceBetween="10"
            :slidesPerView="4"
            :freeMode="true"
            :watchSlidesProgress="true"
            :modules="modules"
            :direction="'vertical'"
            class="drop-gallery-thumb"
          >
            <swiper-slide v-for="item in CURRENT_DATA.gallery">
              <div class="drop-gallery-thumb__item">
                <img :src="item" />
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
  padding-top: 100px;
  padding-bottom: 180px;

  &__title {
    position: relative;
    font-family: 'Poppins';
    font-size: 96px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke: 2px #E1E1F1;
    color: #E1E1F1;
  }

  &__grid {
    display: grid;
    // grid-template-columns: 650px calc(100% - 650px - 15px);
    grid-template-columns: calc(100% - 875px - 15px) 875px;
    column-gap: 15px;
  }

  &__desc {
    max-width: 530px;

    color: #969EAB;
    font-family: Montserrat;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 40px;
    text-transform: uppercase;
  }

  &__cost {
    font-family: 'Poppins';
    font-size: 84px;
    font-style: normal;
    font-weight: 600;
    line-height: 1.1;
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke: 1px #E1E1F1;
    color: #E1E1F1;
  }

  &__options {
    color: #F6F5FF;
    font-family: Montserrat;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  &__gallery {
    display: flex;
    column-gap: 50px;
  }
}

.size-picker {
  width: 285px;

  &__label {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 30px 25px 30px 30px;
    background-color: #F6F5FF;

    color: #969EAB;
    font-family: Montserrat;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-transform: uppercase;

    &.--selected {
      color: #202023;
    }
  }

  &__options {
    background-color: #fff;

  }
  &__options-item {
    padding: 27px 30px;
    color: #202023;
    font-family: Montserrat;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    text-transform: capitalize;
    transition: .2s all ease;

    &:hover {
      background-color: rgba($color: #A6ADB9, $alpha: 0.2);
    }

    &.--active {
      background-color: rgba($color: #A6ADB9, $alpha: 0.35);
    }
  }
}

.swiper-button-prev,
.swiper-button-next {
  transform: translateX(100%);
  width: 500px;
}

.details-list {
  padding: 45px;
  width: max-content;
  max-width: 415px;
  background-color: #0d0d0d;

  &__item {
    width: 100%;
    margin-bottom: 35px;

    color: #E1E1F1;
    font-family: Montserrat;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 35px;
    text-transform: uppercase;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.drop-gallery {
  margin-top: 50px;
  width: 650px;
  height: 660px;

  &__item {
    width: 650px;

    img {
      display: block;
      width: 100%;

      object-fit: cover;
      user-select: none;
    }
  }
}

.drop-gallery-thumb {
  margin-top: -50px;
  height: calc(180px * 4 + 40px * 3);

  &__item {
    width: 175px;
    height: 180px;

    img {
      display: block;
      width: 100%;
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
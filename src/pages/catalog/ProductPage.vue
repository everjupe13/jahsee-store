<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts" setup>
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { computed, inject, type Ref, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

import { useCartStore } from '@/api/modules/cart'
import { ICatalog, IProduct, useCatalogStore } from '@/api/modules/catalog'
import AppBackNav from '@/components/features/AppBackNav.vue'
import { AppDropInfo } from '@/components/screens/app-drop'
import AppCollapse from '@/components/shared/AppCollapse.vue'
import {
  DropdownCollapseArrowIcon,
  ForwardLinkArrowIcon
} from '@/components/shared/icons'
import { formatDollars } from '@/utils/cost'

const isMdScreen = inject('isMdScreen')

const thumbsSwiper = ref(null)
const setThumbsSwiper = (swiper: any) => {
  thumbsSwiper.value = swiper
}
const modules = [FreeMode, Navigation, Thumbs]

const router = useRouter()
const route = useRoute()
const catalogStore = useCatalogStore()
await catalogStore.fetchCatalog()
const currentCatalog: Ref<undefined | ICatalog> = computed(() => {
  return catalogStore.catalog
    ? catalogStore.catalog.find(
        catalog => catalog.dropSlug === route.params.dropSlug
      )
    : undefined
})
const currentDrop: Ref<undefined | IProduct> = computed(() => {
  return catalogStore.products
    ? (catalogStore.products.find(
        product => product.id === Number(route.params.dropId)
      ) as IProduct)
    : undefined
})

if (!currentDrop?.value || !currentCatalog?.value) {
  await router.push('/')
}

const isOutOfStock = computed<boolean>(
  () => currentCatalog?.value?.status === 'sold out'
)

const selectedSize = ref('')
const setSelectedSize = (value: string) => {
  const _size = currentDrop.value!.sizes.find(size => size.label === value)

  if (selectedSize.value !== value && !_size?.soldOut) {
    selectedSize.value = value
  }
}

const detailsOpened = ref(false)
const toggleDetailsOpened = () => {
  detailsOpened.value = !detailsOpened.value
}

const cartStore = useCartStore()
const handleAddProductToCart = () => {
  if (selectedSize.value) {
    cartStore.addItem(Number(route.params.dropId), selectedSize.value)
  }
}

cartStore.calculateCost()
</script>

<template>
  <section class="pb-40 pt-30 md:pt-40">
    <AppContainer>
      <AppBackNav />

      <div class="drop__grid">
        <div class="drop__list">
          <div class="drop__header mb-40">
            <AppDropInfo
              v-bind="{
                title: currentDrop!.productName,
                cost: formatDollars(currentDrop!.cost),
                desc: currentDrop!.description
              }"
            />
          </div>

          <div class="drop__body">
            <div
              class="drop__options mb-10 md:mb-50"
              data-aos="fade-down"
              data-aos-delay="250"
            >
              <div class="drop__options-item cursor-pointer">
                <div class="drop__options-label">Size guide</div>
                <div class="drop__options-glass">
                  <ForwardLinkArrowIcon class="drop__options-icon" />
                </div>
              </div>

              <RouterLink
                :to="{ name: 'lore', params: { id: $route.params.dropId } }"
                class="drop__options-item cursor-pointer"
              >
                <div class="drop__options-label">Drop lore</div>
                <div class="drop__options-glass">
                  <ForwardLinkArrowIcon class="drop__options-icon" />
                </div>
              </RouterLink>

              <div class="drop__options-details-wrapper">
                <div
                  class="drop__options-item cursor-pointer"
                  :class="[{ '--active': detailsOpened }]"
                  @click="toggleDetailsOpened"
                >
                  <div class="drop__options-label">Details</div>
                  <div class="drop__options-glass">
                    <DropdownCollapseArrowIcon class="drop__options-icon" />
                  </div>
                </div>

                <div class="drop__options-details">
                  <AppCollapse
                    v-model="detailsOpened"
                    class="drop__options-details-collapse"
                  >
                    <ul class="details-list">
                      <li
                        v-for="(item, index) in currentDrop!.aboutList"
                        :key="index"
                        class="details-list__item"
                      >
                        {{ item }}
                      </li>
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
                  v-for="size in currentDrop!.sizes"
                  :class="[
                    'size-picker__item',
                    { '--active': size.label === selectedSize },
                    { '--disabled': isOutOfStock || size.soldOut }
                  ]"
                  :key="size.label"
                  @click="() => setSelectedSize(size.label)"
                >
                  <span class="size-picker__item-text">{{ size.label }}</span>
                </button>
              </div>
              <AppButton
                class="h-80 w-full justify-center !bg-[#fff]"
                theme="alternative"
                :disabled="isOutOfStock"
                @click="handleAddProductToCart"
              >
                {{ isOutOfStock ? 'Sold out' : 'Buy' }}
              </AppButton>
            </div>
          </div>
        </div>
        <div class="drop__gallery">
          <swiper
            :style="{
              '--swiper-navigation-color': '#969EAB',
              '--swiper-pagination-color': '#969EAB'
            }"
            :space-between="40"
            :navigation="true"
            :thumbs="{ swiper: thumbsSwiper }"
            :modules="modules"
            class="drop-gallery"
            data-aos="zoom-out"
            data-aos-delay="50"
            data-aos-duration="600"
          >
            <swiper-slide
              v-for="(item, index) in currentDrop!.gallery"
              :key="index"
            >
              <div class="drop-gallery__item">
                <img :src="item" />
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
            <swiper-slide
              v-for="(item, index) in currentDrop!.gallery"
              :key="index"
            >
              <div class="drop-gallery-thumb__item">
                <img
                  :src="item"
                  alt=""
                  data-aos="fade-left"
                  :data-aos-delay="(index + 1) * 50"
                  data-aos-duration="400"
                />
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
  &__grid {
    display: grid;
    padding-top: 85px;
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
    color: #f6f5ff;
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
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);

    transition: 0.3s all ease;

    &:hover,
    &.--active {
      border-bottom: 1px solid rgba(255, 255, 255, 1);
      .drop__options-icon {
        opacity: 1;
      }
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__options-label {
    color: #fff;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.64px;
    text-transform: uppercase;

    user-select: none;

    @apply font-hnd;
  }

  &__options-glass {
    flex: 0 0 auto;
  }

  &__options-icon {
    opacity: 0.2;
    transition: 0.3s all ease;
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
      grid-row: 1/2;
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

    color: #e1e1f1;
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

    transition: 0.2s all ease;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }

    &.--active {
      background-color: #fff;
      opacity: 1;

      .size-picker__item-text {
        color: #0a090a;
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

    color: #fff;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    text-transform: uppercase;

    transition: 0.2s all ease;

    @apply font-hnd;
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
      width: 100%;
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
    @apply transition;
  }
  .swiper-slide-thumb-active {
    opacity: 1;
  }
}
</style>
<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts" setup>
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { computed, inject, type Ref, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useCartStore } from '@/api/modules/cart'
import { ICatalog, IProduct, useCatalogStore } from '@/api/modules/catalog'
import AppBackNav from '@/components/features/AppBackNav.vue'
import { ProductInfo } from '@/components/screens/app-product'

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

await catalogStore.fetchProducts(currentCatalog.value?.id || 0)
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

const cartStore = useCartStore()
const handleAddProductToCart = (size: string) => {
  cartStore.addItem(currentDrop.value!.id, size)
}
</script>

<template>
  <section class="product-page pb-40 pt-30 md:pt-40">
    <AppContainer>
      <AppBackNav />

      <div class="drop__grid">
        <ProductInfo
          :title="currentDrop!.productName"
          :cost="currentDrop!.cost"
          :description="currentDrop!.description"
          :sizes="currentDrop!.sizes"
          :about-list="currentDrop!.aboutList"
          @handle-product-add="handleAddProductToCart"
        ></ProductInfo>
        <div class="drop__gallery">
          <swiper
            :style="{
              '--swiper-navigation-color': '#969EAB',
              '--swiper-pagination-color': '#969EAB'
            }"
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

  &__gallery {
    display: flex;
    column-gap: 30px;

    @media (max-width: 767px) {
      grid-row: 1/2;
    }
  }
}

.swiper-button-prev,
.swiper-button-next {
  padding: 20px;
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

      // background-color: rgba(32, 32, 32, 0.4);

      object-fit: cover;
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

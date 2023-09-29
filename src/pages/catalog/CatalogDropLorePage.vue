<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { ProductLoreService } from '@/api/services/product-lore'
import AppBackNav from '@/components/features/AppBackNav.vue'

const route = useRoute()
const productSlug = Array.isArray(route.params.dropSlug)
  ? route.params.dropSlug[0]
  : route.params.dropSlug

const { data, status } = await ProductLoreService.getLore({ productSlug })
const loreData = computed(() => (status ? data : undefined))
</script>

<template>
  <section class="pb-40 pt-30 md:pt-40">
    <AppContainer>
      <AppBackNav />
      <div class="main__grid">
        <div data-aos="fade-up" class="main__header">
          <div class="main__header-wrapper">
            <h1
              class="outlined-text font-hnd text-[34px] font-bold uppercase leading-none sm:text-[38px] lg:text-[40px] xl:text-[44px] 2xl:text-[56px]"
              style="--stroke-width: 1px"
            >
              DROP LORE
            </h1>
            <h2
              class="outlined-text font-hnd text-[24px] font-bold uppercase leading-none sm:text-[26px] lg:text-[28px] xl:text-[32px] 2xl:text-[38px]"
            >
              {{ loreData?.title || '' }}
            </h2>
          </div>
        </div>
        <div class="main__body">
          <div class="main__body-glass">
            <img :src="loreData?.image || ''" class="main__body-img" />
          </div>
          <div
            class="main__body-text"
            v-html="loreData?.description || ''"
          ></div>
        </div>
      </div>
    </AppContainer>
  </section>
</template>

<style lang="scss" scoped>
.main {
  padding-top: 40px;
  &__grid {
    padding-top: 85px;

    display: flex;
    column-gap: 50px;

    @media (max-width: 767px) {
      padding-top: 30px;
      row-gap: 20px;
      display: block;
    }
  }

  &__header {
    position: relative;

    flex-basis: 135px;
    flex-grow: 0;
    flex-shrink: 0;

    width: 135px;

    @media (max-width: 767px) {
      width: 100%;
    }
  }

  &__header-wrapper {
    position: absolute;
    top: 0;
    left: 0;

    display: flex;
    flex-direction: column;
    align-items: center;

    width: max-content;
    padding-bottom: 5px;
    border-bottom: 2px solid #d9d9d9;

    transform: rotate(-90deg) translateX(-100%);
    transform-origin: top left;

    @media (max-width: 767px) {
      position: static;
      transform: none;

      width: 100%;
    }
  }

  &__body {
    display: flex;
    column-gap: 40px;

    padding-top: 35px;

    @media (max-width: 767px) {
      display: block;
      padding-top: 10px;
    }
  }

  &__body-glass {
    flex-shrink: 0;
    max-width: 450px;
    width: 100%;

    @media (max-width: 767px) {
      margin-bottom: 20px;
    }
  }

  &__body-text {
    color: #969eab;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 1.38;
    text-transform: uppercase;

    @media (max-width: 767px) {
      font-size: 14px;
    }
  }
}
</style>

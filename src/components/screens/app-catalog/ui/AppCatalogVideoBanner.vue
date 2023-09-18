<script lang="ts" setup>
import { useRoute } from 'vue-router'

import { CATALOG_DATA } from '@/api/modules/catalog'

import AppCatalogVideo from './AppCatalogVideo.vue'

const route = useRoute()
const dropNumber =
  CATALOG_DATA.map(drop => drop.dropSlug).indexOf(
    route.params.dropSlug as string
  ) + 1
</script>

<template>
  <div class="grid-wrapper">
    <AppCatalogVideo class="max-w-[630px]" />
    <div class="mb-20 flex flex-grow flex-col justify-center lg:mb-0 lg:pl-30">
      <div class="close-icon">
        <slot name="close"></slot>
      </div>
      <div class="flex flex-col justify-center">
        <h1 class="heading mb-5 text-white">{{ route.params.dropSlug }}</h1>
        <h2
          v-if="false"
          class="outlined-text subheading pl-10"
          style="--stroke-color: #000"
        >
          For tier {{ dropNumber }} items
        </h2>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.grid-wrapper {
  @apply flex flex-col-reverse lg:flex-row;
}

.heading {
  // font-size: 48px;
  // font-style: normal;
  // font-weight: 900;
  // line-height: 100%;
  // letter-spacing: 5.12px;
  // text-transform: uppercase;

  @apply select-none font-hnd text-[34px] font-bold uppercase leading-none sm:text-[38px] lg:text-[40px] xl:text-[60px];
}

.subheading {
  font-size: 48px;
  font-style: normal;
  font-weight: 900;
  line-height: 100%;
  letter-spacing: 2.92px;
  text-transform: uppercase;

  @apply font-hnd;
}

.close-icon {
  position: absolute;
  top: 70px;
  right: 55px;
}
</style>

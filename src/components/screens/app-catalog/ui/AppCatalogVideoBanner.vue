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
    <div class="flex flex-grow flex-col items-center justify-center">
      <div class="close-icon">
        <slot name="close"></slot>
      </div>
      <div class="flex flex-col justify-center">
        <h1 class="heading mb-5">Teaser</h1>
        <h2 class="outlined-text subheading pl-10" style="--stroke-color: #000">
          For tier {{ dropNumber }} items
        </h2>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.grid-wrapper {
  @apply flex;
}

.heading {
  color: #000;
  font-size: 128px;
  font-style: normal;
  font-weight: 900;
  line-height: 100%;
  letter-spacing: 5.12px;
  text-transform: uppercase;
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

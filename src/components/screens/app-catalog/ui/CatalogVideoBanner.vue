<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

// import { CATALOG_DATA } from '@/api/modules/catalog'
import CatalogVideo from './CatalogVideo.vue'

const route = useRoute()
// const dropNumber =
//   CATALOG_DATA.map(drop => drop.dropSlug).indexOf(
//     route.params.dropSlug as string
//   ) + 1

const dropName = computed(() => route.params.dropSlug)
</script>

<template>
  <div class="grid-wrapper">
    <CatalogVideo class="w-full" />
    <div
      v-if="false"
      class="mb-20 flex flex-grow flex-col justify-center lg:mb-0 lg:pl-30"
    >
      <div class="close-icon">
        <slot name="close"></slot>
      </div>
      <div class="flex flex-col justify-center text-white">
        <h1 class="heading">{{ dropName }}</h1>
        <h2 class="subheading">Paving the Path to Uniting Web2.0 and Web3.0</h2>
        <div>
          <p class="mb-10 text-[16px]">
            This release is more than just clothing. It's a piece of a larger,
            captivating story that we're excited to share with you.
          </p>
          <p class="text-[16px]">
            Working on this drop, we didn't think it would get this much
            publicity and actually become historic regarding our product.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.grid-wrapper {
  @apply flex flex-col-reverse;
}

.heading {
  @apply mb-15 select-none font-hnd text-[34px] font-extrabold uppercase leading-tight sm:text-[38px] lg:text-[40px] xl:text-[64px] 2xl:text-[85px];
}

.subheading {
  @apply mb-35 font-hnd font-semibold leading-tight tracking-[2.92px] xl:text-[20px] 2xl:text-[22px];
}

.close-icon {
  @apply absolute right-55 top-70;
}
</style>

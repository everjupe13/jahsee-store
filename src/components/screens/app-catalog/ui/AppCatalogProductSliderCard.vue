<script lang="ts" setup>
import { computed, type Ref } from 'vue'
import { type RouteLocationRaw, useRoute } from 'vue-router'

import { ForwardLinkArrowIcon } from '@/components/shared/icons'
import { RouteNamesEnum } from '@/router/router.types'

interface IProductSliderCard {
  productName: string
  image: string
  productId: number
}

const route = useRoute()
const props = withDefaults(defineProps<IProductSliderCard>(), {
  productName: ''
})

const linkToProduct: Ref<RouteLocationRaw> = computed(() =>
  props.productId
    ? `/${RouteNamesEnum.catalog}/${route.params.dropSlug}/${RouteNamesEnum.drop}/${props.productId}`
    : '/404'
)
</script>

<template>
  <div class="group w-full max-w-full md:max-w-[460px]">
    <div
      class="mb-40 block aspect-square min-h-[200px] max-w-full overflow-hidden bg-button-black/40 opacity-100 transition-all hover:bg-button-black group-hover:opacity-100 md:max-w-[460px]"
    >
      <router-link :to="linkToProduct" class="relative block h-auto w-full">
        <img
          :src="image"
          class="z-1 relative block w-full select-none object-cover"
        />
      </router-link>
    </div>
    <RouterLink
      :to="linkToProduct"
      class="flex cursor-pointer items-center justify-between gap-x-10 border-b-2 border-solid border-b-white/20 pb-20 transition-all group-hover:border-b-white"
    >
      <div
        class="select-none font-hnd text-[28px] font-bold uppercase leading-none tracking-[0.64px] text-white lg:text-[28px] xl:text-[34px]"
      >
        {{ props.productName }}
      </div>
      <div class="flex-shrink-0 flex-grow-0">
        <ForwardLinkArrowIcon
          width="36"
          height="36"
          class="opacity-20 transition-all group-hover:opacity-100"
        />
      </div>
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped>
.heading {
  font-size: 64px;
  letter-spacing: 2.56px;

  @apply font-extrabold uppercase leading-none;

  @media (max-width: 767px) {
    font-size: 48px;
  }
}
</style>

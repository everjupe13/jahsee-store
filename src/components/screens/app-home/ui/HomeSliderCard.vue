<script lang="ts" setup>
import { ICatalog } from '@/api/modules/catalog'
import { RouteNamesEnum } from '@/router/router.types'

import { HomeCardTagDividerIconRaw } from '../models/tagDivider'
import HomeSliderNavigation from './HomeSliderNavigation.vue'

const props = withDefaults(defineProps<ICatalog>(), {})
const toLink = props.isCatalogExpanded
  ? `${RouteNamesEnum.catalog}/${props.dropSlug}`
  : `${RouteNamesEnum.catalog}/${props.dropSlug}/${RouteNamesEnum.drop}/${props.products[0].id}`

const renderTagsString = (drop: ICatalog): string => {
  if (!Array.isArray(drop.products)) {
    return ''
  }

  return [
    `${drop.products.length} ${drop.products.length > 1 ? 'items' : 'item'}`,
    drop.yearTag,
    drop.status
  ]
    .map(tag => `<span>${tag}</span>`)
    .join(HomeCardTagDividerIconRaw)
}
</script>

<template>
  <div>
    <div class="mb-20 flex flex-wrap justify-between md:flex-nowrap">
      <div
        class="outlined-text heading grow-1 cursor-default select-none font-hnd !text-[34px] sm:!text-[38px] lg:!text-[40px] xl:!text-[44px]"
        style="--stroke-width: 2px"
      >
        {{ props.name }}
      </div>
      <HomeSliderNavigation class="swiper-slide-navs shrink-0" />
    </div>
    <div class="mb-20 block max-w-[800px]">
      <router-link
        :to="toLink"
        class="catalog-link relative flex aspect-[8/6] h-auto max-h-[600px] min-h-[200px] w-full items-center justify-center bg-button-black/40"
      >
        <img
          :src="props.thumbImage"
          class="z-1 relative block h-full w-full select-none object-cover"
        />
        <div
          class="sold-out z-2 pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-default select-none"
          v-if="props.status === 'sold out'"
        >
          Sold out
        </div>
      </router-link>
    </div>
    <div
      class="tags flex items-center gap-x-8"
      v-html="renderTagsString(props)"
    ></div>
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

.tags {
  font-size: 16px;

  &:last-child {
    @apply font-medium uppercase leading-normal text-white opacity-60;
  }
}

.sold-out {
  font-size: 64px;
  letter-spacing: 2.56px;

  @apply text-center font-hnd font-black uppercase leading-none text-white mix-blend-difference;
}

.swiper {
  .swiper-slide {
    .heading {
      @apply opacity-0;
    }

    .swiper-slide-navs {
      @apply opacity-0;

      @media (max-width: 767px) {
        @apply hidden;
      }
    }

    .catalog-link {
      @apply pointer-events-none;
    }
  }

  .swiper-slide-active {
    .heading {
      @apply opacity-100;
      transition: opacity 0.5s ease;
    }

    .swiper-slide-navs {
      @apply opacity-100;
    }

    .catalog-link {
      @apply pointer-events-auto;
    }
  }
}
</style>

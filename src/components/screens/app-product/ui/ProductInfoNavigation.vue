<script lang="ts" setup>
import { ref } from 'vue'

import {
  DropdownCollapseArrowIcon,
  ForwardLinkArrowIcon
} from '@/components/shared/icons'

type Props = {
  dropSlug: string
  productAboutList: string[] | []
}

const props = withDefaults(defineProps<Partial<Props>>(), {
  dropSlug: '0'
})

const detailsWrapper = ref()

const detailsOpened = ref(false)
const toggleDetailsOpened = () => {
  detailsOpened.value = !detailsOpened.value
}
const handleBlurDetails = () => {
  detailsOpened.value = false
}
</script>

<template>
  <div
    class="text-[24px] font-normal leading-normal text-[#f6f5ff] md:mb-50 md:text-[18px]"
  >
    <div
      class="group mb-10 flex cursor-pointer items-center justify-between gap-x-10 border-b-[1px] border-b-white/20 pb-10 transition-all duration-300"
    >
      <div
        class="select-none font-hnd text-[16px] font-bold uppercase leading-normal tracking-[0.64px] text-white"
      >
        Size guide
      </div>
      <div class="flex flex-shrink-0 flex-grow-0">
        <ForwardLinkArrowIcon
          class="opacity-20 transition-all duration-300 group-hover:opacity-100 group-[.--active]:opacity-100"
        />
      </div>
    </div>

    <RouterLink
      :to="{ name: 'lore', state: { id: props.dropSlug } }"
      class="group mb-10 flex cursor-pointer items-center justify-between gap-x-10 border-b-[1px] border-b-white/20 pb-10 transition-all duration-300"
    >
      <div
        class="select-none font-hnd text-[16px] font-bold uppercase leading-normal tracking-[0.64px] text-white"
      >
        Drop lore
      </div>
      <div class="flex flex-shrink-0 flex-grow-0">
        <ForwardLinkArrowIcon
          class="opacity-20 transition-all duration-300 group-hover:opacity-100 group-[.--active]:opacity-100"
        />
      </div>
    </RouterLink>

    <div
      tabindex="0"
      ref="detailsWrapper"
      class="details-wrapper relative z-[10] flex flex-col gap-y-15"
      @blur="handleBlurDetails"
    >
      <div
        class="group flex cursor-pointer items-center justify-between gap-x-10 border-b-[1px] border-b-white/20 pb-10 transition-all duration-300"
        :class="[{ '--active': detailsOpened }]"
        @click="toggleDetailsOpened"
      >
        <div
          class="select-none font-hnd text-[16px] font-bold uppercase leading-normal tracking-[0.64px] text-white"
        >
          Details
        </div>
        <div class="flex flex-shrink-0 flex-grow-0">
          <DropdownCollapseArrowIcon
            class="opacity-20 transition-all duration-300 group-hover:opacity-100 group-[.--active]:opacity-100"
          />
        </div>
      </div>

      <div
        v-if="
          Array.isArray(props.productAboutList) &&
          props.productAboutList.length > 0
        "
        class="relative z-[10]"
      >
        <AppCollapse
          v-model="detailsOpened"
          class="absolute left-0 right-0 top-0 z-[10]"
        >
          <ul class="w-full bg-[#0d0d0d] px-30 py-20">
            <li
              v-for="(item, index) in props.productAboutList"
              :key="index"
              class="mb-15 w-full text-[16px] uppercase leading-tight text-white last:mb-0"
            >
              {{ item }}
            </li>
          </ul>
        </AppCollapse>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.details-wrapper {
  transform: translateZ(10px);
}
</style>

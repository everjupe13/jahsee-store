<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useModal } from 'vue-final-modal'

import {
  DropdownCollapseArrowIcon,
  ForwardLinkArrowIcon
} from '@/components/shared/icons'
import { isDefaultVersion, isSizeGridVersion } from '@/config/tracker'

import ProductInfoSizeImageModal from './ProductInfoSizeImageModal.vue'

type Props = {
  productSlug: string
  productAboutList: string[] | []
  sizingImage: string
}

const props = withDefaults(defineProps<Partial<Props>>(), {
  productSlug: ''
})

const detailsWrapper = ref()

const detailsOpened = ref(false)
const toggleDetailsOpened = () => {
  detailsOpened.value = !detailsOpened.value
}
const handleBlurDetails = () => {
  detailsOpened.value = false
}

const { open: openSizeImageModal, close: closeSizeImageModal } = useModal({
  component: ProductInfoSizeImageModal,
  attrs: {
    image: computed(() => props.sizingImage).value,
    onConfirm() {
      closeSizeImageModal()
    }
  }
})

const isActionSended = ref(false)
const openSizeGrid = () => {
  if (!isActionSended.value) {
    isActionSended.value = true
    if (isSizeGridVersion()) {
      window.ym(95_590_253, 'reachGoal', 'v_size_grid')
    } else if (isDefaultVersion()) {
      window.ym(95_590_253, 'reachGoal', 'v_default_size_grid')
    }
  }

  openSizeImageModal()
}

const loreLink = `/lore/${props.productSlug}`
</script>

<template>
  <div
    class="text-16 font-normal leading-normal text-[#f6f5ff] xl:text-[18px] 2xl:text-[24px]"
  >
    <div
      v-if="isSizeGridVersion()"
      class="mb-40 flex cursor-pointer gap-x-8"
      @click="openSizeGrid"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-20 w-20"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
        />
      </svg>
      <p class="text-[14px] font-bold text-[#f3f3f3]">Open size grid</p>
    </div>
    <div
      v-else
      class="group mb-10 flex cursor-pointer items-center justify-between gap-x-10 border-b-[1px] border-b-white/20 pb-10 transition-all duration-300"
      @click="openSizeGrid"
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
      :to="loreLink"
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

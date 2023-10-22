<script lang="ts" setup>
import { computed } from 'vue'

import { useCatalogStore } from '@/api/modules/catalog'
import { formatDollars } from '@/utils/cost'

type Props = {
  id: number
  products: {
    id: number
    contents: {
      size: string
      amount: number
    }[]
  }[]
  cost: string
  status: string
  trackNumber: string
}
const props = defineProps<Props>()

const catalogStore = useCatalogStore()
const products = computed(() => props.products)
const productsData = await Promise.all(
  products.value.map(product => catalogStore.fetchProduct(product.id))
)
</script>

<template>
  <article
    class="border-0 border-b-[1px] border-b-[rgba(0,0,0,0.1)] py-24 last:border-b-0"
  >
    <div class="text-[14px] font-medium uppercase leading-none text-[#848A99]">
      {{ `№${props.id}` }}
    </div>
    <div>
      <template v-if="productsData.every(Boolean)">
        <div
          v-for="product in productsData"
          :key="product!.id"
          class="mb-25 grid h-[110px] grid-cols-[calc(100%/12*6)_calc(100%/12*6)] last:mb-0 md:h-[140px] md:grid-cols-[calc(100%/12*8)_calc(100%/12*2)_calc(100%/12*2)]"
        >
          <div
            class="col-span-2 flex items-center gap-x-10 md:col-span-1 md:gap-x-40"
          >
            <div
              class="flex h-[110px] w-[110px] items-center justify-center overflow-hidden md:h-[140px] md:w-[140px]"
            >
              <img
                :src="product?.gallery[0]"
                alt=""
                class="pointer-events-none block h-full w-full object-cover"
              />
            </div>
            <div class="flex h-full flex-col justify-center gap-y-15 py-20">
              <h3
                class="font-hnd text-[16px] font-extrabold uppercase leading-none tracking-[0.72px] text-button-black md:text-[18px]"
              >
                {{ product?.productName || '' }}
              </h3>
              <p
                class="text-[14px] font-medium uppercase leading-none tracking-[0.64px] text-button-black md:text-[16px]"
              >
                {{ formatDollars(parseFloat(props?.cost)) }}
              </p>
            </div>
          </div>
          <div class="flex flex-col justify-center">
            <p
              class="text-[12px] font-semibold uppercase leading-none text-button-black md:text-[14px]"
            >
              {{ props.status.replaceAll('_', ' ') }}
            </p>
          </div>
          <div class="flex flex-col justify-center">
            <p
              class="text-[12px] font-semibold uppercase leading-none text-[#848a99] md:text-[14px]"
            >
              {{ props.trackNumber }}
            </p>
          </div>
        </div>
      </template>
    </div>
  </article>
</template>

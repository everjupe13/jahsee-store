<script lang="ts" setup>
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/shift-away.css'

import tippy from 'tippy.js'
import { computed, onMounted, ref, shallowRef, watch } from 'vue'

import { FormLoader } from '@/components/widgets/loaders'
import { isSizesVersion } from '@/config/tracker'
import { sleep } from '@/utils'

type Props = {
  sizes: { label: string; soldOut: boolean }[]
  isSoldOut: boolean
  isSoon: boolean
  isPreOrder: boolean
}
const props = withDefaults(defineProps<Partial<Props>>(), {
  sizes: () => []
})
const emits = defineEmits(['handleProductAddToCart'])

const selectedSize = ref()
const isOutOfStock = computed(() => props.isSoldOut)
const setSelectedSize = (key: string) => {
  const size = props.sizes.find(size => size.label === key)
  const isSizeSoldOut = Boolean(size?.soldOut)

  if (size && !isSizeSoldOut && selectedSize.value !== key) {
    selectedSize.value = key
  }
}

const sizeButtonClasses = (size: { label: string; soldOut: boolean }) => [
  { '--active': size.label === selectedSize.value },
  { '--disabled': isOutOfStock.value || size.soldOut }
]

const isSizeChoosed = computed(() => selectedSize.value)
const submitTippy = shallowRef()

onMounted(() => {
  submitTippy.value = tippy(
    document.querySelector('#product-submit-button') as Element,
    {
      content: 'choose the size',
      animation: 'shift-away',
      arrow: false,
      theme: 'bkrv'
    }
  )

  if (isSizeChoosed.value || isOutOfStock.value || props.isSoon) {
    submitTippy.value.disable()
  } else {
    submitTippy.value.enable()
  }
})

watch(isSizeChoosed, newChoosed => {
  if (newChoosed) {
    submitTippy.value.disable()
  } else {
    submitTippy.value.enable()
  }
})

const loading = ref(false)
const longLoading = ref(false)

const beforeRequestLoaders = async () => {
  longLoading.value = true
  loading.value = true
}

const afterRequestLoaders = async () => {
  await sleep(200)
  loading.value = false
  await sleep(700)
  longLoading.value = false
}

const handleBuy = async () => {
  if (isSizesVersion()) {
    console.log('v_product_proceed')
    window.ym(95_590_253, 'reachGoal', 'v_product_proceed')
  } else {
    console.log('v_default_product_proceed')
    window.ym(95_590_253, 'reachGoal', 'v_default_product_proceed')
  }

  if (isSizeChoosed.value) {
    await beforeRequestLoaders()

    emits('handleProductAddToCart', selectedSize.value)
    await sleep(700)

    await afterRequestLoaders()
    selectedSize.value = undefined
  }
}

const handleSelectChange = (e: Event) => {
  const t = e.target as HTMLSelectElement
  setSelectedSize(t.value)
}
</script>

<template>
  <form @submit.prevent="handleBuy" class="flex flex-col gap-y-10">
    <template v-if="isSizesVersion()">
      <div class="mb-20">
        <select
          class="h-40 w-full rounded-[5px] px-10 font-medium text-black"
          value=""
          @change="handleSelectChange"
        >
          <option disabled value="">Choose the size</option>
          <option
            v-for="size in props.sizes"
            :key="size.label"
            :value="size.label"
          >
            {{ size.label }}
          </option>
        </select>
      </div>
    </template>

    <template v-else>
      <div v-if="props.sizes.length > 0" class="flex flex-wrap gap-x-10">
        <button
          v-for="size in props.sizes"
          class="size-button group flex h-50 flex-shrink-0 cursor-pointer items-center justify-center bg-[#242424] p-10 transition-all hover:opacity-80 disabled:!opacity-70 sm:h-64 lg:aspect-square"
          :class="[
            ...sizeButtonClasses(size),
            props.sizes.length === 1 ? 'w-full' : 'w-[calc((100%-10px*5)/6)]'
          ]"
          :key="size.label"
          type="button"
          :disabled="loading || longLoading || props.isSoon"
          @click="() => setSelectedSize(size.label)"
        >
          <span
            class="block font-hnd text-[14px] font-medium uppercase leading-none text-white transition-all group-[.--active]:text-[#0a090a] group-[.--disabled]:text-[#545454] sm:text-[16px]"
          >
            {{ size.label }}
          </span>
        </button>
      </div>
    </template>

    <div id="product-submit-button">
      <AppButton
        class="h-50 w-full justify-center sm:h-64 xl:h-60 2xl:h-80"
        theme="alternative"
        :disabled="
          !isSizeChoosed || isOutOfStock || props.isSoon || longLoading
        "
        type="submit"
      >
        <template v-if="isOutOfStock">Sold out</template>
        <template v-else-if="props.isSoon">Soon</template>
        <template v-else>
          <template v-if="loading">
            <div class="flex items-center justify-center">
              <FormLoader class="!text-black"></FormLoader>
            </div>
          </template>
          <template v-else>
            {{ longLoading ? 'Added' : 'add to cart' }}
          </template>
        </template>
      </AppButton>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.size-button {
  &.--active {
    @apply bg-white opacity-100;
  }

  &.--disabled {
    @apply cursor-auto bg-[#242424] opacity-100;
  }
}
</style>

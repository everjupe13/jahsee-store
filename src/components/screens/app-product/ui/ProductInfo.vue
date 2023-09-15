<script lang="ts" setup>
import ProductInfoControls from './ProductInfoControls.vue'
import ProductInfoDescription from './ProductInfoDescription.vue'
import ProductInfoNavigation from './ProductInfoNavigation.vue'
import ProductInfoPrice from './ProductInfoPrice.vue'
import ProductInfoTitle from './ProductInfoTitle.vue'

type Props = {
  title: string
  cost: number
  description: string
  aboutList: string[]
  dropSlug: string
  sizes: { label: string; soldOut: boolean }[]
}

const props = withDefaults(defineProps<Partial<Props>>(), {
  title: '',
  cost: 0,
  description: '',
  dropSlug: ''
})

const emits = defineEmits(['handleProductAdd'])
const handleProductAdd = (size: string) => {
  emits('handleProductAdd', size)
}
</script>

<template>
  <div class="flex max-w-[490px] flex-col gap-y-40">
    <div>
      <ProductInfoTitle :text="props.title" class="mb-25" />
      <ProductInfoPrice
        :price="props.cost"
        class="mb-25"
        data-aos="fade-down"
        data-aos-delay="100"
      />
      <ProductInfoDescription
        :text="props.description"
        data-aos="fade-down"
        data-aos-delay="200"
      />
    </div>

    <div class="mt-auto">
      <ProductInfoNavigation
        class="mb-10"
        :drop-slug="props.dropSlug"
        :product-about-list="props.aboutList"
        data-aos="fade-down"
        data-aos-delay="250"
      />
      <ProductInfoControls
        :sizes="props.sizes"
        class="controls"
        data-aos="fade-down"
        data-aos-delay="300"
        @handle-product-add-to-cart="handleProductAdd"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.controls {
  &.aos-animate {
    transform: none;
  }
}
</style>

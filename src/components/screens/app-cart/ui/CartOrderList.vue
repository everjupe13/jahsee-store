<script lang="ts" setup>
import { computed } from 'vue'

import { ICartItem, useCartStore } from '@/api/modules/cart'
import { useCatalogStore } from '@/api/modules/catalog'

import CartOrder from './CartOrder.vue'

const cartStore = useCartStore()
const catalogStore = useCatalogStore()
const localCart = computed(() => catalogStore.products)

const emit = defineEmits<{
  (e: 'add-item', itemId: number, size: string): void
  (e: 'decrease-item', itemId: number, size: string): void
  (e: 'remove-item', itemId: number, size: string): void
}>()

const handleIncrementItem = (itemId: number, size: string) => {
  cartStore.addItem(itemId, size)
  emit('add-item', itemId, size)
}

const handleDecrementItem = (itemId: number, size: string) => {
  cartStore.removeItem(itemId, size)
  emit('decrease-item', itemId, size)
}

const handleDeleteItem = (itemId: number, size: string) => {
  cartStore.deleteItem(itemId, size)
  emit('remove-item', itemId, size)
}

const orderCartMapper = (product: ICartItem) => {
  const currentProduct = localCart.value?.find(
    cartProduct => cartProduct.id === product.id
  )
  return {
    id: product.id,
    cost: currentProduct?.cost || 0,
    img: currentProduct?.gallery?.[0],
    title: currentProduct?.productName,
    size: product?.size || '',
    count: product?.count || 0
  }
}
const orderItems = computed(() =>
  cartStore.cart.map(item => orderCartMapper(item))
)
</script>

<template>
  <div class="bg-white p-20 lg:p-30 2xl:p-40">
    <div
      class="grid grid-cols-[calc(100%/12*10)_calc(100%/12*2)] items-center border-0 border-b-[1px] border-b-[rgba(0,0,0,0.1)] pb-15 md:grid-cols-[calc(100%/3*2)_calc(100%/3*1)] md:pb-20"
    >
      <div class="uppercase leading-none text-[#848a99] text-medium-14">
        Product
      </div>
      <div class="uppercase leading-none text-[#848a99] text-medium-14">
        Size
      </div>
    </div>

    <template v-if="orderItems && orderItems?.length > 0">
      <CartOrder
        v-for="item in orderItems"
        :key="item.id"
        v-bind="item"
        @incrementCount="handleIncrementItem(item.id as number, item.size)"
        @decrementCount="handleDecrementItem(item.id as number, item.size)"
        @deleteItem="handleDeleteItem(item.id as number, item.size)"
      ></CartOrder>
    </template>
    <template v-else>
      <div class="py-20">
        <p class="font-hnd text-[14px] font-extrabold uppercase text-[#848a99]">
          You haven't addded any products yet.
          <br />
          To add a product, please go
          <router-link
            to="/"
            class="text-button-black underline underline-offset-2 transition-all hover:underline-offset-[6px] focus:underline-offset-[6px] active:underline-offset-[6px]"
          >
            to the catalog
          </router-link>
        </p>
      </div>
    </template>
  </div>
</template>

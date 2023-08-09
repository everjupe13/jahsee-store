<script lang="ts" setup>
import { computed, reactive } from 'vue'

import { useCartStore } from '@/api/modules/cart'
import { useCatalogStore } from '@/api/modules/catalog'
import AppBackNav from '@/components/features/AppBackNav.vue'
import {
  AppRadio,
  AppRadiosFieldset
} from '@/components/features/AppRadiosFieldset'
import { AppCartOrder } from '@/components/screens/app-cart'

const handleUpdateRadios = (_e: InputEvent) => {
  // TODO not todo just additional hook for radios change
  // console.log(radiosModel)
}
const radiosModel = reactive([true, false, false])
const handleRadiosClick = (index: number) => {
  if (radiosModel[index]) {
    return
  }

  radiosModel[index] = true
  for (let i = 0; i < radiosModel.length; i++) {
    if (i !== index) {
      radiosModel[i] = false
    }
  }
}

const cartStore = useCartStore()
const catalogStore = useCatalogStore()
await catalogStore.fetchProducts()

const cartItems = computed(
  () =>
    cartStore.cart?.map(item => ({
      ...(catalogStore.products && Array.isArray(catalogStore.products)
        ? catalogStore.products!.find(product => product.id === item.id)
        : {}),
      size: item.size,
      count: item.count
    })) || []
)
const handleIncrementItem = (itemId: number, size: string) => {
  cartStore.addItem(itemId, size)
}

const handleDecrementItem = (itemId: number, size: string) => {
  cartStore.removeItem(itemId, size)
}

const handleDeleteItem = (itemId: number, size: string) => {
  cartStore.deleteItem(itemId, size)
}

const onCreateOrder = () => {
  cartStore.createOrder()
}

const totalCost = computed<string>(() => cartStore.calculateCost())
const deliveryCost = computed<string>(() => cartStore.calculateDeliveryCost())
</script>

<template>
  <section class="cart">
    <AppContainer>
      <AppBackNav />
      <div class="my-20 md:my-40">
        <div class="outlined-text title font-hnd" style="--stroke-width: 2px">
          My bag
        </div>
      </div>
      <div class="cart__grid">
        <div class="cart__table">
          <div class="cart__table-header">
            <div class="cart__table-heading">Product</div>
            <div class="cart__table-heading">Size</div>
          </div>

          <template v-for="item in cartItems" :key="item!.id">
            <AppCartOrder
              :img="item!.gallery?.[0]"
              :title="item!.productName"
              :cost="item!.cost"
              :size="item!.size"
              :count="item!.count"
              @incrementCount="
                () => handleIncrementItem(item!.id as number, item!.size)
              "
              @decrementCount="
                () => handleDecrementItem(item!.id as number, item!.size)
              "
              @deleteItem="
                () => handleDeleteItem(item!.id as number, item!.size)
              "
            ></AppCartOrder>
          </template>
        </div>
        <div class="cart__schema">
          <form @submit.prevent class="cart__schema-form">
            <div class="cart__schema-item-border pb-25 md:pb-20">
              <p class="cart__heading">TOTAL</p>
            </div>

            <div class="cart__schema-body">
              <div class="cart__schema-list">
                <div
                  class="cart__schema-item-border flex items-center justify-between py-20 md:py-25"
                >
                  <p class="cart__subheading">Sub-total</p>
                  <div class="cart__heading">{{ totalCost }}</div>
                </div>

                <div class="flex items-center justify-between py-20 md:py-25">
                  <p class="cart__subheading">Delivery</p>
                  <div class="cart__heading">{{ deliveryCost }}</div>
                </div>
              </div>

              <AppRadiosFieldset class="mb-25" @update="handleUpdateRadios">
                <AppRadio
                  :value="radiosModel[0]"
                  @input="handleRadiosClick(0)"
                  class="mb-15"
                >
                  CDEK
                </AppRadio>
                <AppRadio
                  :value="radiosModel[1]"
                  @input="handleRadiosClick(1)"
                  class="mb-15"
                >
                  Russian Post
                </AppRadio>
                <AppRadio :value="radiosModel[2]" @input="handleRadiosClick(2)">
                  International delivery and other
                </AppRadio>
              </AppRadiosFieldset>

              <fieldset class="block h-full w-full">
                <div class="flex items-center">
                  <AppInput
                    class="w-full"
                    placeholder="Coupon Code"
                    input-wrapper-classes="!bg-transparent"
                  >
                    <template #after-input>
                      <AppButton type="button" class="!p-12 !text-[12px]">
                        Apply
                      </AppButton>
                    </template>
                  </AppInput>
                </div>
              </fieldset>

              <div class="mt-20 md:mt-[150px]">
                <AppButton class="w-full" @click="onCreateOrder">
                  Checkout
                </AppButton>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AppContainer>
  </section>
</template>

<style lang="scss" scoped>
.title {
  font-size: 64px;
  font-style: normal;
  font-weight: 800;
  line-height: 100%;
  letter-spacing: 2.56px;
  text-transform: uppercase;

  @media (max-width: 767px) {
    font-size: 48px;
  }
}
.cart {
  padding-top: 40px;
  padding-bottom: 40px;

  @media (max-width: 767px) {
    padding-top: 30px;
    padding-bottom: 40px;
  }

  &__grid {
    display: grid;
    grid-template-columns: calc(100% - 440px) 440px;

    @media (max-width: 991px) {
      grid-template-columns: 100%;
      // row-gap: 20px;
    }
  }

  &__table {
    padding: 40px;
    background: #fff;

    @media (max-width: 767px) {
      padding: 30px;
    }
  }

  &__table-header {
    display: grid;
    grid-template-columns: calc(100% / 3 * 2) calc(100% / 3 * 1);
    align-items: center;

    padding-bottom: 25px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    @media (max-width: 767px) {
      grid-template-columns: calc(100% / 12 * 11) calc(100% / 12 * 1);
      padding-bottom: 15px;
    }
  }

  &__table-heading {
    color: #848a99;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 100%;
    text-transform: uppercase;
  }

  &__heading,
  &__subheading {
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 100%;
    text-transform: uppercase;
  }

  &__heading {
    color: #000;
  }

  &__subheading {
    color: #848a99;
    text-transform: none;
  }

  &__schema {
    background-color: #e8e8e9;
  }

  &__schema-form {
    padding: 40px;

    @media (max-width: 767px) {
      padding: 30px;
    }
  }

  &__schema-item-border {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
}
</style>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'

import { useCartStore } from '@/api/modules/cart'
import AppBackNav from '@/components/features/AppBackNav.vue'
import { formatDollars } from '@/utils/cost'

import { useAddress } from '../models/useAddress'
import CartOrderList from './CartOrderList.vue'
import CartSummarySheet from './CartSummarySheet.vue'

const {
  openCurrentAddressForm,
  openAddressForm,
  currentAddress,
  isAddressValid
} = useAddress()
const cartStore = useCartStore()
await cartStore.expandCartProducts()

const isLoading = ref(false)
const isSuccess = ref(true)
const withLoader = async (callback: () => Promise<void>) => {
  isLoading.value = true
  isSuccess.value = false
  await callback()
  isLoading.value = false
  isSuccess.value = true
}

const serverMessage = ref<string | undefined>()
const serverMessageVisible = computed(
  () => !!serverMessage.value && serverMessage.value !== undefined
)

const renderServerError = (apiError: {
  data: { [x: string]: string[] }
  error: { [x: string]: string[] } | string
}) => {
  const rawMessages = apiError.error
  const pureMessage =
    rawMessages instanceof Object
      ? Object.values(rawMessages).flat(1)[0]
      : rawMessages

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getFirstObjectValue = (tree: any): string => {
    if (!(tree instanceof Object)) {
      return tree
    }

    return getFirstObjectValue(Object.values(tree)[0])
  }
  serverMessage.value = getFirstObjectValue(pureMessage)
}

const onFormSubmit = async () => {
  serverMessage.value = undefined
  if (!isAddressValid.value) {
    return openAddressForm()
  }

  await withLoader(async () => {
    const response = await cartStore.createOrder({ promocode: promocode.value })
    if (response.error) {
      renderServerError(
        response.error as {
          data: { [x: string]: string[] }
          error: { [x: string]: string[] } | string
        }
      )
    }
  })
}

const promocode = ref('')
const setPromocode = (newPromo: string) => {
  promocode.value = newPromo
  requestCost()
}

const totalCost = ref(cartStore.calculateCost())
const deliveryCost = ref(cartStore.calculateDeliveryCost())

const requestCost = async () => {
  serverMessage.value = undefined
  await withLoader(async () => {
    const response = await cartStore.calcServerPrice({
      promocode: promocode.value
    })

    if (response.error) {
      return renderServerError(
        response.error as {
          data: { [x: string]: string[] }
          error: { [x: string]: string[] } | string
        }
      )
    }

    totalCost.value = response?.data?.totalPrice
      ? formatDollars(response.data.totalPrice)
      : formatDollars(0)

    if (response?.data?.discountedPrice) {
      deliveryCost.value = formatDollars(response.data.discountedPrice)
    }
  })
}

onMounted(async () => {
  await requestCost()
})
watch(
  () => cartStore.cart,
  async () => {
    await requestCost()
  },
  { deep: true }
)
</script>

<template>
  <AppBackNav />
  <div class="my-20 md:my-40">
    <div
      class="outlined-text title relative font-hnd text-[34px] font-bold uppercase leading-none sm:text-[38px] lg:text-[40px] xl:text-[44px]"
      style="--stroke-width: 2px"
    >
      My bag
    </div>
  </div>
  <div class="cart__grid">
    <CartOrderList></CartOrderList>
    <CartSummarySheet
      @form-submit="onFormSubmit"
      :cost="totalCost || 0"
      :delivery-cost="deliveryCost || 0"
      :server-message="serverMessage"
      :server-message-visible="serverMessageVisible"
      :is-loading="isLoading"
      :is-succes="isSuccess"
      :is-cart-empty="cartStore.cart.length === 0"
      :promocode="promocode"
      :current-address="currentAddress"
      :change-current-address="openCurrentAddressForm"
      :open-address-form="openAddressForm"
      @set-promo="setPromocode"
    ></CartSummarySheet>
  </div>
</template>

<style lang="scss" scoped>
.title {
  @include laptop-big {
    -webkit-text-stroke-width: 1px;
  }
}
.cart {
  @apply py-40;

  @media (max-width: 767px) {
    @apply pt-30;
  }

  &__grid {
    display: grid;
    grid-template-columns: calc(100% - 440px) 440px;

    @include laptop-big {
      grid-template-columns: calc(100% - 420px) 420px;
    }

    @include laptop {
      grid-template-columns: calc(100% - 350px) 350px;
    }

    @include tablet {
      grid-template-columns: 100%;
    }
  }
}
</style>

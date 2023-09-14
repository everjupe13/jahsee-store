<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useModal, useModalSlot } from 'vue-final-modal'

import { useCartStore } from '@/api/modules/cart'
import { useUserStore } from '@/api/modules/user'
import AppBackNav from '@/components/features/AppBackNav.vue'
import { AddressFormModal } from '@/components/screens/app-profile'
import AppModal from '@/components/widgets/AppModal.vue'

import CartOrderList from './CartOrderList.vue'
import CartSummarySheet from './CartSummarySheet.vue'

const serverMessage = ref<string | undefined>()
const serverMessageVisible = computed(
  () => !!serverMessage.value && serverMessage.value !== undefined
)

const isLoading = ref(false)
const isSuccess = ref(true)

const onFormSubmit = async () => {
  serverMessage.value = undefined
  if (!isAddressValid.value) {
    openAddressForm()
    return
  }

  isLoading.value = true
  isSuccess.value = false

  const response = await cartStore.createOrder()

  if (response.status) {
    isLoading.value = false
    isSuccess.value = true
  } else if (response.error) {
    isLoading.value = false
    isSuccess.value = true

    const rawMessages = (response.error as { data: { [x: string]: string[] } })
      .data
    const pureMessage = Object.values(rawMessages).flat(1)[0]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getFirstObjectValue = (tree: any): string => {
      if (!(tree instanceof Object)) {
        return tree
      }

      return getFirstObjectValue(Object.values(tree)[0])
    }
    serverMessage.value = getFirstObjectValue(pureMessage)
  }
}

const cartStore = useCartStore()
const userStore = useUserStore()
await cartStore.expandCartProducts()
const isAddressValid = computed(
  () => userStore.addresses && userStore.addresses.length > 0
)
const totalCost = ref(cartStore.calculateCost())
const deliveryCost = computed<string>(() => cartStore.calculateDeliveryCost())

watch(
  () => cartStore.cart,
  () => {
    totalCost.value = cartStore.calculateCost()
    serverMessage.value = undefined
  },
  { deep: true }
)

const { open: openAddressForm, close: closeAddressForm } = useModal({
  component: AppModal,
  attrs: {},
  slots: {
    default: useModalSlot({
      component: AddressFormModal,
      attrs: {
        onConfirm() {
          closeAddressForm()
        }
      }
    })
  }
})
</script>

<template>
  <AppContainer>
    <AppBackNav />
    <div class="my-20 md:my-40">
      <div class="outlined-text title font-hnd" style="--stroke-width: 2px">
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
      ></CartSummarySheet>
    </div>
  </AppContainer>
</template>

<style lang="scss" scoped>
.title {
  font-size: 64px;
  letter-spacing: 2.56px;

  @apply font-extrabold uppercase leading-none;

  @media (max-width: 767px) {
    font-size: 48px;
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

    @media (max-width: 991px) {
      grid-template-columns: 100%;
      // row-gap: 20px;
    }
  }
}
</style>
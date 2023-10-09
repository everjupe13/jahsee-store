<script lang="ts" setup>
import { reactive, ref } from 'vue'

import { IAddress } from '@/api/modules/user/address'
import {
  AppRadio,
  AppRadiosFieldset
} from '@/components/features/AppRadiosFieldset'
import { FormAlternativeLoader } from '@/components/widgets/loaders'
import { formatDollars } from '@/utils/cost'

type Props = {
  cost?: number
  discountedPrice?: number
  deliveryCost?: number
  serverMessage?: string
  serverMessageVisible?: boolean
  isLoading?: boolean
  isSuccess?: boolean
  isCartEmpty?: boolean
  promocode?: string
  changeCurrentAddress?: () => void
  currentAddress?: IAddress
}

// const handleUpdateRadios = (_e: InputEvent) => {
//   // TODO not todo just additional hook for radios change
//   // console.log(radiosModel)
// }

const emits = defineEmits([
  'form-submit',
  'set-promo',
  'set-delivery',
  'set-payment'
])

const props = withDefaults(defineProps<Props>(), {
  cost: 0,
  discountedPrice: undefined,
  deliveryCost: 0,
  serverMessage: '',
  serverMessageVisible: false,
  isLoading: false,
  isSuccess: true,
  isCartEmpty: false,
  promocode: '',
  changeCurrentAddress: () => {}
})

const onCreateOrder = () => {
  emits('form-submit')
}

const paymentModel = reactive([true, false])
const changePaymentModel = (index: number) => {
  if (paymentModel[index]) {
    return
  }

  paymentModel[index] = true
  emits('set-payment', index)
  for (let i = 0; i < paymentModel.length; i++) {
    if (i !== index) {
      paymentModel[i] = false
    }
  }
}

const deliveryModel = reactive([true, false])
const changeDeliveryModel = (index: number) => {
  if (deliveryModel[index]) {
    return
  }

  deliveryModel[index] = true
  emits('set-delivery', index)
  for (let i = 0; i < deliveryModel.length; i++) {
    if (i !== index) {
      deliveryModel[i] = false
    }
  }
}

const localPromocode = ref('')
const onPromoFieldAction = (action: 'apply' | 'reset') => {
  switch (action) {
    case 'apply': {
      emits('set-promo', localPromocode.value)
      break
    }
    case 'reset': {
      localPromocode.value = ''
      emits('set-promo', '')
      break
    }
  }
}
</script>

<template>
  <div class="bg-[#e8e8e9] p-20 lg:p-30 2xl:p-40">
    <form @submit.prevent>
      <div
        class="border-0 border-b-[1px] border-b-[rgba(0,0,0,0.1)] pb-25 md:pb-20"
      >
        <p class="uppercase !leading-none text-black text-medium-16">TOTAL</p>
      </div>

      <div class="">
        <div class="">
          <div
            class="flex items-center justify-between border-0 border-b-[1px] border-b-[rgba(0,0,0,0.1)] py-20 md:py-25"
          >
            <p class="!leading-none text-[#848a99] text-medium-16">Sub-total</p>
            <div class="uppercase !leading-none text-black text-medium-16">
              <span
                :class="{
                  'pr-10 font-semibold line-through':
                    props.discountedPrice && props.discountedPrice < props.cost
                }"
              >
                {{ formatDollars(props.cost) }}
              </span>
              <span
                v-if="
                  props.discountedPrice && props.discountedPrice < props.cost
                "
              >
                {{ formatDollars(props.discountedPrice) }}
              </span>
            </div>
          </div>

          <div class="flex items-center justify-between py-20 md:py-25">
            <p class="!leading-none text-[#848a99] text-medium-16">Delivery</p>
            <div class="uppercase !leading-none text-black text-medium-16">
              {{ formatDollars(props.deliveryCost) }}
            </div>
          </div>
        </div>

        <fieldset class="mb-20 block h-full w-full">
          <div class="flex items-center">
            <AppInput
              class="w-full"
              placeholder="Coupon Code"
              input-wrapper-classes="!bg-transparent"
              v-model="localPromocode"
              :readonly="!!props.promocode"
            >
              <template #after-input>
                <AppButton
                  type="button"
                  class="!p-12 !text-[12px]"
                  :disabled="isLoading || !isSuccess || isCartEmpty"
                  @click="
                    props.promocode
                      ? onPromoFieldAction('reset')
                      : onPromoFieldAction('apply')
                  "
                >
                  {{ props.promocode ? 'Reset' : 'Apply' }}
                </AppButton>
              </template>
            </AppInput>
          </div>
        </fieldset>

        <template v-if="props.currentAddress">
          <p class="mb-10 !leading-none text-[#848a99] text-medium-16">
            Address
          </p>
          <div class="mb-10 flex items-center justify-between">
            <p
              class="text-[12px] font-semibold leading-none text-black lg:text-[14px]"
            >
              {{
                `${props.currentAddress.zipCode}, ${props.currentAddress.country}, ${props.currentAddress.city}, ${props.currentAddress.street}`
              }}
            </p>
            <button @click="changeCurrentAddress" type="button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="h-20 w-20 text-black"
              >
                <path
                  d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z"
                />
                <path
                  d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z"
                />
              </svg>
            </button>
          </div>
        </template>

        <div class="flex flex-col gap-y-20 pt-25">
          <p class="!leading-none text-[#848a99] text-medium-15">
            Delivery options:
          </p>
          <AppRadiosFieldset>
            <AppRadio
              :value="deliveryModel[0]"
              name="delivery"
              @input="changeDeliveryModel(0)"
              class="mb-15"
            >
              CDEK (CIS)
            </AppRadio>
            <AppRadio
              name="delivery"
              :value="deliveryModel[1]"
              @input="changeDeliveryModel(1)"
            >
              International shipping
            </AppRadio>
          </AppRadiosFieldset>
        </div>

        <div class="flex flex-col gap-y-20 pt-25">
          <p class="!leading-none text-[#848a99] text-medium-15">
            Payment options:
          </p>
          <AppRadiosFieldset>
            <AppRadio
              :value="paymentModel[0]"
              name="address"
              @input="changePaymentModel(0)"
              class="mb-15"
            >
              DePay (Crypto)
            </AppRadio>
            <AppRadio
              :value="paymentModel[1]"
              name="address"
              @input="changePaymentModel(1)"
              class="mb-15"
            >
              YooKassa (Bank card)
            </AppRadio>
          </AppRadiosFieldset>
        </div>

        <div class="mt-20 md:mt-[50px]">
          <div
            v-if="serverMessageVisible"
            class="mb-10 px-5 text-[#d84949] text-medium-15"
          >
            {{ serverMessage }}
          </div>
          <AppButton
            :disabled="isLoading || !isSuccess || isCartEmpty"
            fluid
            class="mb-25 h-65"
            @click="onCreateOrder"
          >
            <template v-if="isLoading">
              <div class="flex items-center justify-center">
                <FormAlternativeLoader></FormAlternativeLoader>
              </div>
            </template>
            <template v-else>Checkout</template>
          </AppButton>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

import { IAddress } from '@/api/modules/user/address'
import {
  AppRadio,
  AppRadiosFieldset
} from '@/components/features/AppRadiosFieldset'

type Props = {
  cost?: string | number
  deliveryCost?: string | number
  serverMessage?: string
  serverMessageVisible?: boolean
  isLoading?: boolean
  isSuccess?: boolean
  isCartEmpty?: boolean
  promocode?: string
  changeCurrentAddress?: () => void
  currentAddress?: IAddress
}

const handleUpdateRadios = (_e: InputEvent) => {
  // TODO not todo just additional hook for radios change
  // console.log(radiosModel)
}

const emits = defineEmits(['form-submit', 'update-promo'])

const props = withDefaults(defineProps<Props>(), {
  cost: 0,
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

const radiosModel = reactive([true, false])
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

const handelPromoChange = (value: string) => {
  emits('update-promo', value)
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
              {{ props.cost }}
            </div>
          </div>

          <div class="flex items-center justify-between py-20 md:py-25">
            <p class="!leading-none text-[#848a99] text-medium-16">Delivery</p>
            <div class="uppercase !leading-none text-black text-medium-16">
              {{ props.deliveryCost }}
            </div>
          </div>
        </div>

        <!-- <AppRadiosFieldset class="mb-25" @update="handleUpdateRadios">
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
        </AppRadiosFieldset> -->

        <fieldset class="mb-20 block h-full w-full">
          <div class="flex items-center">
            <AppInput
              class="w-full"
              placeholder="Coupon Code"
              input-wrapper-classes="!bg-transparent"
              :model-value="promocode"
              @update:model-value="handelPromoChange"
            >
              <template #after-input>
                <AppButton
                  type="button"
                  class="!p-12 !text-[12px]"
                  :disabled="isLoading || !isSuccess || isCartEmpty"
                >
                  Apply
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
            Payment options:
          </p>
          <AppRadiosFieldset @update="handleUpdateRadios">
            <AppRadio
              :value="radiosModel[0]"
              @input="handleRadiosClick(0)"
              class="mb-15"
            >
              Helio (Solana)
            </AppRadio>
            <AppRadio
              :value="radiosModel[1]"
              @input="handleRadiosClick(1)"
              class="mb-15"
            >
              YooKassa (Bank card)
            </AppRadio>
          </AppRadiosFieldset>
        </div>

        <div class="mt-20 md:mt-[100px]">
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
            Checkout
          </AppButton>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

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
}

const handleUpdateRadios = (_e: InputEvent) => {
  // TODO not todo just additional hook for radios change
  // console.log(radiosModel)
}

const emits = defineEmits(['form-submit'])

const props = withDefaults(defineProps<Props>(), {
  cost: 0,
  deliveryCost: 0,
  serverMessage: '',
  serverMessageVisible: false,
  isLoading: false,
  isSuccess: true,
  isCartEmpty: false
})

const onCreateOrder = () => {
  emits('form-submit')
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
</script>

<template>
  <div class="bg-[#e8e8e9] p-25">
    <form @submit.prevent class="py-10 md:py-20">
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

        <div class="mt-20 md:mt-[150px]">
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

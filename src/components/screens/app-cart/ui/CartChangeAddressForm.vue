<script lang="ts" setup>
import { reactive, Ref } from 'vue'

import { useUserStore } from '@/api/modules/user'

type Props = {
  currentAddressId: number | Ref<number>
}
const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'change-address', id: number): void
  (e: 'add-address'): void
}>()

const userStore = useUserStore()
const onSubmitForm = () => {
  emit('confirm')
}

const addressesModel = reactive(userStore.addresses?.map(_ => false) || [])

if (addressesModel.length > 0) {
  addressesModel[props.currentAddressId as number] = true
}

const handleCurrentAddress = (id: number) => {
  if (id !== props.currentAddressId) {
    emit('change-address', id)
  }
}

const onAddAddress = () => {
  emit('add-address')
}
</script>

<template>
  <form @submit.prevent="onSubmitForm">
    <h3
      class="mb-30 text-center font-hnd text-[30px] font-medium uppercase leading-tight tracking-[1.6px] text-button-black md:mb-40 md:text-[40px]"
    >
      Choose address
    </h3>
    <template v-if="userStore.addresses && userStore.addresses.length > 0">
      <div
        v-for="address in userStore.addresses"
        :key="address.id"
        class="mb-20 text-[16px] font-semibold leading-none text-black last-of-type:mb-40"
        @click="handleCurrentAddress(address.id)"
      >
        <div class="flex max-w-max cursor-pointer items-center gap-x-10">
          <span
            :class="[
              'radio-icon',
              { '--active': address.id === props.currentAddressId }
            ]"
          ></span>
          <span>
            {{
              `${address.zipCode}, ${address.country}, ${address.city}, ${address.street}`
            }}
          </span>
        </div>
      </div>
    </template>
    <AppButton
      outlined
      fluid
      class="px-48 py-24"
      type="button"
      @click="onAddAddress"
    >
      Add new adress
    </AppButton>
  </form>
</template>

<style lang="scss" scoped>
.radio-icon {
  -webkit-appearance: none;
  appearance: none;
  transform: translateY(-1px);

  display: grid;
  place-content: center;

  margin: 0;
  width: 20px;
  height: 20px;
  border: 1.5px solid rgba(0, 0, 0, 0.2);
  border-radius: 50%;

  font: inherit;

  transition: all 0.3s ease;

  &.--active {
    border: 1.5px solid rgba(0, 0, 0, 1);

    &::before {
      background-color: rgba(0, 0, 0, 1);
      transform: scale(1);
    }
  }

  &::before {
    content: '';

    display: block;

    width: 8px;
    height: 8px;
    border-radius: 50%;

    background-color: rgba(0, 0, 0, 0.2);

    transform: scale(0);
    transition: 0.12s transform ease-in-out;

    transition: all 0.3s ease;
  }

  &:checked::before {
    transform: scale(1);
  }
}
</style>

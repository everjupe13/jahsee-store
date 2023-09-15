<script lang="ts" setup>
import { unref } from 'vue'
import { useModal, useModalSlot } from 'vue-final-modal'

import { useUserStore } from '@/api/modules/user'
import AppModal from '@/components/widgets/AppModal.vue'

import AddressFormModal from './AddressFormModal.vue'
import ProfileTabHeading from './ProfileTabHeading.vue'

const userStore = useUserStore()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useOpenModal = (props?: { [x: string]: any }) => {
  const { open: openAddressForm, close: closeAddressForm } = useModal({
    component: AppModal,
    attrs: {},
    slots: {
      default: useModalSlot({
        component: AddressFormModal,
        attrs: {
          ...unref(props),
          onConfirm() {
            closeAddressForm()
          }
        }
      })
    }
  })

  return { openAddressForm, closeAddressForm }
}

const onAddAddressClick = () => {
  const { openAddressForm } = useOpenModal()
  openAddressForm()
}

const onDeleteAddress = async (index: number) => {
  await userStore.deleteAddress(index)
}

const onEditAddress = (index: number) => {
  const propsData = userStore.addresses!.find(address => address.id === index)

  const { openAddressForm } = useOpenModal(propsData)
  openAddressForm()
}
</script>

<template>
  <div>
    <ProfileTabHeading>My addresses</ProfileTabHeading>
    <AppButton outlined class="mb-20 px-48 py-24" @click="onAddAddressClick">
      Add new adress
    </AppButton>
    <div class="flex flex-col gap-y-20">
      <template v-if="userStore.addresses && userStore.addresses?.length > 0">
        <template v-for="address in userStore.addresses" :key="address.id">
          <div class="border border-solid border-button-black/10 p-20 md:p-30">
            <div class="flex justify-between">
              <div class="flex flex-col gap-y-10 lg:gap-y-18 2xl:gap-y-24">
                <p class="text">{{ userStore.fullName }}</p>
                <p class="text">{{ address.street }}, {{ address.zipCode }}</p>
                <p class="text">{{ address.city }}, {{ address.country }}</p>
              </div>
              <div class="flex flex-shrink-0 flex-col md:flex-row">
                <button
                  class="button-text p-7 lg:p-10"
                  @click="onDeleteAddress(address.id)"
                >
                  Delete
                </button>
                <button
                  class="button-text p-7 lg:p-10"
                  @click="onEditAddress(address.id)"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.text {
  @apply text-[12px] font-semibold leading-none text-[#555862] lg:text-[14px] 2xl:text-[16px];
}

.button-text {
  @apply font-hnd text-[14px] font-bold uppercase leading-none text-button-black;
}
</style>

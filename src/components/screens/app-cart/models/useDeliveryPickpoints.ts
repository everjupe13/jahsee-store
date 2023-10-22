// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable unicorn/consistent-function-scoping */
import { computed, type Ref, ref, watch } from 'vue'
import { useModal, useModalSlot } from 'vue-final-modal'

import { IAddress } from '@/api/modules/user'
import { useApiRequest } from '@/api/shared/network/http'
import AppModal from '@/components/widgets/AppModal.vue'

import DeliveryPickpointForm from '../ui/DeliveryPickpointForm.vue'

type PickpointAddressType = {
  address: string
  code: string
}
export const useDeliveryPickpoints = (
  currentAddress: Ref<Partial<IAddress> | undefined>
) => {
  const isCurrentUserAddressSet = computed(
    () =>
      currentAddress.value && Object.values(currentAddress.value).every(Boolean)
  )

  const fetchedAddresses = ref<PickpointAddressType[]>()
  const currentPickpointAddress = ref<PickpointAddressType>()
  const errorMessage = ref()
  fetchPickpoints()

  const { open: openDeliveryPickpointForm, close: closeDeliveryPickpointForm } =
    useModal({
      component: AppModal,
      attrs: {},
      slots: {
        default: useModalSlot({
          component: DeliveryPickpointForm,
          attrs: {
            currentAddress: currentPickpointAddress,
            addresses: fetchedAddresses,
            errorMessage: errorMessage,
            // addresses: fetchedAddresses,
            onConfirm() {
              closeDeliveryPickpointForm()
            },
            'onPick-address'(code: string) {
              currentPickpointAddress.value = fetchedAddresses.value?.find(
                address => address.code === code
              )
              closeDeliveryPickpointForm()
            }
          }
        })
      }
    })

  async function fetchPickpoints() {
    if (!isCurrentUserAddressSet.value) {
      fetchedAddresses.value = []
    }

    try {
      const fetchResponse = await useApiRequest.post(`/cdek_office`, {
        delivery_address: {
          zipcode: currentAddress.value!.zipCode,
          street_address: currentAddress.value!.street,
          city: currentAddress.value!.city,
          country: currentAddress.value!.country
        }
      })

      if (
        fetchResponse?.status &&
        fetchResponse.status < 400 &&
        fetchResponse?.data
      ) {
        fetchedAddresses.value = fetchResponse.data.data
        return true
      }

      fetchedAddresses.value = []
    } catch (error) {
      // TODO add notification observer center
      // eslint-disable-next-line no-console
      console.log(error)
      fetchedAddresses.value = []
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      errorMessage.value = (error as any)?.response?.data?.error || ''
    }
  }

  watch(
    currentAddress,
    _newAddress => {
      fetchPickpoints()
    },
    { deep: true }
  )

  return {
    pickpointAddresses: fetchedAddresses,
    currentPickpointAddress,
    fetchPickpoints,
    openDeliveryPickpointForm
  }
}

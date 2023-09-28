import { computed, ref } from 'vue'
import { useModal, useModalSlot } from 'vue-final-modal'

import { useUserStore } from '@/api/modules/user'
import { AddressFormModal } from '@/components/screens/app-profile'
import AppModal from '@/components/widgets/AppModal.vue'

import CartChangeAddressForm from '../ui/CartChangeAddressForm.vue'

export const useAddress = () => {
  const userStore = useUserStore()
  const isAddressValid = computed(
    () => userStore.addresses && userStore.addresses.length > 0
  )

  const currentAddress = ref(userStore.addresses?.[0])
  const changeCurrentAddress = (id: number) => {
    currentAddress.value = userStore.addresses?.find(
      address => address.id === id
    )
  }

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

  const { open: openCurrentAddressForm, close: closeCurrentAddressForm } =
    useModal({
      component: AppModal,
      attrs: {},
      slots: {
        default: useModalSlot({
          component: CartChangeAddressForm,
          attrs: {
            currentAddressId: computed(() => currentAddress.value?.id || 0),
            onConfirm() {
              closeCurrentAddressForm()
            },
            'onAdd-address'() {
              closeCurrentAddressForm()
              openAddressForm()
            },
            'onChange-address'(id: number) {
              closeCurrentAddressForm()
              changeCurrentAddress(id)
            }
          }
        })
      }
    })
  return {
    openCurrentAddressForm,
    closeCurrentAddressForm,
    openAddressForm,
    closeAddressForm,
    currentAddress,
    changeCurrentAddress,
    isAddressValid
  }
}

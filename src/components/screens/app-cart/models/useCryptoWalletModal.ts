/* eslint-disable @typescript-eslint/no-explicit-any */
import { unref } from 'vue'
import { useModal, useModalSlot } from 'vue-final-modal'

import AppModal from '@/components/widgets/AppModal.vue'

import CartCryptoWalletModal from '../ui/CartCryptoWalletModal.vue'

export const useCryptoWalletModal = (props?: { payload?: string }) => {
  const { open: openCryptoWallet, close: closeCryptoWallet } = useModal({
    component: AppModal,
    attrs: {
      onConfirm() {
        onCryptoWalletClose()
      }
    },
    slots: {
      default: useModalSlot({
        component: CartCryptoWalletModal,
        attrs: {
          ...unref(props)
        }
      })
    }
  })

  function onCryptoWalletClose() {
    closeCryptoWallet()
  }

  return { openCryptoWallet, closeCryptoWallet }
}

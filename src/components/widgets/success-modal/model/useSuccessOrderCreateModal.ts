/* eslint-disable unicorn/consistent-function-scoping */
import { omit } from 'lodash-es'
import { nextTick, onMounted, watch } from 'vue'
import { useModal, useModalSlot } from 'vue-final-modal'
import { RouteLocation, useRoute, useRouter } from 'vue-router'

import AppModal from '@/components/widgets/AppModal.vue'
import { sleep } from '@/utils'

import SuccessOrderCreateModal from '../ui/SuccessOrderCreateModal.vue'

const MODAL_QUERY_KEY = 'action'
const MODAL_QUERY_VALUE = 'successfull_payment'

export const useSuccessOrderCreateModal = () => {
  const router = useRouter()
  const route = useRoute()

  const { open: openSuccessOrderForm, close: closeSuccessOrderForm } = useModal(
    {
      component: AppModal,
      attrs: {},
      slots: {
        default: useModalSlot({
          component: SuccessOrderCreateModal,
          attrs: {
            onConfirm() {
              closeSuccessOrderForm()
              router.push('/profile')
            },
            onClose() {
              router.push('/profile')
            }
          }
        })
      }
    }
  )

  const checkStateAtQuery = (queryObject: RouteLocation['query']) => {
    return (
      queryObject instanceof Object &&
      queryObject[MODAL_QUERY_KEY] &&
      queryObject[MODAL_QUERY_KEY] === MODAL_QUERY_VALUE
    )
  }

  const deleteStateFromQuery = async () => {
    await router.push({ path: route.path, query: omit(route.query, 'action') })
  }

  watch(
    () => route.query,
    newQuery => {
      if (checkStateAtQuery(newQuery)) {
        nextTick(() => {
          openSuccessOrderForm()
        })
      }

      deleteStateFromQuery()
    },
    { deep: true }
  )

  onMounted(async () => {
    if (checkStateAtQuery(route.query)) {
      await sleep(500)
      nextTick(() => {
        openSuccessOrderForm()
      })

      deleteStateFromQuery()
    }
  })

  return {
    openSuccessOrderForm,
    closeSuccessOrderForm
  }
}

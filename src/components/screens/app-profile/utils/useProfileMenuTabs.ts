import { computed, ref } from 'vue'

import ProfileAddress from '../ui/ProfileAddress.vue'
import ProfileInfo from '../ui/ProfileInfo.vue'
import ProfileOrders from '../ui/ProfileOrders.vue'

const tabs = [
  {
    id: 0,
    name: 'profile',
    label: 'My profile',
    component: ProfileInfo,
    componentClasses: 'lg:max-w-[640px]'
  },
  {
    id: 1,
    name: 'address',
    label: 'Address book',
    component: ProfileAddress
  },
  {
    id: 2,
    name: 'orders',
    label: 'My orders',
    component: ProfileOrders
  }
]

export const useProfileMenuTabs = () => {
  const activeTab = ref(0)
  const changeActiveTab = (id: number): boolean => {
    if (activeTab.value === id) {
      return false
    }

    activeTab.value = id
    return true
  }

  const activeComponent = computed(() => tabs[activeTab.value].component)
  const activeComponentClasses = computed(
    () => tabs[activeTab.value].componentClasses
  )

  const isCurrentTabActive = (id: number) => activeTab.value === id

  return {
    tabs,
    activeComponent,
    activeComponentClasses,
    activeTab,
    changeActiveTab,
    isCurrentTabActive
  }
}

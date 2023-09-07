<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useUserStore } from '@/api/modules/user'
import AppBackNav from '@/components/features/AppBackNav.vue'
import {
  AppProfileAddress,
  AppProfileInfo,
  AppProfileOrders
} from '@/components/screens/app-profile'
import { RouteNamesEnum } from '@/router/router.types'

const tabs = [
  {
    id: 0,
    name: 'profile',
    label: 'My profile',
    component: AppProfileInfo,
    componentClasses: 'max-w-[640px]'
  },
  {
    id: 1,
    name: 'address',
    label: 'Address book',
    component: AppProfileAddress
  },
  {
    id: 2,
    name: 'orders',
    label: 'My orders',
    component: AppProfileOrders
  }
]

const activeTab = ref(0)
const setActvieTab = (id: number) => {
  if (activeTab.value === id) {
    return
  }

  activeTab.value = id
}

const router = useRouter()
const userStore = useUserStore()
await userStore.fetchProfile()

const onLogoutClick = async () => {
  userStore.forget()
  return await router.push({ name: RouteNamesEnum.login })
}
</script>

<template>
  <section class="pb-40 pt-30 md:pt-40">
    <AppContainer>
      <AppBackNav />
      <div class="my-20 md:my-40">
        <h1 class="outlined-text title font-hnd" style="--stroke-width: 2px">
          My account
        </h1>
      </div>
      <div class="cart-grid">
        <div class="bg-gray px-50 py-40">
          <nav class="flex flex-col gap-y-10">
            <div v-for="tab in tabs" :key="tab.id">
              <button
                class="nav-link p-8 pl-0 font-hnd transition-colors"
                :class="{ '--active': activeTab === tab.id }"
                @click="setActvieTab(tab.id)"
              >
                {{ tab.label }}
              </button>
            </div>
            <div>
              <button
                class="nav-link p-8 pl-0 font-hnd transition-colors"
                @click="onLogoutClick"
              >
                Logout
              </button>
            </div>
          </nav>
        </div>

        <div class="content-body min-h-[600px] bg-white p-40">
          <component
            :is="tabs[activeTab].component"
            :class="tabs[activeTab].componentClasses"
            data-aos="fade-up"
            data-aos-duration="400"
          ></component>
        </div>
      </div>
    </AppContainer>
  </section>
</template>

<style lang="scss" scoped>
.title {
  font-size: 64px;
  font-style: normal;
  font-weight: 800;
  line-height: 100%;
  letter-spacing: 2.56px;
  text-transform: uppercase;

  @media (max-width: 767px) {
    font-size: 48px;
  }
}

.content-body {
  overflow-y: auto;
  ::-webkit-scrollbar {
    @apply h-8 w-8;
  }

  ::-webkit-scrollbar-track {
    /* @apply bg-white; */
    @apply bg-black/10;
  }

  ::-webkit-scrollbar-thumb {
    /* @apply bg-black/30; */
    @apply bg-black;
  }

  ::-webkit-scrollbar-thumb:hover {
    @apply bg-black/50;
  }

  ::-webkit-scrollbar-corner {
    @apply bg-white;
    @apply bg-black;
  }

  /* Gecko */

  * {
    scrollbar-width: thin;
    scrollbar-color: rgba(0, 0, 0, 0.15) transparent;
  }
}

.cart-grid {
  display: grid;
  grid-template-columns: 440px calc(100% - 440px);

  @media (max-width: 991px) {
    grid-template-columns: 100%;
  }
}

.nav-link {
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  text-transform: uppercase;
  color: #848a99;

  @apply active:text-button-black/70;

  &.--active {
    color: #000;
  }
}
</style>

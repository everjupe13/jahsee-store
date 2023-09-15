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
import { sleep } from '@/utils'

const tabs = [
  {
    id: 0,
    name: 'profile',
    label: 'My profile',
    component: AppProfileInfo,
    componentClasses: 'lg:max-w-[640px]'
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
const setActiveTab = async (id: number) => {
  if (activeTab.value === id) {
    openOnMobiles()
    return
  }

  activeTab.value = id
  await sleep(200)
  isMobileOpen.value = false
}

const router = useRouter()
const userStore = useUserStore()
await userStore.fetchProfile()

const onLogoutClick = async () => {
  userStore.forget()
  return await router.push({ name: RouteNamesEnum.login })
}

const isMobileOpen = ref(false)
const openOnMobiles = () => {
  isMobileOpen.value = !isMobileOpen.value
}
</script>

<template>
  <section class="pb-40 pt-30 md:pt-40">
    <AppContainer>
      <AppBackNav />
      <div class="my-20 xl:my-30 2xl:my-40">
        <h1
          class="outlined-text title relative font-hnd !text-[34px] font-bold uppercase leading-none sm:!text-[38px] lg:!text-[40px] xl:!text-[44px]"
          style="--stroke-width: 2px"
        >
          My account
        </h1>
      </div>
      <div class="cart-grid">
        <div
          class="bg-gray px-20 py-15 lg:px-30 lg:py-20 xl:px-40 xl:py-30 2xl:px-50 2xl:py-40"
        >
          <nav class="flex flex-col">
            <div v-for="tab in tabs" :key="tab.id">
              <button
                class="nav-link mb-10 w-full p-8 pl-0 font-hnd transition-colors last:mb-0 lg:w-auto xl:p-8"
                :class="{
                  '--active': activeTab === tab.id,
                  'max-xl:!block': isMobileOpen
                }"
                @click="setActiveTab(tab.id)"
              >
                <span class="flex w-full items-center justify-between">
                  <span class="flex flex-grow justify-start">
                    {{ tab.label }}
                  </span>
                  <span
                    v-if="activeTab === tab.id"
                    class="flex flex-shrink-0 flex-grow-0 items-center justify-center lg:hidden"
                  >
                    <AppButton
                      class="!px-14 !py-8 !text-[12px]"
                      @click="openOnMobiles"
                    >
                      <span
                        :class="[
                          'relative h-10 w-10',
                          'after:h-2 after:w-[10px] after:bg-white after:transition-all',
                          'after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2',
                          'before:h-10 before:w-2 before:bg-white before:transition-all',
                          { 'before:h-2 before:w-[10px]': isMobileOpen },
                          'before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2'
                        ]"
                      ></span>
                    </AppButton>
                  </span>
                </span>
              </button>
            </div>
            <div>
              <button
                class="nav-link p-4 pl-0 font-hnd transition-colors xl:p-8"
                :class="{ '!inline-block': isMobileOpen }"
                @click="onLogoutClick"
              >
                Logout
              </button>
            </div>
          </nav>
        </div>

        <div class="content-body min-h-[600px] bg-white px-20 py-30 lg:p-40">
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
  @include phone-big {
    font-size: 36px;
    -webkit-text-stroke-width: 1px;
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

  @include laptop-big {
    grid-template-columns: 290px calc(100% - 300px);
  }

  @include laptop {
    grid-template-columns: 260px calc(100% - 260px);
  }

  @include tablet {
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

  @include laptop-big {
    font-size: 20px;
  }

  @include tablet {
    &:not(.--active) {
      display: none;
    }
  }

  &.--active {
    color: #000;
  }
}
</style>

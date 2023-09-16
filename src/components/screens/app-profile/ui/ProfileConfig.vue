<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useUserStore } from '@/api/modules/user'
import AppBackNav from '@/components/features/AppBackNav.vue'
import { RouteNamesEnum } from '@/router/router.types'
import { sleep } from '@/utils'

import { useProfileMenuTabs } from '../utils/useProfileMenuTabs'

const {
  tabs,
  changeActiveTab,
  activeComponent,
  activeComponentClasses,
  isCurrentTabActive
} = useProfileMenuTabs()

const setActiveTab = async (id: number) => {
  const isChanged = changeActiveTab(id)
  if (!isChanged) {
    openMobileMenu()
    return
  }

  await sleep(100)
  isMobileMenuOpen.value = false
  return
}

const router = useRouter()
const userStore = useUserStore()
await userStore.fetchProfile()

const onLogoutClick = async () => {
  userStore.forget()
  return await router.push({ name: RouteNamesEnum.login })
}

const isMobileMenuOpen = ref(false)
const openMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<template>
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
      class="bg-gray px-20 py-15 lg:px-30 lg:py-20 xl:px-20 xl:py-20 2xl:px-30 2xl:py-25"
    >
      <nav class="flex flex-col">
        <div v-for="tab in tabs" :key="tab.id">
          <button
            class="nav-link mb-10 w-full p-8 pl-0 font-hnd transition-all last:mb-0 lg:w-auto xl:p-8"
            :class="{
              '--active': isCurrentTabActive(tab.id),
              'max-xl:!block': isMobileMenuOpen
            }"
            @click="setActiveTab(tab.id)"
          >
            <span class="flex w-full items-center justify-between">
              <span class="flex flex-grow justify-start">
                {{ tab.label }}
              </span>
              <span
                v-if="isCurrentTabActive(tab.id)"
                class="flex flex-shrink-0 flex-grow-0 items-center justify-center lg:hidden"
                @click.self="openMobileMenu"
              >
                <AppButton class="h-26 w-38 !px-14 !py-8 !text-[12px]">
                  <span
                    :class="[
                      'relative h-10 w-10',
                      'after:h-2 after:w-[10px] after:bg-white after:transition-all',
                      'after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2',
                      'before:h-10 before:w-2 before:bg-white before:transition-all',
                      { 'before:h-2 before:w-[10px]': isMobileMenuOpen },
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
            :class="{ '!inline-block': isMobileMenuOpen }"
            @click="onLogoutClick"
          >
            Logout
          </button>
        </div>
      </nav>
    </div>

    <div class="content-body min-h-[600px] bg-white px-20 py-30 lg:p-40">
      <component
        :is="activeComponent"
        :class="activeComponentClasses"
        data-aos="fade-up"
        data-aos-duration="400"
      ></component>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.title {
  @include laptop-big {
    -webkit-text-stroke-width: 1px;
  }
}

.content-body {
  overflow-y: auto;
  ::-webkit-scrollbar {
    @apply h-8 w-8;
  }
  ::-webkit-scrollbar-track {
    @apply bg-black/10;
  }
  ::-webkit-scrollbar-thumb {
    @apply bg-black;
  }
  ::-webkit-scrollbar-thumb:hover {
    @apply bg-black/50;
  }
  ::-webkit-scrollbar-corner {
    @apply bg-white;
    @apply bg-black;
  }
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
    scale: 1.1;
    transform-origin: left center;
    padding-top: 15px;
    padding-bottom: 15px;

    @include tablet {
      scale: 1;
      padding-top: 0;
      padding-bottom: 0;
    }
  }
}
</style>

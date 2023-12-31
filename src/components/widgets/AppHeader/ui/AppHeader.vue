<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { computed, inject, nextTick, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

import { useCartStore } from '@/api/modules/cart'
import { useUserStore } from '@/api/modules/user'
import AppMarquee from '@/components/features/AppMarquee.vue'
import AppLogo from '@/components/shared/AppLogo.vue'
import { CartBagIcon, ProfileUserIcon } from '@/components/shared/icons'
import { RouteNamesEnum } from '@/router/router.types'
// import { inject, ref } from 'vue'

// const isLgScreen: boolean | undefined = inject('isLgScreen')

// const isModalOpened = ref(false)

// const openModal = () => {
//   const modal = document.querySelector('.modal') as HTMLElement

//   if (modal.style.display === 'flex') {
//     modal.style.display = 'none'
//     isModalOpened.value = false
//   } else {
//     modal.style.display = 'flex'
//     isModalOpened.value = true
//   }
// }
const store = useUserStore()
const { isAuth } = storeToRefs(store)
const route = useRoute()
const cartStore = useCartStore()

const marqueeHiddedPages: Set<RouteNamesEnum> = new Set([
  RouteNamesEnum.profile,
  RouteNamesEnum.login,
  RouteNamesEnum.signup,
  RouteNamesEnum.cart,
  RouteNamesEnum.drop,
  RouteNamesEnum.deliveryInfo,
  RouteNamesEnum.privacyInfo,
  RouteNamesEnum.confidentInfo
])
const isMarqueeHidden = computed(() =>
  marqueeHiddedPages.has(
    route.name as (typeof RouteNamesEnum)[keyof typeof RouteNamesEnum]
  )
    ? true
    : false
)
onMounted(() => {
  nextTick(() => {
    const _app = document.querySelector('#app') as HTMLElement
    const _header = document.querySelector('#header') as HTMLElement

    if (_app && _header) {
      _app.style.paddingTop = `${
        _header?.getBoundingClientRect().height || 0
      }px`
    }
  })
})

watch(isMarqueeHidden, () => {
  nextTick(() => {
    const _app = document.querySelector('#app') as HTMLElement
    const _header = document.querySelector('#header') as HTMLElement

    if (_app && _header) {
      _app.style.paddingTop = `${
        _header?.getBoundingClientRect().height || 0
      }px`
    }
  })
})

const isMdScreen = inject('isMdScreen')
</script>

<template>
  <header
    id="header"
    class="header fixed inset-x-0 top-0 z-10 flex flex-col justify-center"
  >
    <AppMarquee v-if="!isMarqueeHidden">3rd drop coming soon</AppMarquee>
    <div class="py-7 md:py-10">
      <AppContainer>
        <div class="flex items-center">
          <div class="header__logo grid items-center">
            <AppLogo></AppLogo>
          </div>
          <div class="mr-20 flex items-center gap-x-20 2xl:mr-30 2xl:gap-x-30">
            <template v-if="isMdScreen">
              <router-link to="/profile">
                <ProfileUserIcon class="pointer-events-none w-26 2xl:w-32" />
              </router-link>
            </template>

            <template v-else>
              <template v-if="isAuth">
                <router-link to="/profile">
                  <ProfileUserIcon class="pointer-events-none w-26 2xl:w-32" />
                </router-link>
              </template>
              <template v-else>
                <RouterLink
                  class="text-[14px] font-semibold uppercase leading-none text-[#f6f5ff] max-md:hidden 2xl:text-[18px]"
                  to="/login"
                >
                  Log In
                </RouterLink>
                <RouterLink
                  class="text-[14px] font-semibold uppercase leading-none text-[#f6f5ff] max-md:hidden 2xl:text-[18px]"
                  to="/signup"
                >
                  Sign Up
                </RouterLink>
              </template>
            </template>
          </div>
          <router-link to="/cart">
            <span class="relative block">
              <CartBagIcon class="pointer-events-none w-26 2xl:w-32" />
              <span
                v-if="cartStore.productsCount && cartStore.productsCount > 0"
                class="absolute left-[calc(100%)] top-[-2px] flex -translate-x-1/2 items-center justify-center overflow-hidden rounded-full bg-[rgb(225,29,72)] px-6 py-3 text-[12px] leading-none text-white"
              >
                {{ cartStore.productsCount }}
              </span>
            </span>
          </router-link>
        </div>
      </AppContainer>
    </div>
  </header>
</template>

<style lang="scss">
.header {
  border-bottom: 1px solid rgba($color: #ffffff, $alpha: 0.1);
  // glassmorphism effect
  backdrop-filter: blur(3px);
  background-color: rgba(32, 32, 34, 0.3);
  box-shadow: 0 8px 32px 0 rgba(32, 32, 34, 0.2);

  @media (max-width: 767px) {
  }

  &__logo {
    width: 230px;
    margin-right: auto;
    transition: 0.2s all ease;

    @media (max-width: 767px) {
      height: 100%;
    }
  }
}
</style>

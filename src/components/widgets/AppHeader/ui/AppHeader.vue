<script lang="ts" setup>
import { storeToRefs } from 'pinia'

import { useAuthStore } from '@/api/modules/auth/auth.store'
import AppMarquee from '@/components/features/AppMarquee.vue'
import AppLogo from '@/components/shared/AppLogo.vue'
import { CartBagIcon, ProfileUserIcon } from '@/components/shared/icons'
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
const store = useAuthStore()
const { isAuth } = storeToRefs(store)
</script>

<template>
  <header
    id="header"
    class="header fixed inset-x-0 top-0 z-10 flex flex-col justify-center"
  >
    <AppMarquee>3rd drop coming soon</AppMarquee>
    <div class="py-20">
      <AppContainer>
        <div class="flex items-center">
          <div class="header__logo grid items-center">
            <AppLogo></AppLogo>
          </div>
          <div class="mr-30 flex items-center gap-x-30">
            <template v-if="isAuth">
              <router-link to="/profile">
                <ProfileUserIcon class="pointer-events-none" />
              </router-link>
            </template>
            <template v-else>
              <RouterLink class="header__links" to="/login">Log In</RouterLink>
              <RouterLink class="header__links" to="/signup">
                Sign Up
              </RouterLink>
            </template>
          </div>
          <router-link to="/cart">
            <CartBagIcon lass="pointer-events-none" />
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

  &__links {
    color: #f6f5ff;
    font-size: 18px;
    font-weight: 600;
    line-height: normal;

    @apply uppercase;

    @media (max-width: 767px) {
      display: none;
    }
  }
}
</style>

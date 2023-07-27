<script lang="ts" setup>
import AppLogo from '@/components/shared/AppLogo.vue'
import AppMarquee from '@/components/features/AppMarquee.vue'
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
</script>

<template>
  <header id="header" class="header">
    <AppMarquee class="tw-mb-">3rd drop coming soon</AppMarquee>
    <div class="header__second">
      <AppContainer>
        <div class="tw-flex tw-items-center">
          <div class="tw-grid tw-items-center header__logo">
            <AppLogo></AppLogo>
          </div>
          <div class="tw-flex tw-items-center tw-gap-x-30 tw-mr-30">
            <RouterLink class="header__links" to="/login">LOG IN</RouterLink>
            <RouterLink class="header__links" to="/signup">SIGN UP</RouterLink>
          </div>
          <router-link to="/cart">
            <img src="@/assets/img/market.svg" alt="">
          </router-link>
        </div>
      </AppContainer>
    </div>
  </header>
</template>

<style lang="scss">
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;

  display: flex;
  justify-content: center;
  flex-direction: column;

  border-bottom: 1px solid rgba($color: #FFFFFF, $alpha: 0.1);
  // glassmorphism effect
  backdrop-filter: blur(3px);
  background-color: rgba(32, 32, 34, 0.3);
  box-shadow: 0 8px 32px 0 rgba(32, 32, 34, 0.2);

  &__second {
    padding: 20px 0;
  }

  @media (max-width: 767px) {
  }

  &__logo {
    width: 230px;
    margin-right: auto;
    transition: .2s all ease;

    @media (max-width: 767px) {
      height: 100%;
    }
  }

  &__links {
    color: #F6F5FF;
    font-size: 22px;
    font-weight: 600;
    line-height: normal;
    text-transform: uppercase;

    @media (max-width: 767px) {
      display: none;
    }
  }
}
</style>
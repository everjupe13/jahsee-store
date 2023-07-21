<script lang="ts" setup>
import AppLogo from '@/components/shared/AppLogo.vue'
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
    <AppContainer>
      <div class="tw-flex tw-items-center">
        <div class="tw-grid tw-items-center header__logo">
          <AppLogo></AppLogo>
        </div>
        <div class="tw-flex tw-items-center tw-gap-x-50 tw-mr-67">
          <RouterLink class="header__links" to="/login">LOG IN</RouterLink>
          <RouterLink class="header__links" to="/signup">SIGN UP</RouterLink>
        </div>
        <router-link to="/cart">
          <img src="@/assets/img/market.svg" alt="">
        </router-link>
      </div>
    </AppContainer>
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
  align-items: center;

  height: 150px;
  padding: 25px 0;
  padding-bottom: 60px;

  border-bottom: 2px solid #D9D9D9;

  background-color: #202022;

  &::after {
    content: '';

    position: absolute;
    bottom: 33px;
    left: 0;
    right: 0;

    display: block;

    height: 2px;
    background-color: #D9D9D9;
  }

  @media (max-width: 767px) {
    height: 105px;
    padding: 25px 0 50px;
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
    font-size: 24px;
    font-weight: 600;
    line-height: normal;
    text-transform: uppercase;

    @media (max-width: 767px) {
      display: none;
    }
  }
}
</style>
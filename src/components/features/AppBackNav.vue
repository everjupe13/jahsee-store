<script lang="ts" setup>
import { ChevronArrowBackIcon } from '@/components/icons'
import { useRouter } from 'vue-router'

const router = useRouter()
const handleBacknavClick = async () => {
  try {
    if (window.history.state.back) {
      return router.back()
    }
    return router.push('/')
  } catch (e) {}
}
</script>

<template>
  <button class="back-nav" @click="handleBacknavClick">
    <span class="back-nav__glass">
      <ChevronArrowBackIcon class="back-nav__icon" />
    </span>
    <span class="back-nav__text">Back</span>
  </button>
</template>

<style lang="scss" scoped>
.back-nav {
  display: flex;
  align-items: center;
  column-gap: 2px;

  width: max-content;

  cursor: pointer;

  &__glass {
    display: block;
    flex-shrink: 0;
  }

  &__text {
    flex-shrink: 0;
    display: block;

    color: #FFF;
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    text-transform: uppercase;
  }
}
</style>
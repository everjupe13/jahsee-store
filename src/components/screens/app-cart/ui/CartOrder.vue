<script lang="ts" setup>
import { computed } from 'vue'

import { CrossIcon, MinusIcon, PlusIcon } from '@/components/shared/icons'
import { formatDollars } from '@/utils/cost'

const props = defineProps({
  img: String,
  title: String,
  cost: Number,
  size: String,
  count: Number
})
const emit = defineEmits(['incrementCount', 'decrementCount', 'deleteItem'])

const computedCost = computed<string>(() =>
  formatDollars((props.count || 0) * (props.cost || 0))
)

const incCount = () => {
  emit('incrementCount')
}

const decCount = () => {
  emit('decrementCount')
}

const onDeleteItem = () => {
  emit('deleteItem')
}
</script>

<template>
  <div class="cart-order">
    <div class="cart-order__grid">
      <div class="cart-order__body">
        <div class="cart-order__glass">
          <img :src="props.img" alt="" class="cart-order__img" />
        </div>

        <div class="cart-order__info">
          <div class="cart-order__title mb-10">{{ props.title }}</div>
          <div class="cart-order__cost mb-5 md:mb-25">
            {{ computedCost }}
          </div>

          <div class="cart-order__count">
            <button @click="decCount">
              <div class="badge-hover h-16 w-16">
                <MinusIcon />
              </div>
            </button>
            <div class="cart-order__count-text">{{ props.count }}</div>
            <button @click="incCount">
              <div class="badge-hover h-16 w-16">
                <PlusIcon />
              </div>
            </button>
          </div>
        </div>
      </div>
      <div class="h-full">
        <div
          class="flex h-full items-end justify-center md:items-center md:justify-between"
        >
          <div class="cart-order__size">{{ props.size }}</div>
          <button
            class="cart-order__cancel badge-hover h-28 w-28"
            @click="onDeleteItem"
          >
            <CrossIcon />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cart-order {
  position: relative;

  display: flex;
  column-gap: 70px;

  width: 100%;
  padding: 20px;

  background-color: #ffffff;

  @include laptop-big {
    padding: 15px;
  }

  @media (max-width: 767px) {
    column-gap: 5px;
    padding: 10px 0;
  }

  &__grid {
    display: grid;
    grid-template-columns: calc(100% / 3 * 2) calc(100% / 3 * 1);
    align-items: center;

    width: 100%;

    @media (max-width: 767px) {
      grid-template-columns: calc(100% / 12 * 10) calc(100% / 12 * 2);
    }
  }

  &__body {
    display: flex;
    align-items: center;
    column-gap: 40px;

    @media (max-width: 767px) {
      column-gap: 10px;
    }
  }

  &__glass {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    width: 140px;
    height: 140px;
    overflow: hidden;

    @media (max-width: 767px) {
      width: 80px;
      height: 80px;
    }
  }

  &__img {
    @apply pointer-events-none block h-full w-full object-cover;
  }

  &__info {
    @apply flex flex-col justify-center;
  }

  &__title {
    @apply font-hnd text-[16px] font-extrabold uppercase leading-none tracking-[0.72px] text-button-black md:text-[18px];
  }

  &__cost {
    @apply text-[14px] font-medium uppercase leading-none tracking-[0.64px] text-button-black md:text-[16px];
  }

  &__count {
    @apply flex items-center gap-x-5;
  }

  &__count-text {
    @apply text-[14px] font-medium uppercase leading-none tracking-[0.64px] text-button-black md:text-[16px];
    @apply flex min-w-[25px] items-center justify-center;
  }

  &__size {
    @apply text-[14px] font-semibold uppercase leading-none text-button-black md:text-[16px];
  }

  &__cancel {
    @apply absolute right-0 top-15 z-[2] flex cursor-pointer items-center justify-center transition-all duration-300 md:relative md:top-0;

    &:hover {
      svg {
        fill: #fff;
      }
    }
    svg {
      fill: rgba(0, 0, 0, 0.5);
    }
  }
}
</style>

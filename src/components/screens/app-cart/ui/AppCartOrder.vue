<script lang="ts" setup>
import { CrossIcon, MinusIcon, PlusIcon } from '@/components/shared/icons'

const props = defineProps({
  img: String,
  title: String,
  cost: String,
  size: String,
  count: Number
})
const emit = defineEmits(['incrementCount', 'decrementCount'])

const incCount = () => {
  emit('incrementCount')
}

const decCount = () => {
  emit('decrementCount')
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
            {{ props.cost }}
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
      <div class="cart-order__controls h-full">
        <div
          class="flex h-full items-end justify-center md:items-center md:justify-between"
        >
          <div class="cart-order__size">{{ props.size }}</div>
          <div class="cart-order__cancel badge-hover h-28 w-28">
            <CrossIcon />
          </div>
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
      grid-template-columns: calc(100% / 12 * 11) calc(100% / 12 * 1);
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
    width: 140px;
    height: 140px;

    @media (max-width: 767px) {
      width: 80px;
      height: 80px;
    }
  }

  &__img {
    display: block;
    width: 100%;
    object-fit: fill;

    pointer-events: none;
  }

  &__info {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &__title {
    color: #000;
    font-size: 18px;
    font-style: normal;
    font-weight: 800;
    line-height: 100%;
    letter-spacing: 0.72px;
    text-transform: uppercase;

    @apply font-hnd;

    @media (max-width: 767px) {
      font-size: 16px;
    }
  }

  &__cost {
    color: #000;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    letter-spacing: 0.64px;
    text-transform: uppercase;

    @media (max-width: 767px) {
      font-size: 14px;
    }
  }

  &__count {
    display: flex;
    align-items: center;
    column-gap: 5px;
  }

  &__count-text {
    display: flex;
    justify-content: center;
    align-items: center;

    min-width: 25px;

    color: #000;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    letter-spacing: 0.64px;
    text-transform: uppercase;

    @media (max-width: 767px) {
      font-size: 14px;
    }
  }

  &__size {
    color: #000;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-transform: uppercase;

    @media (max-width: 767px) {
      // font-size: 18px;
    }
  }

  &__cancel {
    position: relative;
    z-index: 2;

    cursor: pointer;
    transition: 0.3s ease all;

    svg {
      fill: rgba(0, 0, 0, 0.5);
    }

    &:hover {
      svg {
        fill: #fff;
      }
    }

    @media (max-width: 767px) {
      position: absolute;
      top: 15px;
    }
  }
}
</style>

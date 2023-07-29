<script lang="ts" setup>
import { CrossIcon } from '@/components/icons';
import { ref } from 'vue'

const props = defineProps({
  img: String,
  title: String,
  cost: String,
  size: String
})

const count = ref(1)

const incCount = () => {
  count.value += 1
}

const decCount = () => {
  if (count.value > 1) {
    count.value -= 1
  }
}
</script>

<template>
  <div class="cart-order">
    <div class="cart-order__grid">
      <div class="cart-order__body">
        <div class="cart-order__glass">
          <img :src="props.img" alt="" class="cart-order__img">
        </div>

        <div class="cart-order__info">
          <div class="cart-order__title tw-mb-10">{{ props.title }}</div>
          <div class="cart-order__cost tw-mb-25">{{ props.cost }}</div>

          <div class="tw-flex tw-justify-between">
            <div class="cart-order__count">
              <button @click="decCount">
                <img src="@/assets/img/minus.svg" alt="">
              </button>
              <span>{{ count }}</span>
              <button @click="incCount">
                <img src="@/assets/img/plus.svg" alt="">
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="cart-order__controls">
        <div class="tw-flex tw-justify-between tw-items-center">
          <div class="cart-order__size">{{ props.size }}</div>
          <div class="badge-hover">
            <CrossIcon class="cart-order__cancel" />
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

  background-color: #FFFFFF;

  @media (max-width: 767px) {
    column-gap: 5px;
    padding: 20px;
    padding-left: 7px;
  }

  &__grid {
    display: grid;
    grid-template-columns: calc(100% / 3 * 2) calc(100% / 3 * 1);
    align-items: center;

    width: 100%;
  }

  &__body {
    display: flex;
    align-items: center;
    column-gap: 40px;
  }

  &__glass {
    flex-shrink: 0;
    width: 140px;
    height: 140px;
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
    font-family: 'Helvetica Now Display';
    font-size: 18px;
    font-style: normal;
    font-weight: 800;
    line-height: 100%;
    letter-spacing: 0.72px;
    text-transform: uppercase;

    @media (max-width: 767px) {
      // margin-bottom: 10px;
      // font-size: 22px;
    }
  }

  &__cost {
    color: #000;
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    letter-spacing: 0.64px;
    text-transform: uppercase;

    @media (max-width: 767px) {
      font-size: 20px;
    }
  }


  &__count {
    color: #000;
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    letter-spacing: 0.64px;
    text-transform: uppercase;

    display: flex;
    align-items: center;
    column-gap: 5px;

    @media (max-width: 767px) {
      font-size: 18px;
    }
  }

  &__size {
    color: #000;
    font-family: Montserrat;
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
    fill: rgba(0, 0, 0, .5);
    transition: .3s ease all;

    @media (max-width: 767px) {
      // width: 18px;
      // height: 18px;
    }
  }
}

.badge-hover {
  position: relative;
  cursor: pointer;

  &:after {
    content: '';

    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;

    display: block;

    width: 28px;
    height: 28px;
    border-radius: 100%;

    background-color: rgba(0, 0, 0, .0);

    transition: .3s all ease
  }

  &:hover {
    svg {
      fill: #fff
    }

    &:after {
      background-color: rgba(0, 0, 0, .9); 
    }
  }
}
</style>
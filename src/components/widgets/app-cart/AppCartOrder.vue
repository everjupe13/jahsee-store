<script lang="ts" setup>
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
    <img src="@/assets/img/cross.svg" alt="" class="cart-order__cancel">
    <div class="cart-order__glass">
      <img :src="props.img" alt="" class="cart-order__img">
    </div>
    <div class="cart-order__body">
      <div class="cart-order__name">{{ props.title }}</div>
      <div class="cart-order__cost">{{ props.cost }}</div>
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
    <div class="cart-order__size">{{ props.size }}</div>
  </div>
</template>

<style lang="scss" scoped>
.cart-order {
  position: relative;
  display: flex;
  column-gap: 70px;

  background-color: #FFFFFF;
  padding: 20px;

  @media (max-width: 767px) {
    column-gap: 5px;
    padding: 20px;
    padding-left: 7px;
  }

  &__glass {
    width: 140px;
    height: 140px;
  }

  &__img {
    display: block;
    width: 100%;
    object-fit: fill
  }

  &__body {
    padding-top: 40px;

    @media (max-width: 767px) {
      padding-top: 10px;
    }
  }

  &__cancel {
    position: absolute;
    top: 30px;
    right: 30px;
    
    cursor: pointer;

    @media (max-width: 767px) {
      top: 10px;
      right: 10px;

      width: 18px;
      height: 18px;
    }
  }

  &__name {
    margin-bottom: 40px;

    color: #000;
    font-family: Montserrat;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-transform: uppercase;

    @media (max-width: 767px) {
      margin-bottom: 10px;
      font-size: 22px;
    }
  }

  &__cost {
    margin-bottom: 40px;

    color: #202023;
    font-family: Montserrat;
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-transform: uppercase;

    @media (max-width: 767px) {
      margin-bottom: 20px;
      font-size: 20px;
    }
  }

  &__size {
    color: #000;
    font-family: Montserrat;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-transform: uppercase;

    @media (max-width: 767px) {
      font-size: 18px;
    }
  }

  &__count {
    color: #000;
    font-family: Montserrat;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-transform: uppercase;

    display: flex;
    align-items: center;
    column-gap: 5px;

    @media (max-width: 767px) {
      font-size: 18px;
    }
  }
}
</style>
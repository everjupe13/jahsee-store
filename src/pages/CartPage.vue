<script lang="ts" setup>
import { ref } from 'vue';


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
  <section class="cart">
    <AppContainer>
      <div class="cart__grid">
        <div class="cart__list">
          <div class="cart__header tw-pb-25">
            <div class="cart__title">MY BAG</div>
          </div>
          <div class="cart-order">
            <img src="@/assets/img/cross.svg" alt="" class="cart-order__cancel">
            <div class="cart-order__glass">
              <img src="@/assets/img/order1.png" alt="" class="cart-order__img">
            </div>
            <div class="cart-order__body">
              <div class="cart-order__name">iic x crypton - sweatshirt</div>
              <div class="cart-order__cost">80$</div>
              <div class="tw-flex tw-justify-between">
                <div class="cart-order__size">Size: M</div>
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
        </div>
        <div class="cart__info">
          <div class="cart__info-header">
            <div class="cart__info-title">TOTAL</div>
          </div>
          <div class="cart__info-body">
            <div class="cart__info-list">
              <div class="cart__info-list-item tw-flex  tw-justify-between">
                <div class="cart__info-list-text">Sub-total</div>
                <div class="cart__info-list-cost">205$</div>
              </div>
              <div class="cart__info-list-item tw-flex tw-justify-between">
                <div class="cart__info-list-text">Delivery</div>
                <div class="cart__info-list-cost">10$</div>
              </div>
              <div class="cart__info-list-item">
                <div class="cart__info-list-text tw-mb-30">Coupon Code</div>
                <div class="tw-flex tw-gap-x-15 tw-mb-25">
                  <AppInput class="!tw-bg-[#FFF]" />
                  <AppButton class="!tw-h-66 !tw-bg-[#D9D9D9] !tw-flex !tw-items-center !tw-px-21 !tw-py-10 !tw-text-[#202022] !tw-text-[18px]">Apply</AppButton>
                </div>
              </div>
              <div class="cart__info-radios tw-mb-25">
                  <label class="form-control">
                    <input type="radio" name="order-type">
                    <span>CDEK</span>
                  </label>
                  <label class="form-control">
                    <input type="radio" name="order-type">
                    <span>Russian Post</span>
                  </label>
                  <label class="form-control">
                    <input type="radio" name="order-type">
                    <span>International delivery and other</span>
                  </label>
                </div>
                <AppButton class="tw-w-full">Checkout</AppButton>
            </div>
          </div>
        </div>
      </div>
    </AppContainer>
  </section>
</template>

<style lang="scss" scoped>
.cart-order {
  position: relative;
  display: flex;
  column-gap: 70px;

  background-color: #FFFFFF;
  padding: 20px;

  &__body {
    padding-top: 40px;
  }

  &__cancel {
    position: absolute;
    top: 30px;
    right: 30px;
    
    cursor: pointer;
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
  }

  &__size {
    color: #000;
    font-family: Montserrat;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-transform: uppercase;
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
    column-gap: 5px;
  }
}

.cart {
  padding-top: 100px;
  padding-bottom: 180px;

  &__title {
    position: relative;
    font-family: 'Poppins';
    font-size: 96px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke: 2px #E1E1F1;
    color: #E1E1F1;
  }

  &__header {
    border-bottom: 2px solid #D9D9D9;
  }

  &__grid {
    display: grid;
    grid-template-columns: calc(100% - 560px - 70px) 560px;
    column-gap: 70px;
  }

  &__info {
    background-color: #fff;

    &-header {
      padding: 35px 50px 40px;
      border-bottom: 1px solid #969EAB;
    }

    &-body {
      padding: 50px 50px 60px;
    }

    &-title {
      color: #202022;
      font-family: Montserrat;
      font-size: 32px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      text-transform: uppercase;
    }

    &-list-item {
      margin-bottom: 40px;
    }

    &-list-text {
      color: #202022;
      font-family: Montserrat;
      font-size: 24px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      text-transform: uppercase;
    }

    &-list-cost {
      color: #000;
      font-family: Montserrat;
      font-size: 24px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      text-transform: uppercase;
    }

    &-radios {
      display: flex;
      flex-direction: column;

      row-gap: 15px;
    }
  }
}

input[type="radio"] {
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
  margin: 0;

  font: inherit;
  color: #202022;
  width: 20px;
  height: 20px;
  border: 2px solid #202022;
  border-radius: 50%;

  transform: translateY(-1px);

  display: grid;
  place-content: center;
}

input[type="radio"]::before {
  content: "";
  width: 0.65em;
  height: 0.65em;
  border-radius: 50%;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  box-shadow: inset 1em 1em #202022;
}

input[type="radio"]:checked::before {
  transform: scale(1);
}

.form-control {
  color: #000;
  font-family: Montserrat;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-transform: uppercase;

  display: grid;
  align-items: center;
  grid-template-columns: 1em auto;
  gap: 0.5em;
}
</style>
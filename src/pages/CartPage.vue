<script lang="ts" setup>
import { reactive } from 'vue'

import AppBackNav from '@/components/features/AppBackNav.vue'
import {
  AppRadio,
  AppRadiosFieldset
} from '@/components/features/AppRadiosFieldset.vue'
import { AppCartOrder } from '@/components/screens/app-cart'

const cartImg = new URL('@/assets/img/order1.png', import.meta.url).href

const handleUpdateRadios = (_e: InputEvent) => {
  // TODO not todo just additional hook for radios change
  // console.log(radiosModel)
}
const radiosModel = reactive([true, false, false])
const handleRadiosClick = (index: number) => {
  if (radiosModel[index]) {
    return
  }

  radiosModel[index] = true
  for (let i = 0; i < radiosModel.length; i++) {
    if (i !== index) {
      radiosModel[i] = false
    }
  }
}
</script>

<template>
  <section class="cart">
    <AppContainer>
      <AppBackNav />
      <div class="cart__header tw-my-20 md:tw-my-40">
        <div class="outlined-text cart__title" style="--stroke-width: 2px">
          My bag
        </div>
      </div>
      <div class="cart__grid">
        <div class="cart__table">
          <div class="cart__table-header">
            <div class="cart__table-heading">Product</div>
            <div class="cart__table-heading">Size</div>
          </div>

          <AppCartOrder
            :img="cartImg"
            :title="'iic x crypton - sweatshirt'"
            :cost="'$80.00'"
            :size="'XL'"
          ></AppCartOrder>

          <AppCartOrder
            :img="cartImg"
            :title="'iic x crypton - sweatshirt'"
            :cost="'$80.00'"
            :size="'L'"
          ></AppCartOrder>
        </div>
        <div class="cart__schema">
          <form @submit.prevent class="cart__schema-form">
            <div class="cart__schema-item-border cart__schema-header">
              <p class="cart__heading">TOTAL</p>
            </div>

            <div class="cart__schema-body">
              <div class="cart__schema-list">
                <div
                  class="cart__schema-item-border tw-flex tw-items-center tw-justify-between tw-py-20 md:tw-py-25"
                >
                  <p class="cart__subheading">Sub-total</p>
                  <div class="cart__heading">$285.00</div>
                </div>

                <div
                  class="tw-flex tw-items-center tw-justify-between tw-py-20 md:tw-py-25"
                >
                  <p class="cart__subheading">Delivery</p>
                  <div class="cart__heading">$10.00</div>
                </div>
              </div>

              <AppRadiosFieldset class="tw-mb-25" @update="handleUpdateRadios">
                <AppRadio
                  :value="radiosModel[0]"
                  @input="handleRadiosClick(0)"
                  class="tw-mb-15"
                >
                  CDEK
                </AppRadio>
                <AppRadio
                  :value="radiosModel[1]"
                  @input="handleRadiosClick(1)"
                  class="tw-mb-15"
                >
                  Russian Post
                </AppRadio>
                <AppRadio :value="radiosModel[2]" @input="handleRadiosClick(2)">
                  International delivery and other
                </AppRadio>
              </AppRadiosFieldset>

              <div class="cart__schema-input-field">
                <fieldset class="tw-block tw-h-full tw-w-full">
                  <div class="tw-flex tw-items-center">
                    <AppInput
                      class="cart__schema-input"
                      placeholder="Coupon Code"
                    />
                    <AppButton type="button" class="cart__schema-input-btn">
                      Apply
                    </AppButton>
                  </div>
                </fieldset>
              </div>

              <div class="cart__schema-footer">
                <AppButton class="cart__schema-submit tw-w-full">
                  Checkout
                </AppButton>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AppContainer>
  </section>
</template>

<style lang="scss" scoped>
.cart {
  padding-top: 40px;
  padding-bottom: 40px;

  @media (max-width: 767px) {
    padding-top: 30px;
    padding-bottom: 40px;
  }

  &__title {
    position: relative;

    font-size: 64px;
    font-style: normal;
    font-weight: 800;
    line-height: 100%;
    letter-spacing: 2.56px;
    text-transform: uppercase;

    @media (max-width: 767px) {
      font-size: 48px;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: calc(100% - 440px) 440px;

    @media (max-width: 991px) {
      grid-template-columns: 100%;
      // row-gap: 20px;
    }
  }

  &__table {
    padding: 40px;
    background: #fff;

    @media (max-width: 767px) {
      padding: 30px;
    }
  }

  &__table-header {
    display: grid;
    grid-template-columns: calc(100% / 3 * 2) calc(100% / 3 * 1);
    align-items: center;

    padding-bottom: 25px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    @media (max-width: 767px) {
      grid-template-columns: calc(100% / 12 * 11) calc(100% / 12 * 1);
      padding-bottom: 15px;
    }
  }

  &__table-heading {
    color: #848a99;
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 100%;
    text-transform: uppercase;
  }

  &__heading,
  &__subheading {
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 100%;
    text-transform: uppercase;
  }

  &__heading {
    color: #000;
  }

  &__subheading {
    color: #848a99;
    text-transform: none;
  }

  &__schema {
    background-color: #e8e8e9;
  }

  &__schema-form {
    padding: 40px;

    @media (max-width: 767px) {
      padding: 30px;
    }
  }

  &__schema-item-border {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  &__schema-header {
    padding-bottom: 25px;

    @media (max-width: 767px) {
      padding-bottom: 20px;
    }
  }

  &__schema-input-field {
    padding: 10px;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }

  &__schema-input {
    flex-grow: 1;

    width: 100%;
    height: 100%;
    padding: 0;
    border: 0;
    padding-left: 15px;

    background-color: transparent;
  }

  &__schema-input-btn {
    padding: 12px;

    background-color: rgba(0, 0, 0, 0.2);

    color: #fff;
    font-family: 'Helvetica Now Display';
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 100%;
    text-transform: uppercase;
  }

  &__schema-submit {
    color: #fff;
    font-family: 'Helvetica Now Display';
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 100%;
    text-transform: uppercase;
  }

  &__schema-footer {
    margin-top: 150px;

    @media (max-width: 767px) {
      margin-top: 20px;
    }
  }
}
</style>
@/components/screens/app-cart

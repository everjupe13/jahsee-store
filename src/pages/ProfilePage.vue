<script lang="ts" setup>
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

// import { Navigation } from 'swiper/modules'
// import { Swiper, SwiperSlide } from 'swiper/vue'
// import { ref } from 'vue'
import AppBackNav from '@/components/features/AppBackNav.vue'
import {
  // AppProfileAddress,
  AppProfileInfo
  // AppProfileOrders
} from '@/components/screens/app-profile'
// import AppCollapse from '@/components/shared/AppCollapse.vue'

// const modules = [Navigation]

// const detailsOpened = ref(false)
// const toggleDetailsOpened = () => {
//   detailsOpened.value = !detailsOpened.value
// }

// const ZIP_DATA = {
//   title: 'ZIP HOODIE',
//   desc: 'Oversize Zip Hoodie that provides lightness, comfort and a sense of individual style that hardly anyone can comprehend.',
//   cost: '$125',
//   list: [
//     'Fabric density - 360gr/m',
//     '80% cotton',
//     '20% polyester',
//     'Chest - embroidery',
//     'Hood - Puff',
//     'Back - silkscreen'
//   ],
//   gallery: [
//     new URL('@/assets/img/drop-zip-hoodie/1.png', import.meta.url).href,
//     new URL('@/assets/img/drop-zip-hoodie/2.png', import.meta.url).href,
//     new URL('@/assets/img/drop-zip-hoodie/3.png', import.meta.url).href,
//     new URL('@/assets/img/drop-zip-hoodie/4.png', import.meta.url).href,
//     new URL('@/assets/img/drop-zip-hoodie/5.png', import.meta.url).href
//   ]
// }

// const SWEAT_DATA = {
//   title: 'SWEATSHIRT',
//   desc: 'A perfectly shaped limited edition oversized sweatshirt with excellent quality and name tags that will fit almost any look.',
//   cost: '$80',
//   list: [
//     'Fabric density - 360gr/m',
//     '80% cotton',
//     '20% polyester',
//     'Chest - embroidery',
//     'Branded patch that tells you the bear market is about to end',
//     'Tag that allows you to choose your individual nickname printed on it'
//   ],
//   gallery: [
//     new URL('@/assets/img/drop-sweat/1.png', import.meta.url).href,
//     new URL('@/assets/img/drop-sweat/2.png', import.meta.url).href,
//     new URL('@/assets/img/drop-sweat/3.png', import.meta.url).href,
//     new URL('@/assets/img/drop-sweat/4.png', import.meta.url).href
//   ]
// }

// const CURRENT_DATA = [ZIP_DATA, SWEAT_DATA]

// const tabs = [
//   {
//     name: 'profile',
//     label: 'My profile'
//   },
//   {
//     name: 'address',
//     label: 'Address book'
//   },
//   {
//     name: 'orders',
//     label: 'My orders'
//   },
//   {
//     name: 'logout',
//     label: 'logout'
//   }
// ]
// const activeTab = ref(tabs[0].name)
// const setActvieTab = (name: string) => {
//   if (activeTab.value === name) {
//     return
//   }

//   activeTab.value = name
// }

// const isPasswordEditable = ref(false)
</script>

<template>
  <section class="py-40">
    <AppContainer>
      <AppBackNav />
      <div class="my-20 md:my-40">
        <h1 class="outlined-text title font-hnd" style="--stroke-width: 2px">
          My account
        </h1>
      </div>
      <div class="cart-grid">
        <div class="bg-gray px-50 py-40">
          <nav>
            <ul class="flex flex-col gap-y-24">
              <li>
                <button class="nav-link font-hbd transition-colors">
                  My profile
                </button>
              </li>
              <li>
                <button class="nav-link font-hbd transition-colors">
                  Address book
                </button>
              </li>
              <li>
                <button class="nav-link font-hbd transition-colors">
                  My orders
                </button>
              </li>
              <li>
                <button class="nav-link font-hbd transition-colors">
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>

        <div class="min-h-[600px] bg-white p-40">
          <AppProfileInfo class="max-w-[640px]" />
          <!-- <div class="main__tabs-list">
            <div
              v-for="tab in tabs"
              :class="[
                'main__tabs-list-item',
                { '--active': tab.name === activeTab }
              ]"
              @click="setActvieTab(tab.name)"
              :key="tab.name"
            >
              {{ tab.label }}
            </div>
          </div>
          <div class="main__field">
            <template v-if="activeTab === tabs[0].name">
              <div>
                <div class="main__label">Information</div>
                <div class="main__tabs-grid">
                  <div
                    data-aos="fade-down"
                    data-aos-delay="50"
                    class="main__tabs-box"
                  >
                    <div class="main__tabs-box-label">first name</div>
                    <div class="main__tabs-box-content">first name</div>
                  </div>
                  <div
                    data-aos="fade-down"
                    data-aos-delay="100"
                    class="main__tabs-box"
                  >
                    <div class="main__tabs-box-label">last name</div>
                    <div class="main__tabs-box-content">last name</div>
                  </div>
                  <div
                    data-aos="fade-down"
                    data-aos-delay="150"
                    class="main__tabs-box"
                  >
                    <div class="main__tabs-box-label">EMAIL</div>
                    <div class="main__tabs-box-content">EMAIL</div>
                  </div>
                  <div
                    data-aos="fade-down"
                    data-aos-delay="200"
                    class="main__tabs-box"
                  >
                    <div class="main__tabs-box-label">PHONE NUMBER</div>
                    <div class="main__tabs-box-content">PHONE NUMBER</div>
                  </div>
                  <div
                    data-aos="fade-down"
                    data-aos-delay="250"
                    class="main__tabs-box"
                  >
                    <div class="main__tabs-box-label">PASSWORD</div>
                    <div
                      :contenteditable="isPasswordEditable"
                      class="main__tabs-box-content"
                    >
                      PASSWORD
                    </div>
                    <img
                      src="@/assets/img/edit-icon.svg"
                      alt=""
                      class="main__tabs-box-edit"
                      @click="isPasswordEditable = !isPasswordEditable"
                    />
                  </div>
                  <div
                    data-aos="fade-down"
                    data-aos-delay="300"
                    class="main__tabs-box flex items-end justify-end"
                  >
                    <AppButton
                      @click="$router.push('/profile/edit')"
                      class="h-70"
                    >
                      EDIT
                    </AppButton>
                  </div>
                </div>
              </div>
            </template>

            <template v-if="activeTab === tabs[1].name">
              <div>
                <div
                  data-aos="fade-down"
                  data-aos-delay="100"
                  class="history-order"
                >
                  <div class="history-order__label">№1234567</div>
                  <div class="history-order__body">
                    <div
                      class="history-order__field history-order__field_slider !max-w-[285px] px-10"
                    >
                      <div class="history-order__glass">
                        <swiper
                          :style="{
                            '--swiper-navigation-color': '#969EAB',
                            '--swiper-pagination-color': '#969EAB'
                          }"
                          :space-between="10"
                          :navigation="true"
                          :modules="modules"
                          class="drop-gallery"
                        >
                          <swiper-slide
                            v-for="(item, index) in CURRENT_DATA[1].gallery"
                            :key="index"
                          >
                            <div class="history-order__item">
                              <img :src="item" />
                            </div>
                          </swiper-slide>
                        </swiper>
                      </div>
                    </div>

                    <div class="history-order__field">
                      <div class="history-order__cost">205$</div>
                    </div>

                    <div class="history-order__field">
                      <div
                        class="history-order__text flex cursor-pointer select-none items-center gap-x-4"
                        @click="toggleDetailsOpened"
                      >
                        <span>Track</span>
                        <span
                          class="transition"
                          :style="{
                            transform: detailsOpened
                              ? 'rotate(90deg)'
                              : 'rotate(0deg)'
                          }"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="9"
                            height="13"
                            viewBox="0 0 9 13"
                            fill="none"
                          >
                            <path
                              d="M1.82129 11.8574L7.17843 6.50021L1.82129 1.14307"
                              stroke="black"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </span>
                      </div>
                      <AppCollapse v-model="detailsOpened">
                        <div class="history-order__text !font-normal">
                          1329841455
                        </div>
                      </AppCollapse>
                      <div class="history-order__text mt-10">REPURCHASE</div>
                    </div>

                    <div class="history-order__field">
                      <div class="history-order__text">Delivered</div>

                      <span class="history-order__delete">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="28"
                          height="28"
                          viewBox="0 0 28 28"
                          fill="none"
                        >
                          <path
                            d="M5 8H7H23"
                            stroke="black"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M10 8V6C10 5.46957 10.2107 4.96086 10.5858 4.58579C10.9609 4.21071 11.4696 4 12 4H16C16.5304 4 17.0391 4.21071 17.4142 4.58579C17.7893 4.96086 18 5.46957 18 6V8M21 8V22C21 22.5304 20.7893 23.0391 20.4142 23.4142C20.0391 23.7893 19.5304 24 19 24H9C8.46957 24 7.96086 23.7893 7.58579 23.4142C7.21071 23.0391 7 22.5304 7 22V8H21Z"
                            stroke="black"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M12 13V19"
                            stroke="black"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M16 13V19"
                            stroke="black"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div> -->
        </div>
      </div>
    </AppContainer>
  </section>
</template>

<style lang="scss" scoped>
.title {
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

.cart-grid {
  display: grid;
  grid-template-columns: 440px calc(100% - 440px);
}

.nav-link {
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  text-transform: uppercase;
  color: #848a99;

  &.--active {
    color: #000;
  }
}

.profile {
  &__tabs-list {
    display: flex;
    align-items: center;
    column-gap: 50px;

    @media (max-width: 767px) {
      column-gap: 30px;
    }
  }

  &__tabs-list-item {
    color: #969eab;
    font-family: Montserrat;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-transform: uppercase;

    transition: 0.2s all ease;
    cursor: default;

    &.--active {
      color: #fff;
    }

    @media (max-width: 767px) {
      font-size: 24px;
    }
  }

  &__label {
    margin-bottom: 40px;

    color: #969eab;
    font-family: Montserrat;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-transform: uppercase;

    @media (max-width: 767px) {
      font-size: 20px;
      margin-bottom: 20px;
    }
  }

  &__tabs-grid {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    row-gap: 50px;

    @media (max-width: 767px) {
      row-gap: 20px;
    }
  }

  &__tabs-box {
    position: relative;
    width: calc(50% - 60px);

    @media (max-width: 767px) {
      width: 100%;
    }
  }

  &__tabs-box-label {
    margin-bottom: 25px;

    color: #969eab;
    font-family: Montserrat;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-transform: uppercase;

    @media (max-width: 767px) {
      font-size: 16px;
      margin-bottom: 10px;
    }
  }

  &__tabs-box-content {
    position: relative;

    padding: 23px 40px;
    border: 1px solid #fff;

    color: #969eab;
    font-family: Montserrat;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-transform: uppercase;

    @media (max-width: 767px) {
      padding: 18px 30px;
      font-size: 16px;
    }
  }

  &__tabs-box-edit {
    position: absolute;
    right: -55px;
    bottom: 16px;

    cursor: pointer;
    user-select: none;

    @media (max-width: 767px) {
      right: 20px;
      bottom: 10px;
    }
  }

  &__field {
    padding-top: 60px;
    @media (max-width: 767px) {
      padding-top: 30px;
    }
  }

  &__grid {
    padding-top: 60px;

    display: flex;
    column-gap: 50px;

    @media (max-width: 767px) {
      padding-top: 30px;
      row-gap: 20px;
      display: block;
    }
  }

  &__header {
    position: relative;

    flex-basis: 135px;
    flex-grow: 0;
    flex-shrink: 0;

    width: 135px;

    @media (max-width: 767px) {
      width: 100%;
    }
  }

  &__header-wrapper {
    position: absolute;
    top: 0;
    left: 0;

    display: flex;
    flex-direction: column;
    align-items: center;

    width: max-content;
    padding-bottom: 5px;
    border-bottom: 2px solid #d9d9d9;

    transform: rotate(-90deg) translateX(-100%);
    transform-origin: top left;

    @media (max-width: 767px) {
      position: static;
      transform: none;

      width: 100%;
    }
  }

  &__title {
    font-size: 96px;
    font-style: normal;
    font-weight: 700;
    line-height: 1;
    text-transform: uppercase;

    @media (max-width: 767px) {
      font-size: 48px;
    }
  }
}

.history-order {
  &__label {
    margin-bottom: 13px;

    color: #969eab;
    font-family: Montserrat;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-transform: uppercase;
  }

  &__body {
    display: flex;

    @media (max-width: 767px) {
      flex-wrap: wrap;
    }
  }

  &__glass {
    width: 185px;
    height: 185px;
    background: #fff;

    @media (max-width: 767px) {
      width: 100%;
      height: 290px;
    }
  }

  &__item {
    width: 185px;
    height: 185px;

    @media (max-width: 767px) {
      width: 100%;
      height: 290px;
    }
  }

  &__field {
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    flex-shrink: 0;
    width: 100%;
    height: 200px;
    max-width: 220px;
    border-left: 2px solid #969eab;
    background: #fff;

    @media (max-width: 767px) {
      border-left: 0;
      border-top: 2px solid #969eab;
      max-width: 100% !important;
      height: 120px;
    }

    &_slider {
      @media (max-width: 767px) {
        height: 300px;
      }
    }
  }

  &__delete {
    position: absolute;
    top: 5px;
    right: 5px;

    cursor: pointer;
  }

  &__cost {
    color: #202023;
    font-family: Montserrat;
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-transform: uppercase;
  }

  &__text {
    color: #000;
    font-family: Montserrat;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-transform: uppercase;
  }
}
</style>

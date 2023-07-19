<script lang="ts" setup>
import AppDropdown from '@/components/shared/AppDropdown.vue'
import AppList from '@/components/shared/AppList.vue'
import AppInput from '@/components/shared/AppInput.vue'
import AppBreadcrumbs from '@/components/features/AppBreadcrumbs.vue'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'

import { reactive, ref } from 'vue'

const tourInfo = reactive([
  true,
  false,
  false,
  false
])

const dateInfo = reactive([
  {
    label: '6-16 июля',
    value: false
  },
  {
    label: '8-12 августа',
    value: false
  },
  {
    label: '24-28 сентября',
    value: false
  },
])

const handleTourInfoChange = (index: number) => {
  if (tourInfo[index]) {
    return
  }

  for (let i = 0; i < tourInfo.length; i++) {
    if (i === index) {
      continue
    }
    tourInfo[i] = false
  }

  tourInfo[index] = true
}

const handleDateChange = (index: number) => {
  if (dateInfo[index].value) {
    return
  }

  for (let i = 0; i < dateInfo.length; i++) {
    if (i === index) {
      continue
    }
    dateInfo[i].value = false
  }

  dateInfo[index].value = true
}

const nameInput = ref('Виктор')
const phoneInput = ref('+7 (900) 900 90-90')
const countInput = ref('1 взрослый')
const dateInput = ref('6-16 июля')

</script>

<template>
  <AppContainer class="tw-flex tw-items-center tw-justify-between tw-mt-20 md:tw-mt-0 md:tw-block">
    <AppBreadcrumbs class="md:tw-pt-24" :crumbs="[{ label: 'Туры' }]" />

    <div class="md:tw-mt-24">
      <button class="tour-back-button"  @click="$router.replace('/')">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
          <path d="M9 3.5L5.35355 7.14645C5.15829 7.34171 5.15829 7.65829 5.35355 7.85355L9 11.5" stroke="#0B2630" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        <span>Назад</span>
      </button>
    </div>
  </AppContainer>
  <section class="tour">
    <AppContainer>
      <div class="tour__grid">
        <div class="tour__content-wrapper">
          <div class="tour__content-box tour__content-box_full">
            <swiper
              :modules="[ Pagination ]"
              :pagination="{ clickable: true }"
              :space-between="50"
            >
              <swiper-slide>
                <div class="tour__content-swiper-item">
                  <img src="@/assets/img/tour/poster.png" alt="" class="tour__content-swiper-img">
                </div>
              </swiper-slide>
              <swiper-slide>
                <div class="tour__content-swiper-item">
                  <img src="@/assets/img/tour/poster.png" alt="" class="tour__content-swiper-img">
                </div>
              </swiper-slide>
              <swiper-slide>
                <div class="tour__content-swiper-item">
                  <img src="@/assets/img/tour/poster.png" alt="" class="tour__content-swiper-img">
                </div>
              </swiper-slide>
              <swiper-slide>
                <div class="tour__content-swiper-item">
                  <img src="@/assets/img/tour/poster.png" alt="" class="tour__content-swiper-img">
                </div>
              </swiper-slide>
              <swiper-slide>
                <div class="tour__content-swiper-item">
                  <img src="@/assets/img/tour/poster.png" alt="" class="tour__content-swiper-img">
                </div>
              </swiper-slide>
              <swiper-slide>
                <div class="tour__content-swiper-item">
                  <img src="@/assets/img/tour/poster.png" alt="" class="tour__content-swiper-img">
                </div>
              </swiper-slide>
            </swiper>
          </div>

          <div class="tour__content-box">
            <div class="tour__content-header tw-flex tw-flex-wrap md:tw-flex-nowrap tw-gap-8">
              <!-- <h3 class="tour__content-title">Что включено в тур</h3>  -->
              <AppButton 
                size="md" 
                theme="black"
                :class="['--checkbox', { '--checked': tourInfo[0] }]" 
                @click="() => handleTourInfoChange(0)"
              >Описание</AppButton>
              <AppButton 
                size="md" 
                theme="black"
                :class="['--checkbox', { '--checked': tourInfo[1] }]" 
                @click="() => handleTourInfoChange(1)"
              >План на день</AppButton>
              <AppButton 
                size="md" 
                theme="black"
                :class="['--checkbox', { '--checked': tourInfo[2] }]" 
                @click="() => handleTourInfoChange(2)"
              >Что включено в тур</AppButton>
              <AppButton 
                size="md" 
                theme="black"
                :class="['--checkbox', { '--checked': tourInfo[3] }]" 
                @click="() => handleTourInfoChange(3)"
              >Маршрут тура</AppButton>
            </div>
            <div class="tour__content-body">
              <div class="tour__content-body-field">
                <p class="tour__content-text">
                  Lorem ipsum dolor sit amet consectetur. Morbi et elementum lacinia convallis id platea ornare. Turpis diam turpis massa at ultrices orci faucibus. Sed sollicitudin diam vitae urna quis interdum lobortis non. Auctor sit tellus arcu lacinia feugiat diam.
                </p>
              </div>
              <div class="tour__content-body-field">
                <AppList
                  :items="[
                    { label: 'Проживание, обед, и прочие расходы включены в стоимость тура.' },
                    { label: 'Dignissim cras nisi massa aliquam libero ut nulla.' },
                    { label: 'Blandit fames tempus nibh vel lacinia nulla. Quam morbi pharetra.' }
                  ]"
                ></AppList>
              </div>
            </div>
          </div>
          
          <div class="tour__content-box">
            <div class="tour__content-header">
              <h3 class="tour__content-title">План на день</h3>
            </div>
            <div class="tour__content-body !tw-py-0">
              <AppDropdown
                :dropdown-data="[
                  {
                    label: '<span>День 1 - </span>Прогулка по горам',
                    body: 'Как и в любом другом регионе, безопасность в Дагестане может зависеть от разных факторов. Хотя в Дагестане происходят инциденты, связанные с насилием и терроризмом, большинство туристов и посетителей обычно не сталкиваются с проблемами, особенно если соблюдать базовые меры предосторожности.<br><br> Если вы планируете посетить Дагестан, рекомендуется следовать рекомендациям и указаниям местных властей, а также обратиться за информацией в консульство или посольство своей страны для получения актуальных сведений о безопасности.',
                    opened: false
                  },
                  {
                    label: '<span>День 2 - </span>Знакомство с местной фауной',
                    body: 'Как и в любом другом регионе, безопасность в Дагестане может зависеть от разных факторов. Хотя в Дагестане происходят инциденты, связанные с насилием и терроризмом, большинство туристов и посетителей обычно не сталкиваются с проблемами, особенно если соблюдать базовые меры предосторожности.<br><br> Если вы планируете посетить Дагестан, рекомендуется следовать рекомендациям и указаниям местных властей, а также обратиться за информацией в консульство или посольство своей страны для получения актуальных сведений о безопасности.',
                    opened: false
                  },
                  {
                    label: '<span>День 3 - </span>Поход в мечеть',
                    body: 'Как и в любом другом регионе, безопасность в Дагестане может зависеть от разных факторов. Хотя в Дагестане происходят инциденты, связанные с насилием и терроризмом, большинство туристов и посетителей обычно не сталкиваются с проблемами, особенно если соблюдать базовые меры предосторожности.<br><br> Если вы планируете посетить Дагестан, рекомендуется следовать рекомендациям и указаниям местных властей, а также обратиться за информацией в консульство или посольство своей страны для получения актуальных сведений о безопасности.',
                    opened: false
                  },
                  {
                    label: '<span>День 4 - </span>Шашлык на природе',
                    body: 'Как и в любом другом регионе, безопасность в Дагестане может зависеть от разных факторов. Хотя в Дагестане происходят инциденты, связанные с насилием и терроризмом, большинство туристов и посетителей обычно не сталкиваются с проблемами, особенно если соблюдать базовые меры предосторожности.<br><br> Если вы планируете посетить Дагестан, рекомендуется следовать рекомендациям и указаниям местных властей, а также обратиться за информацией в консульство или посольство своей страны для получения актуальных сведений о безопасности.',
                    opened: false
                  },
                  {
                    label: '<span>День 5 - </span>Отдых у озера “Татлыk”',
                    body: 'Как и в любом другом регионе, безопасность в Дагестане может зависеть от разных факторов. Хотя в Дагестане происходят инциденты, связанные с насилием и терроризмом, большинство туристов и посетителей обычно не сталкиваются с проблемами, особенно если соблюдать базовые меры предосторожности.<br><br> Если вы планируете посетить Дагестан, рекомендуется следовать рекомендациям и указаниям местных властей, а также обратиться за информацией в консульство или посольство своей страны для получения актуальных сведений о безопасности.',
                    opened: false
                  },
                ]"
              ></AppDropdown>
            </div>
          </div>

          <div class="tour__content-box">
            <div class="tour__content-header">
              <h3 class="tour__content-title">Маршрут тура</h3> 
            </div>
            <div class="tour__content-body">
              <div class="tour__content-body-field">
                <div class="tour__content-glass">
                  <img src="@/assets/img/map.png" alt="" class="tour__content-glass-img">
                </div>
              </div>
            </div>
          </div>

          <div class="tour__content-box">
            <div class="tour__content-header">
              <h3 class="tour__content-title">Что включено в тур</h3> 
            </div>
            <div class="tour__content-body">
              <div class="tour__content-body-field">
                <p class="tour__content-text">
                  Lorem ipsum dolor sit amet consectetur. Morbi et elementum lacinia convallis id platea ornare. Turpis diam turpis massa at ultrices orci faucibus. Sed sollicitudin diam vitae urna quis interdum lobortis non. Auctor sit tellus arcu lacinia feugiat diam.
                  <br><br>
                  Magna cras rhoncus nisi lorem semper id. Semper enim elit sit elementum. Porttitor sed erat habitant montes viverra orci orci tristique porttitor. Nam lectus sapien ut sed id duis mauris. Nibh lorem commodo eget in. Feugiat risus in tincidunt fusce quisque. Varius proin arcu et risus urna felis nunc.
                </p>
              </div>
              <div class="tour__content-body-field">
                <AppList
                  :items="[
                    { label: 'Lorem ipsum dolor sit amet consectetur. At et viverra lacinia faucibus. Commodo iaculis erat aliquam' },
                    { label: 'Lorem ipsum dolor sit amet consectetur. Egestas vulputate at vel fringilla a. Mauris integer at leo auctor massa tristique suspendisse. Bibendum fames vitae morbi at sem malesuada arcu. Urna aliquam facilisi hendrerit at sit purus quam arcu elementum.' }
                  ]"
                ></AppList>
              </div>
            </div>
          </div>
        </div>
        <div class="tour__controls">
          <div class="tour__header tw-mb-40">
            <h1 class="tour__title tw-mb-25">5 жарких дней и ночей в пушистых горах</h1>

            <div class="tour__badges tw-flex tw-gap-x-24">
              <div class="tour__badge tw-flex tw-items-center tw-gap-x-4">
                <div class="tour__badge-glass">
                  <img src="@/assets/img/tour/star-icon.svg" alt="" class="tour__badge-icon">
                </div>
                <div class="tour__badge-text">4.8 <span class="tour__badge-text_weak">(483 оценок)</span></div>
              </div>
              <div class="tour__badge tw-flex tw-items-center tw-gap-x-4">
                <div class="tour__badge-glass">
                  <img src="@/assets/img/tour/map-pin-icon.svg" alt="" class="tour__badge-icon">
                </div>
                <div class="tour__badge-text">Дербент</div>
              </div>
              <div class="tour__badge tw-flex tw-items-center tw-gap-x-4">
                <div class="tour__badge-glass">
                  <img src="@/assets/img/tour/clock-icon.svg" alt="" class="tour__badge-icon">
                </div>
                <div class="tour__badge-text">5 дней</div>
              </div>
            </div>
          </div>
          <div class="tour__form">
            <div class="tour__form-header tw-mb-25">
              <div class="tour__form-cost tw-mb-18">
                <span class="tour__form-cost__total">16 000 ₽</span> /чел
              </div>
              <p class="tw-mb-14">Ближайшие туры:</p>

              <div class="tour__form-dates tw-flex tw-gap-x-8">
                <template v-for="(date, idx) in dateInfo">
                  <AppButton 
                    size="sm" 
                    theme="black"
                    :class="['!tw-py-10 !tw-px-12', '--checkbox', { '--checked': date.value }]" 
                    @click="() => handleDateChange(idx)"
                  >{{ date.label }}</AppButton>
                </template>
              </div>
            </div>
            
            <AppInput v-model="nameInput" label="Ваше имя" class="tw-mb-12" />
            <AppInput v-model="phoneInput" label="Телефон" class="tw-mb-12" />
            <AppInput v-model="countInput" label="Кол-во взрослых / детей" class="tw-mb-12" />
            <AppInput v-model="dateInput" label="Выберите дату" class="tw-mb-24" />

            <AppButton>Забронировать место</AppButton>
          </div>
        </div>
      </div>
    </AppContainer>
  </section>

  <section class="faq">
    <AppContainer>
      <h2 class="title-main tw-mb-20 md:tw-mb-40"><span class="tw-text-green">Ответы</span> на вопросы</h2>

      <AppDropdown 
        :dropdown-data="[
          {
            label: 'Насколько опасно приезжать в Дагестан?',
            body: 'Как и в любом другом регионе, безопасность в Дагестане может зависеть от разных факторов. Хотя в Дагестане происходят инциденты, связанные с насилием и терроризмом, большинство туристов и посетителей обычно не сталкиваются с проблемами, особенно если соблюдать базовые меры предосторожности.<br><br> Если вы планируете посетить Дагестан, рекомендуется следовать рекомендациям и указаниям местных властей, а также обратиться за информацией в консульство или посольство своей страны для получения актуальных сведений о безопасности.',
            opened: false
          },
          {
            label: 'Как одеваться приезжая в Дагестан?',
            body: 'Как и в любом другом регионе, безопасность в Дагестане может зависеть от разных факторов. Хотя в Дагестане происходят инциденты, связанные с насилием и терроризмом, большинство туристов и посетителей обычно не сталкиваются с проблемами, особенно если соблюдать базовые меры предосторожности.<br><br> Если вы планируете посетить Дагестан, рекомендуется следовать рекомендациям и указаниям местных властей, а также обратиться за информацией в консульство или посольство своей страны для получения актуальных сведений о безопасности.',
            opened: false
          },
          {
            label: 'Дагестан входит в РФ?',
            body: 'Как и в любом другом регионе, безопасность в Дагестане может зависеть от разных факторов. Хотя в Дагестане происходят инциденты, связанные с насилием и терроризмом, большинство туристов и посетителей обычно не сталкиваются с проблемами, особенно если соблюдать базовые меры предосторожности.<br><br> Если вы планируете посетить Дагестан, рекомендуется следовать рекомендациям и указаниям местных властей, а также обратиться за информацией в консульство или посольство своей страны для получения актуальных сведений о безопасности.',
            opened: false
          },
          {
            label: 'Как дагестанцы относятся к пьяным туристам?',
            body: 'Как и в любом другом регионе, безопасность в Дагестане может зависеть от разных факторов. Хотя в Дагестане происходят инциденты, связанные с насилием и терроризмом, большинство туристов и посетителей обычно не сталкиваются с проблемами, особенно если соблюдать базовые меры предосторожности.<br><br> Если вы планируете посетить Дагестан, рекомендуется следовать рекомендациям и указаниям местных властей, а также обратиться за информацией в консульство или посольство своей страны для получения актуальных сведений о безопасности.',
            opened: false
          },
        ]"></AppDropdown>
    </AppContainer>
  </section>

  <section class="feedback">
    <AppContainer>
      <div class="feedback__grid">
        <div class="tw-flex tw-flex-col tw-justify-center">
          <h2 class="title-main tw-mb-28"><span class="tw-text-green">Остались</span> вопросы?</h2>
          <AppButton class="tw-w-full md:tw-w-max">Связаться с нами</AppButton>
        </div>
        <div>
          <div class="feedback__glass">
            <img class="feedback__glass-img" src="@/assets/img/banner-img.png" alt="">
          </div>
        </div>
      </div>
    </AppContainer>
  </section>
</template>

<style lang="scss">
.tour {
  padding: 40px 0 60px;

  @media (max-width: 767px) {
    padding: 20px 0 30px;
  }

  &__title {
    color: var(--color-black);
    font-size: 40px;
    font-weight: 500;
    line-height: 110%;
  }

  &__form {
    display: flex;
    flex-direction: column;

    padding: 28px;
    border-radius: 10px;

    background: #FFF;
    box-shadow: 0px 45px 90px 15px rgba(11, 52, 50, 0.08);
  }

  &__form-header {
    padding: 18px;

    border-radius: 8px;
    background: #F5F7F9;
  }

  &__form-cost {
    color: #808E95;
    font-size: 18px;
    font-weight: 500;
    line-height: 110%;

    &__total {
      color: #27A49D;
      font-size: 24px;
      font-weight: 500;
    }
  }

  &__grid {
    display: grid;
    column-gap: 40px;
    grid-template-columns: calc(840% / 13.60) calc(480% / 13.60);

    @media (max-width: 992px) {
      grid-template-columns: 100%;
      gap: 20px;
    }
  }

  &__controls {
    @media (max-width: 992px) {
      grid-row: 1/2;
    }
  }

  &__content-wrapper {
    display: flex;
    flex-direction: column;
    row-gap: 40px;

    @media (max-width: 767px) {
      row-gap: 20px;
    }
  }

  &__content-box {
    position: relative;
    border-radius: 10px;
    
    background: #FFF;
  }

  &__content-box_full {
    border-radius: 10px;
    overflow: hidden;

    background: transparent;
  }

  &__content-swiper-item {
    border-radius: 10px;
    overflow: hidden;
  }

  &__content-swiper-img {
    display: block;
    width: 100%;
    aspect-ratio: calc(840 / 580);
  }

  .swiper-pagination {
    position: absolute;
    z-index: 4;
    bottom: 27px;
    left: 50%;

    display: flex;
    column-gap: 4px;

    transform: translateX(-50%);
  }

  .swiper-pagination-bullet {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 14px;
    height: 14px;

    cursor: pointer;

    &:before {
      content: '';
      width: 10px;
      height: 10px;

      border: 1px solid #b2b2b2;
      border-radius: 100%;

      background-color: #fff;
    }
  }

  .swiper-pagination-bullet-active {

    &:before {
      border: 1px solid #1a7470;
      background-color: #26A59E;
    }
  }

  &__content-header {
    padding: 28px;
    padding-bottom: 24px;
    
    @media (max-width: 767px) {
      padding: 20px;
      padding-bottom: 16px;
    }
  }

  &__content-body {
    padding: 28px;
    padding-top: 24px;
    
    @media (max-width: 767px) {
      padding: 20px;
      padding-top: 16px;
    }
  }

  &__content-body-field {
    padding: 24px 0;

    &:first-of-type {
      padding-top: 0;
    }

    &:last-of-type {
      padding-bottom: 0;
    }
  }

  &__content-header,
  &__content-body-field:not(:last-of-type) {
    position: relative;

    &:after {
      content: '';

      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;

      display: block;
      
      height: 1px;

      background-color: #E0E1E4;
    }
  }

  &__content-title {
    color: var(--color-black);
    font-size: 24px;
    font-weight: 500;
    line-height: 110%;

    @media (max-width: 767px) {
      font-size: 18px;
    }
  }

  &__content-glass {
    border-radius: 8px;
    overflow: hidden;
  }

  &__content-glass-img {
    display: block;
    width: 100%;
  }

  .dropdown {
    &__item {
      &:first-child {
        @apply tw-border-t-0
      }

      &:last-child {
        @apply tw-border-b-0
      }
    }

    &__label {
      @apply tw-py-15 md:tw-py-20
    }

    &__label-text {
      font-size: 18px;

      span {
        color: #54676E;
      }
    }
  }
}

.title-main {
  font-size: 32px;

  @media (min-width: 768px) {
    font-size: 40px;
  }
}

.faq {
  background-color: #fff;

  padding: 30px 0;

  @media (min-width: 768px) {
    padding: 60px 0;
  }
}

.feedback {
  padding: 30px 0 60px;
  background-color: #fff;

  @media (min-width: 768px) {
    padding: 60px 0 120px;
  }

  &__grid {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    row-gap: 30px;

    @media (min-width: 768px) {
      column-gap: 80px;
      flex-direction: row;
    }
  }

  &__glass {
    position: relative;

    padding-top: 20px;
    padding-right: 20px;

    &:hover {
      .feedback__glass-img {
        transform: translate(7px, -7px);
      }
    }

    &::before {
      content: '';
      position: absolute;
      z-index: 1;
      
      top: 0;
      right: 0;
      bottom: 20px;
      left: 20px;

      display: block;
      
      border-radius: 10px;
      background-color: var(--color-green-darker);
    }
  }

  &__glass-img {
    display: block;
    
    position: relative;
    z-index: 2;
    
    border-radius: 10px;
    transition: .3s all ease;
  }
}

.tour-back-button {
  display: flex;
  column-gap: 4px;

  padding: 14px 18px 14px 12px;
  border: 1.5px solid #DEE2E5;
  border-radius: 6px;

  color: #0B2630;
  font-size: 14px;
  font-weight: 500;
  line-height: 110%;
}

.tour__badge {
  &:not(:last-child) {
    position: relative;

    &::after {
      content: '';

      position: absolute;
      top: 3px;
      bottom: 3px;
      right: -12px;

      display: block;

      width: 1.5px;

      background-color: #D7D7D7;
      transform: translateX(50%);
    }
  }
  &-text {
    color: #0B2630;
    font-size: 16px;
    font-weight: 500;
    line-height: 110%;

    &_weak {
      color: #808E95;
      font-size: 16px;
      font-weight: 400;
      line-height: 110%;
    }
  }
}
</style>
<script lang="ts" setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  cardData: {
    type: Object,
    default: () => ({
      cover: '',
      title: '',
      list: [{ label: '', icon: '' }],
    })
  }
})

const router = useRouter()
</script>

<template>
  <div
    class="tour-card"
  >
    <div class="tour-card__wrapper">
      <div class="tour-card__header">
        <div class="tour-card__glass">
          <img :src="props.cardData.cover" alt="" class="tour-card__glass-img">
          <a href="" class="tour-card__card-link"></a>
        </div>
      </div>
      <div class="tour-card__body">
        <h3 class="tour-card__title">{{ props.cardData.title }}</h3>
        <ul
          v-for="listItem in props.cardData.list"
          class="tour-card__list"
        >
          <li 
            :class="[
              'tour-card__list-item',
              listItem.icon ? `tour-card__list-item_${listItem.icon}-bullet` : ''
            ]"
          >{{ listItem.label }}</li>
        </ul>
      </div>
      <div class="tour-card__footer">
        <AppButton :outlined="true" class="tw-w-full" @click="router.push('/tour')">Оставить заявку</AppButton>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.tour-card {
  display: flex;

  padding: 20px;
  border-radius: 10px;
  
  background: #FFF;
  box-shadow: 0px 25px 200px 15px rgba(11, 52, 50, 0.15);

  * {
    transition: .3s all ease;
  }

  &:hover {
    .tour-card {

      &__glass {
        box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0);
      }
    }
  }

  &__wrapper {
    display: flex;
    flex-direction: column;

    height: 100%;
  }

  &__header {
    flex-grow: 0;
    margin-bottom: 20px;
  }

  &__glass {
    border-radius: 6px;
    overflow: hidden;

    box-shadow: 0px 8px 35px 0px rgba(0, 0, 0, 0.15);
  }

  &__body {
    flex-grow: 1;
    margin-bottom: 20px;
  }

  &__title {
    margin-bottom: 20px;

    font-size: 20px;
    font-weight: 700;
    line-height: 100%;
    color: var(--color-black);
  }

  &__list-item {
    position: relative;
    padding: 1px;
    padding-left: 21px;

    &::before {
      content: '';

      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);

      display: block;

      width: 15px;
      height: 15px;
      border-radius: 100%;

      background-color: var(--color-green-darker);
    }

    &.tour-card__list-item_time-bullet {
      &::before {
        background-color: transparent;
        background: url('@/assets/img/time-list-bullet.svg') center center/contain no-repeat;
      }
    }

    &.tour-card__list-item_franklin-bullet {
      &::before {
        background-color: transparent;
        background: url('@/assets/img/franklin-list-bullet.svg') center center/contain no-repeat;
      }
    }
  }

  &__footer {
    flex-grow: 0;
  }
}
</style>
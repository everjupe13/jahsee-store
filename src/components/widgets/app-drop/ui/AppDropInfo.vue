<script lang="ts" setup>
import { IDropInfoProps } from '../types/IDropInfoProps'

const props = defineProps<IDropInfoProps>()
</script>

<template>
  <div class="outlined-text drop-info__title tw-mb-25" style="--stroke-width: 2px">{{ props.title }}</div>
  <div class="drop-info__cost tw-mb-25" data-aos="fade-down" data-aos-delay="100">{{ props.cost }}</div>
  <div class="drop-info__desc" data-aos="fade-down" data-aos-delay="200" v-html="props.desc"></div>
</template>

<style lang="scss" scoped>
.drop-info {

  &__title {
    position: relative;
    font-size: 64px;
    font-style: normal;
    font-weight: 700;
    line-height: 1;

    @media (max-width: 767px) {
      font-size: 36px; 
      -webkit-text-stroke-width: 1px;
    }
  }

  &__cost {
    font-family: 'Helvetica Now Display', Helvetica, Arial, sans-serif;
    font-size: 24px;
    font-style: normal;
    font-weight: 800;
    line-height: 1;
  }

  &__desc {
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
    color: rgba(255, 255, 255, 0.6);
  }
}
</style>
<script lang="ts" setup>
const props = defineProps(['modelValue', 'name', 'disabled'])
defineEmits(['update:modelValue'])
</script>

<template>
  <label :class="['radio-input', { '--active': props.modelValue }]">
    <input
      type="radio"
      :name="name || ''"
      class="radio-input__radio peer"
      :checked="props.modelValue"
      @input="$emit('update:modelValue', !props.modelValue)"
      :disabled="!!props.disabled"
    />
    <span class="radio-input__text peer-disabled:hover:!text-[#848a99]">
      <slot></slot>
    </span>
  </label>
</template>

<style lang="scss" scoped>
.radio-input {
  display: grid;
  align-items: center;
  grid-template-columns: 20px auto;
  gap: 10px;

  &.--active {
    .radio-input__text {
      color: #000;
    }

    .radio-input__radio {
      border: 1.5px solid rgba(0, 0, 0, 1);

      &::before {
        background-color: rgba(0, 0, 0, 1);
      }
    }
  }

  &:hover {
    & .radio-input__radio:not(:disabled) {
      & + .radio-input__text {
        color: #000;
      }
    }
  }

  &__text {
    color: #848a99;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 100%;
    user-select: none;

    transition: all 0.3s ease;
  }

  &__radio {
    -webkit-appearance: none;
    appearance: none;
    transform: translateY(-1px);

    display: grid;
    place-content: center;

    margin: 0;
    width: 20px;
    height: 20px;
    border: 1.5px solid rgba(0, 0, 0, 0.2);
    border-radius: 50%;

    font: inherit;

    transition: all 0.3s ease;

    &::before {
      content: '';

      display: block;

      width: 8px;
      height: 8px;
      border-radius: 50%;

      background-color: rgba(0, 0, 0, 0.2);

      transform: scale(0);
      transition: 0.12s transform ease-in-out;

      transition: all 0.3s ease;
    }

    &:checked::before {
      transform: scale(1);
    }
  }
}
</style>

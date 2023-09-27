<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts" setup>
import { computed, ref, useSlots } from 'vue'

// import AppCollapse from '@/components/shared/AppCollapse.vue'
import { CheckIcon } from '@/components/shared/icons'

function useEvents(context: (e: any, value: any) => void) {
  const handleChange = (e: Event) => {
    context('update:modelValue', (e.target as HTMLTextAreaElement).value)
  }
  const handleInput = (e: Event) => {
    context('update:modelValue', (e.target as HTMLTextAreaElement).value)
  }

  return {
    handleChange,
    handleInput
  }
}

function randomID() {
  return `${Date.now()}-${Math.floor(Math.random() * 1_000_000)}`
}

interface Props {
  disabled?: boolean
  placeholder?: string
  readonly?: boolean
  modelValue?: any
  inputWrapperClasses?: string
  type?:
    | 'text'
    | 'number'
    | 'email'
    | 'password'
    | 'url'
    | 'tel'
    | 'date'
    | 'time'
    | 'range'
    | 'color'
    | 'search'
  validationMessage?: string
  validatable?: boolean
  isValid?: boolean
  isDirty?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  validationMessage: '',
  placeholder: '',
  modelValue: undefined,
  isValid: undefined,
  isDirty: undefined,
  inputWrapperClasses: ''
})
const emits = defineEmits([
  'change',
  'input',
  'update:modelValue',
  'focus',
  'blur'
])
const { handleChange, handleInput } = useEvents(emits)

const uuid = ref(randomID())

// TODO add logic for validation shown
const validationFn = computed(() => props.modelValue.length > 0)
const isValidationMessageShown = computed(() => {
  return props.isValid === undefined ? validationFn.value : !props.isValid
})

const slots = useSlots()
const isAfterInputSlotEmpty = computed(
  () => slots?.['after-input'] === undefined
)

const inputRef = ref<HTMLElement | null>(null)
const onFocus = () => {
  if (props.readonly && inputRef.value !== null) {
    inputRef.value.blur()
    return
  }

  emits('focus')
}
</script>

<template>
  <div>
    <div
      class="group flex items-center border border-solid border-black/10 bg-white focus-within:border-black hover:border-black"
      :class="[props.inputWrapperClasses]"
    >
      <div class="relative w-full flex-grow">
        <input
          ref="inputRef"
          class="input peer block w-full bg-transparent px-20 pb-12 pt-28 text-[#555862] outline-none transition placeholder:opacity-0 focus:text-[#000] group-hover:text-[#000]"
          :id="uuid"
          :value="props.modelValue"
          :disabled="props.disabled"
          :placeholder="props.placeholder"
          :readonly="props.readonly"
          :type="props.type"
          @input="handleInput"
          @change="handleChange"
          @focus="onFocus"
          @blur="emits('blur')"
        />
        <label
          :class="[
            'label transition-all ',
            'absolute left-22 top-12 text-[12px] text-[#848A99]',
            'peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-[14px] peer-hover:text-[#000] peer-focus:top-11 peer-focus:-translate-y-0 peer-focus:text-[12px] peer-focus:text-[#848A99]'
          ]"
          :for="uuid"
        >
          {{ placeholder }}
        </label>
      </div>
      <div
        class="flex-shrink-0 flex-grow-0"
        :class="{
          'py-10 pr-10': !isAfterInputSlotEmpty || isValid !== undefined
        }"
      >
        <template v-if="!isAfterInputSlotEmpty">
          <slot name="after-input"></slot>
        </template>
        <template v-else-if="isAfterInputSlotEmpty && isValid !== undefined">
          <div>
            <span
              class="flex items-center justify-center pr-10"
              v-if="isValid && isDirty"
            >
              <CheckIcon />
            </span>
          </div>
        </template>
      </div>
    </div>
    <transition name="slightly-fade">
      <div
        v-if="props.isValid !== undefined && isValidationMessageShown"
        class="validation-message bg-black px-20 py-7"
      >
        {{ validationMessage }}
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.label {
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
}

.input {
  @apply text-[16px] font-medium leading-none;

  &:-webkit-autofill {
    font-size: 16px !important;
    font-weight: 500 !important;
    transition: background-color 5000s ease-in-out 0s;

    @include laptop {
      font-size: 14px !important;
    }
  }
}

.validation-message {
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;

  overflow: hidden;
  @apply text-white;
}

.slightly-fade-enter-active,
.slightly-fade-leave-active {
  @apply transition-all;
}

.slightly-fade-enter-from,
.slightly-fade-leave-to {
  @apply translate-y-5 pt-0 leading-[0px] text-black opacity-0;
}

.slightly-fade-enter-to,
.slightly-fade-leave-from {
  @apply translate-y-0 py-7 leading-none text-white opacity-100;
}
</style>

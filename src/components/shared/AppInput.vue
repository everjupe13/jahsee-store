<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'

import AppCollapse from '@/components/shared/AppCollapse.vue'

function useEvents(context: (e: any, value: any) => void) {
  const handleChange = (e: Event) => {
    if (props.modelValue) {
      context('update:modelValue', (e.target as HTMLTextAreaElement).value)
      return
    }
    refValue.value = (e.target as HTMLTextAreaElement).value
    context('change', (e.target as HTMLTextAreaElement).value)
  }
  const handleInput = (e: Event) => {
    if (props.modelValue) {
      context('update:modelValue', (e.target as HTMLTextAreaElement).value)
      return
    }

    refValue.value = (e.target as HTMLTextAreaElement).value
    context('input', (e.target as HTMLTextAreaElement).value)
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
  label?: string
  disabled?: boolean
  placeholder?: string
  readonly?: boolean
  state?: any
  modelValue?: any
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
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  validationMessage: 'Invalid'
})
const emits = defineEmits(['change', 'input', 'update:modelValue'])
const { handleChange, handleInput } = useEvents(emits)

const uuid = ref(randomID())
const refValue = ref('')

onMounted(() => {
  refValue.value = props.modelValue ?? ''
})

watch(
  () => props.modelValue,
  () => {
    refValue.value = props.modelValue
  }
)
// TODO add logic for validation shown
const validationFn = computed(() => refValue.value.length > 0)
const isValidationMessageShown = computed(() => {
  return validationFn.value
})
</script>

<template>
  <div>
    <div class="relative w-full">
      <input
        class="input peer block w-full border border-solid border-black/10 px-20 pb-12 pt-28 text-[#555862] outline-none transition placeholder:opacity-0 hover:border-black hover:text-[#000] focus:border-black focus:text-[#000]"
        :id="uuid"
        :value="refValue"
        :disabled="props.disabled"
        :placeholder="props.placeholder"
        :readonly="props.readonly"
        :type="props.type"
        @change="handleChange"
        @input="handleInput"
      />
      <label
        class="label absolute left-22 top-12 text-[12px] text-[#848A99] transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-[14px] peer-hover:text-[#000] peer-focus:top-11 peer-focus:-translate-y-0 peer-focus:text-[12px] peer-focus:text-[#848A99]"
        :for="uuid"
      >
        {{ placeholder }}
      </label>
    </div>
    <AppCollapse v-if="props.validatable" v-model="isValidationMessageShown">
      <div class="validation-message bg-black px-20 py-10">
        {{ validationMessage }}
      </div>
    </AppCollapse>
  </div>
</template>

<style lang="scss" scoped>
.label {
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
}

.input {
  font-family: Montserrat;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
}

.validation-message {
  color: #fff;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
}
</style>

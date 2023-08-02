<script lang="ts" setup>
import { ref, computed } from 'vue'
import AppCollapse from '@/components/shared/AppCollapse.vue'

function useEvents(context: (e: any, value: any) => void) {
  const handleChange = (e: Event) => {
    if (props.modelValue) {
      context('update:modelValue', (e.target as HTMLTextAreaElement).value)
      context('change', (e.target as HTMLTextAreaElement).value)
      return
    }

    refValue.value = (e.target as HTMLTextAreaElement).value
  }
  const handleInput = (e: Event) => {
    if (props.modelValue) {
      context('update:modelValue', (e.target as HTMLTextAreaElement).value)
      context('input', (e.target as HTMLTextAreaElement).value)
      return
    }

    refValue.value = (e.target as HTMLTextAreaElement).value
  }

  return {
    handleChange,
    handleInput
  }
}


function randomID() {
  return `${Date.now()}-${Math.floor(Math.random() * 1_000_000)}`;
}

interface Props {
  label?: string
  disabled?: boolean,
  placeholder?: string,
  readonly?: boolean,
  state?: any,
  modelValue?: any,
  type?: 'text' | 'number' | 'email' | 'password' | 'url' | 'tel' | 'date' | 'time' | 'range' | 'color' | 'search',
  validationMessage?: string,
  validatable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  validationMessage: 'Invalid'
})
const emits = defineEmits(['change', 'input', 'update:modelValue'])
const { handleChange, handleInput } = useEvents(emits)

const uuid = ref(randomID())
const refValue = props.modelValue ? props.modelValue : ref('')

// TODO add logic for validation shown
const validationFn = computed(() => refValue.value.length > 0)
const isValidationMessageShown = computed(() => {
  return validationFn.value
})
</script>

<template>
  <div>
    <div class="tw-w-full tw-relative">
      <input
        class="
          input
          tw-block
          tw-w-full
          tw-border
          tw-border-solid
          tw-border-black/10
          placeholder:tw-opacity-0
          tw-px-20
          tw-pt-28
          tw-pb-12
          tw-peer
          tw-text-[#555862]
          focus:tw-border-black
          focus:tw-text-[#000]
          hover:tw-text-[#000]
          hover:tw-border-black
          tw-transition
        "
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
        class="
          label
          tw-absolute
          tw-top-12
          tw-left-22
          tw-text-[12px]
          tw-text-[#848A99]
          peer-placeholder-shown:tw-top-1/2
          peer-placeholder-shown:-tw-translate-y-1/2
          peer-placeholder-shown:tw-text-[14px]
          peer-focus:tw-top-11
          peer-focus:-tw-translate-y-0
          peer-focus:tw-text-[12px]
          peer-hover:tw-text-[#000]
          peer-focus:tw-text-[#848A99]
          tw-transition-all
        "
        :for="uuid"
      >
      {{ placeholder }}
      </label>
    </div>
    <AppCollapse v-if="props.validatable" v-model="isValidationMessageShown">
      <div class="validation-message tw-bg-black tw-px-20 tw-py-10">
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
  color: #FFF;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
}
</style>

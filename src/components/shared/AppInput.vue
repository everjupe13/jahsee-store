<script lang="ts" setup>
import { ref } from 'vue'

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
  return `${Date.now()}-${Math.floor(Math.random() * 1_000_000)}`;
}

interface Props {
  label?: string
  disabled?: boolean,
  placeholder?: string,
  readonly?: boolean,
  state?: any,
  modelValue?: any,
  type?: 'text' | 'number' | 'email' | 'password' | 'url' | 'tel' | 'date' | 'time' | 'range' | 'color' | 'search'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text'
})
const emits = defineEmits(['change', 'input', 'update:modelValue'])
const { handleChange, handleInput } = useEvents(emits)

const uuid = ref(randomID())

const refValue = props.modelValue ? props.modelValue : ref('')

</script>

<template>
  <label class="input-label-box" :class="props.modelValue ? '--active' : ''">
    <input
      :id="uuid"
      :value="refValue"
      :disabled="props.disabled"
      :placeholder="props.placeholder"
      :readonly="props.readonly"
      :type="props.type"
      class="input"
      @change="handleChange"
      @input="handleInput"
    />
  </label>
</template>

<style lang="scss" scoped>
.input-label-box {
  border: 1px solid #202022;
  padding: 22px 48px;
  background: #F6F5FF;

  position: relative;
  
  display: flex;
  align-items: center;

  width: 100%;
  height: 66px;

  cursor: text;

  @media (max-width: 767px) {
    padding: 22px 30px;
  }

  &.--active {
    justify-content: flex-end;
  }
}

.input {
  display: block;
  color: #969EAB;
  font-size: 18px;
  font-weight: 400;
  line-height: normal;
  text-transform: uppercase;
  background: transparent;

  flex-grow: 1
}
</style>

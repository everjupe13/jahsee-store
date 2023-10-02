<!-- eslint-disable unicorn/consistent-function-scoping -->
<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts" setup>
import { AxiosError } from 'axios'
import { debounce } from 'lodash-es'
import { computed, ref, unref, watch } from 'vue'

import { useApiRequest } from '@/api/shared/network/http'

type Props = {
  modelValue: string
  placeholder: string
  vuelidateModel: any
  addressKey: string
  addressLabelKeysComplex?: boolean
  fetchKey: string
  fetchData: Record<string, string>
  inputClasses?: string
}

const props = withDefaults(defineProps<Props>(), {
  inputClasses: '',
  addressLabelKey: undefined
})
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'field-update', value: string): void
}>()

const rawValue = ref('')
const fetchedAdresses = ref<undefined | { id: number; label: string }[]>()

watch(
  () => props.modelValue,
  () => {
    rawValue.value = props.modelValue
  }
)

const isFocused = ref(false)
const isPromptVisible = computed(() => !!rawValue.value && isFocused.value)

const onChangeRawValue = async (value: string) => {
  rawValue.value = value
  emit('update:modelValue', '')
  emit('field-update', props.addressKey)
  await debounceRequestAddresses()
}

const onChooseValidValue = (index: number) => {
  if (
    fetchedAdresses.value &&
    Array.isArray(fetchedAdresses.value) &&
    fetchedAdresses.value.length > 0
  ) {
    const choosedAddressData = fetchedAdresses.value.find(
      address => address.id === index
    )
    const choosedValue = choosedAddressData?.label || ''
    emit('update:modelValue', choosedValue)
    emit('field-update', props.addressKey)
    rawValue.value = choosedValue
  }
}

const requestAddresses = async () => {
  if (!isFocused.value) {
    return
  }

  try {
    const fetchResponse = await useApiRequest.post(
      '/user-info/correct-address',
      {
        ...Object.fromEntries(
          Object.entries(props.fetchData).filter(data => Boolean(data[1]))
        ),
        [props.fetchKey]: rawValue.value
      }
    )

    if (fetchResponse?.status && fetchResponse.status <= 400) {
      if (fetchResponse.data?.data && Array.isArray(fetchResponse.data?.data)) {
        const uniqueNormalizedData: { id: number; label: string }[] = []
        fetchResponse.data.data.forEach((addressObject: any, index: number) => {
          const constructComplexDataValue = ({
            street_with_type,
            house_type,
            house,
            block_type,
            block
          }: {
            street_with_type: string
            house_type: string
            house: string
            block_type: string
            block: string
          }) => {
            const label = `${street_with_type}${
              house_type && house
                ? block_type && block
                  ? `, ${house_type} ${house} ${block_type} ${block}`
                  : `, ${house_type} ${house}`
                : ''
            }`
            return label
          }

          const currentDataValue = props.addressLabelKeysComplex
            ? constructComplexDataValue(addressObject.data)
            : addressObject.data[props.addressKey]
          if (!currentDataValue) {
            return
          }

          if (
            !uniqueNormalizedData.some(
              (unique: { id: number; label: string }) =>
                unique.label === currentDataValue
            )
          ) {
            uniqueNormalizedData.push({
              id: index,
              label: currentDataValue
            })
          }
        })

        fetchedAdresses.value = uniqueNormalizedData
      }
      return { error: false, status: true }
    }

    return {
      error: false,
      status: false
    }
  } catch (error) {
    // TODO add notification observer center
    // eslint-disable-next-line no-console
    console.log(error)
    const errors = (error as AxiosError)?.response?.data as {
      [x: string]: any
    }

    if (errors instanceof Object && Object.entries(errors).length > 0) {
      return { error: errors, status: false }
    }
    return { error: error, status: false }
  }
}

const debounceRequestAddresses = debounce(
  async () => await requestAddresses(),
  500
)

const inputPropsMapper = (vuelidateModel: { [x: string]: any }) => {
  return {
    isValid: vuelidateModel.$dirty ? !vuelidateModel.$invalid : true,
    isDirty: vuelidateModel.$dirty,
    validationMessage: unref(vuelidateModel.$silentErrors[0]?.$message)
  }
}

const onFocus = () => {
  isFocused.value = true
}
const onBlur = () => {
  setTimeout(() => {
    isFocused.value = false
    rawValue.value = props.modelValue

    if (!rawValue.value) {
      fetchedAdresses.value = undefined
    }
  }, 200)
}
</script>

<template>
  <div class="relative">
    <AppInput
      :model-value="rawValue"
      @update:model-value="onChangeRawValue"
      :placeholder="props.placeholder"
      :class="props.inputClasses"
      v-bind="inputPropsMapper(props.vuelidateModel)"
      @focus="onFocus"
      @blur="onBlur"
    />
    <div
      v-if="
        isPromptVisible &&
        Array.isArray(fetchedAdresses) &&
        fetchedAdresses.length > 0
      "
      class="absolute top-[calc(100%+5px)] z-[2] max-h-[200px] w-full border border-solid border-black/10 bg-white p-1 text-black shadow-md"
    >
      <ul
        class="custom-scroll max-h-[180px] overflow-y-auto px-10 py-10 font-hnd text-[14px] text-[#555862]"
      >
        <li v-for="(address, index) in fetchedAdresses" :key="index" class="">
          <button
            class="block w-full cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap px-10 py-10 text-left hover:bg-black/5 focus:bg-black/5"
            type="button"
            @click="onChooseValidValue(address.id)"
          >
            {{ address.label }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

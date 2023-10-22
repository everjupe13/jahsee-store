<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { computed, nextTick, onMounted, reactive, ref, unref, watch } from 'vue'

import { useUserStore } from '@/api/modules/user'
import { FormLoader } from '@/components/widgets/loaders'

import AddressFormAutoselectInput from './AddressFormAutoselectInput.vue'

const emit = defineEmits<{
  (e: 'confirm'): void
}>()

onMounted(() => {
  nextTick(() => {
    const bodyElement = document.querySelector('body') as HTMLElement
    bodyElement.style.removeProperty('padding-right')
  })
})

type Props = {
  id?: number
  country?: string
  city?: string
  street?: string
  zipCode?: string
}
const props = withDefaults(defineProps<Props>(), {
  id: undefined,
  country: '',
  city: '',
  street: '',
  zipCode: ''
})
const isEditMode = computed(() => props.id !== undefined)

const userStore = useUserStore()
const formData = reactive({
  country: '',
  city: '',
  street: '',
  zipCode: ''
})
onMounted(() => {
  if (isEditMode.value) {
    formData.country = props.country
    formData.city = props.city
    formData.street = props.street
    formData.zipCode = props.zipCode
  }
})

const rules = {
  country: { required },
  city: { required },
  street: { required },
  zipCode: { required }
}

const v$ = useVuelidate(rules, formData)

onMounted(() => {
  // v$.value.$validate()
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const inputPropsMapper = (props: { [x: string]: any }) => {
  return {
    isValid: props.$dirty ? !props.$invalid : true,
    isDirty: props.$dirty,
    validationMessage: unref(props.$silentErrors[0]?.$message)
  }
}

const serverMessage = ref<string | null>(null)
const serverMessageVisible = computed(
  () => serverMessage.value && serverMessage.value !== null
)

watch(formData, () => {
  serverMessage.value = null
})

const isLoading = ref(false)
const isSuccess = ref(true)
const onSubmitForm = async () => {
  serverMessage.value = null

  if (v$.value.$invalid) {
    v$.value.$validate()
    return
  }

  isLoading.value = true
  isSuccess.value = false

  if (isEditMode.value) {
    const response = await userStore.editAddress({
      id: props.id!,
      country: formData.country,
      city: formData.city,
      street: formData.street,
      zipCode: formData.zipCode
    })

    if (response.status) {
      setTimeout(() => {
        isLoading.value = false
        isSuccess.value = true
        emit('confirm')
      }, 1000)
    } else if (response.error) {
      isLoading.value = false
      isSuccess.value = true
      const messages = response.error as { [x: string]: string[] }
      const pureMessage = Object.values(messages).flat(1)[0]
      serverMessage.value = pureMessage
    }
  } else {
    const response = await userStore.createAddress({
      country: formData.country,
      city: formData.city,
      street: formData.street,
      zipCode: formData.zipCode
    })

    if (response.status) {
      setTimeout(() => {
        isLoading.value = false
        isSuccess.value = true
        emit('confirm')
      }, 1000)
    } else if (response.error) {
      isLoading.value = false
      isSuccess.value = true
      const messages = response.error as { [x: string]: string[] }
      const pureMessage = Object.values(messages).flat(1)[0]
      serverMessage.value = pureMessage
    }
  }
}
</script>

<template>
  <div>
    <form @submit.prevent="onSubmitForm">
      <h3
        class="mb-30 text-center font-hnd text-[30px] font-medium uppercase leading-tight tracking-[1.6px] text-button-black md:mb-40 md:text-[40px]"
      >
        {{ isEditMode ? 'Change address' : 'New address' }}
      </h3>
      <div class="mb-30 md:mb-40">
        <AddressFormAutoselectInput
          key="country"
          v-model="v$.country.$model"
          placeholder="country"
          input-classes="mb-15"
          :vuelidate-model="v$.country"
          address-key="country"
          fetch-key="country"
          :fetch-data="formData"
          @field-update="
            () => {
              v$.city.$model = ''
              v$.street.$model = ''
              v$.zipCode.$model = ''
              v$.$reset()
            }
          "
        />
        <AddressFormAutoselectInput
          key="city"
          v-model="v$.city.$model"
          placeholder="city"
          input-classes="mb-15"
          :vuelidate-model="v$.city"
          address-key="city_with_type"
          fetch-key="city"
          :fetch-data="formData"
          @field-update="
            () => {
              v$.street.$model = ''
              v$.zipCode.$model = ''
              v$.$reset()
            }
          "
        />
        <AddressFormAutoselectInput
          key="street"
          v-model="v$.street.$model"
          placeholder="street"
          input-classes="mb-15"
          :vuelidate-model="v$.street"
          address-key="street_with_type"
          :address-label-keys-complex="true"
          fetch-key="street"
          :fetch-data="formData"
          @field-update="
            () => {
              v$.zipCode.$model = ''
              v$.$reset()
            }
          "
        />
        <AppInput
          v-model="v$.zipCode.$model"
          placeholder="zip code"
          v-bind="inputPropsMapper(v$.zipCode)"
        />
      </div>
      <div
        v-if="serverMessageVisible"
        class="mb-10 px-5 text-[#d84949] text-medium-15"
      >
        {{ serverMessage }}
      </div>
      <AppButton
        :disabled="isLoading || !isSuccess"
        fluid
        class="h-65"
        type="submit"
      >
        <template v-if="!isSuccess">
          <div class="flex items-center justify-center">
            <FormLoader></FormLoader>
          </div>
        </template>
        <template v-else>Submit</template>
      </AppButton>
    </form>
  </div>
</template>

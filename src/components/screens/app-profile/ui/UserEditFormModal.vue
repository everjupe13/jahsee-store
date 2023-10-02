<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { email, helpers, minLength, required } from '@vuelidate/validators'
import { computed, nextTick, onMounted, reactive, ref, unref, watch } from 'vue'

import { useUserStore } from '@/api/modules/user'
import { FormLoader } from '@/components/widgets/loaders'
import { emailValidator } from '@/utils/validators'

const emit = defineEmits<{
  (e: 'confirm'): void
}>()

onMounted(() => {
  nextTick(() => {
    const bodyElement = document.querySelector('body') as HTMLElement
    bodyElement.style.removeProperty('padding-right')
  })
})

const userStore = useUserStore()
const formData = reactive({
  email: userStore.profile?.userEmail || '',
  phone: userStore.profile?.userPhone || '',
  firstName: userStore.profile?.userName || '',
  lastName: userStore.profile?.userLastName,
  password: ''
})

const rules = {
  email: {
    required,
    email,
    customEmailLenghtValidator: helpers.withMessage(
      emailValidator.validationMessage,
      emailValidator.lengthValdator
    )
  },
  firstName: { required },
  lastName: {},
  phone: { required },
  password: { required, minLengthValue: minLength(8) }
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

  const response = await userStore.editProfile({
    userEmail: formData.email,
    userName: formData.firstName,
    userLastName: formData.lastName,
    userPhone: formData.phone,
    userPassword: formData.password
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
</script>

<template>
  <div>
    <form @submit.prevent="onSubmitForm">
      <h3
        class="mb-30 text-center font-hnd text-[30px] font-medium uppercase leading-tight tracking-[1.6px] text-button-black md:mb-40 md:text-[40px]"
      >
        Change your profile
      </h3>
      <div class="mb-30 md:mb-40">
        <AppInput
          v-model="v$.email.$model"
          placeholder="e-mail"
          class="mb-15"
          v-bind="inputPropsMapper(v$.email)"
        />
        <AppInput
          v-model="v$.phone.$model"
          placeholder="phone number"
          class="mb-15"
          v-bind="inputPropsMapper(v$.phone)"
        />
        <AppInput
          v-model="v$.firstName.$model"
          placeholder="first name"
          class="mb-15"
          v-bind="inputPropsMapper(v$.firstName)"
        />
        <AppInput
          v-model="v$.lastName.$model"
          placeholder="last name"
          class="mb-15"
          v-bind="inputPropsMapper(v$.lastName)"
        />
        <AppInput
          v-model="v$.password.$model"
          placeholder="password"
          type="password"
          class="mb-15"
          v-bind="inputPropsMapper(v$.password)"
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

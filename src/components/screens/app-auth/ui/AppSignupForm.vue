<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { email, helpers, minLength, required } from '@vuelidate/validators'
import { computed, reactive, ref, watch } from 'vue'
import { RouteLocationRaw, useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/api/modules/auth/auth.store'
import { useUserStore } from '@/api/modules/user'
import { FormLoader } from '@/components/widgets/loaders'
import { RouteNamesEnum } from '@/router/router.types'
import { sleep } from '@/utils'
import { emailValidator } from '@/utils/validators'
// const emit = defineEmits(['submit'])

const formData = reactive({
  email: '',
  name: '',
  phone: '',
  lastName: '',
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
  name: { required },
  phone: { required },
  password: { required, minLengthValue: minLength(8) }
}

const v$ = useVuelidate(rules, formData)

const serverMessage = ref<string | null>(null)
const serverMessageVisible = computed(
  () => serverMessage.value && serverMessage.value !== null
)

const authStore = useAuthStore()
const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
watch(formData, () => {
  serverMessage.value = null
})

async function _tryToRedirectFromQuery({
  elsePath
}: {
  elsePath?: RouteLocationRaw
}) {
  try {
    if (
      route.query.redirect &&
      Object.values(RouteNamesEnum).includes(
        route.query.redirect.slice(
          1
        ) as (typeof RouteNamesEnum)[keyof typeof RouteNamesEnum]
      )
    ) {
      await router.push(route.query.redirect.slice(1) as string)
      return
    } else {
      await router.push(elsePath || { name: RouteNamesEnum.home })
    }
  } catch {
    /* empty */
  }
}

const loading = ref(false)
const longLoading = ref(false)

const beforeRequestLoaders = async () => {
  longLoading.value = true
  loading.value = true
}

const afterRequestLoaders = async () => {
  await sleep(200)
  loading.value = false
  await sleep(700)
  longLoading.value = false
}

const checkClientValidation = () => {
  if (v$.value.$invalid) {
    v$.value.$validate()
    return false
  }

  return true
}

const onSubmitForm = async () => {
  await beforeRequestLoaders()

  const isValid = checkClientValidation()
  if (!isValid) {
    return await afterRequestLoaders()
  }

  const { status, error } = await authStore.signUp({
    email: formData.email,
    name: formData.name,
    lastName: formData.lastName,
    password: formData.password,
    phone: formData.phone
  })

  if (error) {
    const messages = error as { [x: string]: string[] }
    const pureMessage =
      messages instanceof Object ? Object.values(messages).flat(1)[0] : ''
    serverMessage.value = pureMessage

    return await afterRequestLoaders()
  }

  if (status) {
    const isProfileSuccess = await userStore.fetchProfile()
    if (isProfileSuccess) {
      _tryToRedirectFromQuery({ elsePath: { name: RouteNamesEnum.home } })
    }
  }
}
</script>

<template>
  <form
    class="mx-auto max-w-[580px] bg-white p-30 py-30 md:p-60 md:pb-50"
    @submit.prevent="onSubmitForm"
  >
    <h3
      class="mb-30 text-center font-hnd text-[30px] font-medium uppercase leading-tight tracking-[1.6px] text-button-black md:mb-40 md:text-[40px]"
    >
      Welcome to ayaysee
    </h3>
    <div class="mb-30 md:mb-40">
      <AppInput
        v-model="v$.email.$model"
        placeholder="e-mail*"
        class="mb-15"
        :disabled="longLoading"
        :is-valid="v$.email.$dirty ? !v$.email.$invalid : true"
        :is-dirty="v$.email.$dirty"
        :validation-message="v$.email.$silentErrors[0]?.$message"
      />
      <AppInput
        v-model="v$.phone.$model"
        placeholder="phone number*"
        class="mb-15"
        :disabled="longLoading"
        :is-valid="v$.phone.$dirty ? !v$.phone.$invalid : true"
        :is-dirty="v$.phone.$dirty"
        :validation-message="v$.phone.$silentErrors[0]?.$message"
      />
      <AppInput
        v-model="v$.name.$model"
        placeholder="first name*"
        class="mb-15"
        :disabled="longLoading"
        :is-valid="v$.name.$dirty ? !v$.name.$invalid : true"
        :is-dirty="v$.name.$dirty"
        :validation-message="v$.name.$silentErrors[0]?.$message"
      />
      <AppInput
        v-model="formData.lastName"
        placeholder="last name"
        class="mb-15"
        :disabled="longLoading"
      />
      <AppInput
        v-model="v$.password.$model"
        placeholder="password*"
        type="password"
        :disabled="longLoading"
        :is-valid="v$.password.$dirty ? !v$.password.$invalid : true"
        :is-dirty="v$.password.$dirty"
        :validation-message="v$.password.$silentErrors[0]?.$message"
      />
    </div>
    <div
      v-if="serverMessageVisible"
      class="mb-10 px-5 text-[#d84949] text-medium-15"
    >
      {{ serverMessage }}
    </div>
    <AppButton fluid class="mb-25 h-65" :disabled="longLoading">
      <template v-if="loading">
        <div class="flex items-center justify-center">
          <FormLoader></FormLoader>
        </div>
      </template>
      <template v-else>Sign Up</template>
    </AppButton>
    <div class="text-center font-medium leading-none text-[#6a6e7a]">
      Already have an account?
      <router-link to="/login" class="text-button-black">Log in</router-link>
    </div>
  </form>
</template>

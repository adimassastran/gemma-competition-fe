<script setup>
import SectionTitle from '~/components/partial/SectionTitle'

const accCookie = useCookie('acc')
const auth = useAuthStore()
const toast = useToast()
const input = ref({
  email: { value: null, error: null },
  pw: { value: null, error: null }
})
const showPw = ref(false)
const loading = ref(false)

onMounted(() => {
  if (accCookie.value) {
    navigateTo('/home', { replace: true })
  }
})

const checkForm = () => {
  if (input.value.email.value && input.value.pw.value) {
    submitForm()
  }
  input.value.email.error = !input.value.email.value ? 'Email is required' : null
  input.value.pw.error = !input.value.pw.value ? 'Password is required' : null
}
const submitForm = async () => {
  loading.value = true
  await auth.login({
    email: input.value.email.value,
    password: input.value.pw.value
  })
    .then((res) => {
      toast.add({ title: `Hi ${res?.user?.name} 👋`, description: 'Ready to know more?', color: 'success' })
      navigateTo('/home', { replace: true })
    })
    .catch((error) => {
      const description = error.errors 
        ? Object.values(error.errors).flat()[0] 
        : 'Please check your input.'
      toast.add({ title: 'Wrong email or password', description: error?.data?.message, color: 'error' })
    })
  loading.value = false
}
</script>

<template>
  <div class="min-h-screen-main flex flex-col">
    <div class="space-y-4 my-auto">
      <div class="flex items-center justify-center gap-2">
        <div class="h-12 w-12 bg-contain bg-center bg-no-repeat" :style="{ backgroundImage: 'url(/img/logo.png)' }" />
        <span class="font-header text-2xl text-primary-600">MenarcheCare</span>
      </div>
      <SectionTitle title="Login" class="text-center" />
      <div class="py-2 px-3 rounded-2xl border border-neutral-400 bg-neutral-200 dark:bg-neutral-700 dark:border-neutral-700">
        <span class="font-bold opacity-50">Dummy account</span>
        <br><br><span class="font-bold">Mother:</span> mother@mail.com
        <br><span class="font-bold">Daughter:</span> daughter@mail.com
        <br><span class="font-bold">Password:</span> qwertyuiop
      </div>
      <UFormField label="Email" :error="input.email.error">
        <UInput
          v-model="input.email.value"
          type="email"
          placeholder="name@mail.com"
          size="xl"
          :disabled="loading"
          class="w-full"
        />
      </UFormField>
      <UFormField label="Password" :error="input.pw.error">
        <UInput
          v-model="input.pw.value"
          :type="showPw ? 'text' : 'password'"
          placeholder="Enter your password"
          size="xl"
          :disabled="loading"
          :ui="{ trailing: 'pe-1' }"
          class="w-full"
        >
          <template #trailing>
            <UButton
              color="neutral"
              variant="link"
              size="sm"
              :icon="showPw ? 'lets-icons:view-hide' : 'lets-icons:eye'"
              :aria-label="showPw ? 'Hide password' : 'Show password'"
              :aria-pressed="showPw"
              aria-controls="password"
              @click="showPw = !showPw"
            />
          </template>
        </UInput>
      </UFormField>
      <UButton
        label="Login"
        size="xl"
        block
        color="primary"
        variant="solid"
        :loading="loading"
        @click="checkForm"
      />
      <USeparator label="Have no account?" />
      <UButton
        label="Create a new account"
        size="xl"
        block
        color="neutral"
        variant="solid"
        @click="navigateTo('/register')"
      />
    </div>
  </div>
</template>

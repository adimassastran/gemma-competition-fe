<script setup>
import SectionTitle from '~/components/partial/SectionTitle'

const auth = useAuthStore()
const accCookie = useCookie('acc')
const toast = useToast()
const tabList = [{ label: 'As parent' }, { label: 'As child' }]
const input = ref({
  as: { value: '0', error: null },
  parentEmail: { value: null, error: null },
  name: { value: null, error: null },
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
  if (((input.value.as.value === '1' && input.value.parentEmail.value) || input.value.as.value !== '1') && input.value.name.value && input.value.email.value && input.value.pw.value) {
    submitForm()
  }
  input.value.parentEmail.error = input.value.as.value === '1' && !input.value.parentEmail.value ? `Parent's email is required` : null
  input.value.name.error = !input.value.name.value ? 'Name is required' : null
  input.value.email.error = !input.value.email.value ? 'Email is required' : null
  input.value.pw.error = !input.value.pw.value ? 'Password is required' : null
}
// const submitForm = () => {
//   loading.value = true
//   setTimeout(() => {
//     toast.add({ title: 'Hi name 👋', description: 'Ready to know more?' })
//     navigateTo('/home', { replace: true })
//     loading.value = false
//   }, 3000)
// }
const submitForm = async () => {
  loading.value = true
  await auth.register({
    name: input.value.name.value,
    email: input.value.email.value,
    password: input.value.pw.value,
    password_confirmation: input.value.pw.value,
    role: input.value.as.value === '0' ? 'parent' : 'child'
  })
    .then((res) => {
      toast.add({ title: `Hi ${res?.user?.name} 👋`, description: 'Ready to know more?', color: 'success' })
      navigateTo('/home', { replace: true })
    })
    .catch((error) => {
      const description = error.errors 
        ? Object.values(error.errors).flat()[0] 
        : 'Please check your input.'
      toast.add({ title: 'Registration failed', description: description, color: 'error' })
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
      <SectionTitle title="Register" class="text-center" />
      <UTabs v-model="input.as.value" :items="tabList" />
      <UFormField v-if="input.as.value === '1'" label="Parent's email" :error="input.parentEmail.error">
        <UInput
          v-model="input.parentEmail.value"
          type="email"
          placeholder="parentname@mail.com"
          size="xl"
          :disabled="loading"
          class="w-full"
        />
      </UFormField>
      <UFormField label="Name" :error="input.name.error">
        <UInput v-model="input.name.value" placeholder="Jane Marry" size="xl" :disabled="loading" class="w-full" />
      </UFormField>
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
        label="Create a new account"
        size="xl"
        block
        color="primary"
        variant="solid"
        :loading="loading"
        @click="checkForm"
      />
      <USeparator label="Already have an account?" />
      <UButton
        label="Login"
        size="xl"
        block
        color="neutral"
        variant="solid"
        @click="navigateTo('/')"
      />
    </div>
  </div>
</template>

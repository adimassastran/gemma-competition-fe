<script setup>
// const accCookie = useCookie('acc')
const input = ref({
  email: { value: null, error: null },
  pw: { value: null, error: null }
})
const loading = ref(false)

// onMounted(() => {
//   accCookie.value = null
//   navigateTo('/home', { replace: true })
// })

const login = () => {
  alert('Login')
}
</script>

<template>
  <div class="min-h-screen-main flex flex-col">
    <div class="space-y-4 my-auto">
      <div class="flex items-center justify-center gap-2">
        <div class="h-12 w-12 bg-contain bg-center bg-no-repeat" :style="{ backgroundImage: 'url(/img/logo.png)' }" />
        <span class="font-header text-2xl">MenarcheCare</span>
      </div>
      <UFormField label="Email" :error="input.email.error">
        <UInput v-model="input.email.value" placeholder="name@mail.com" size="xl" :disabled="loading" class="w-full" />
      </UFormField>
      <UFormField label="Password" :error="input.pw.error">
        <UInput v-model="input.pw.value" placeholder="Enter ypur password" size="xl" :disabled="loading" class="w-full" />
      </UFormField>
      <UButton
        label="Login"
        size="xl"
        block
        color="primary"
        variant="solid"
        @click="login"
        @keydown.enter="login"
      />
      <USeparator label="Or" />
      <UButton
        label="Register"
        size="xl"
        block
        color="neutral"
        variant="solid"
        @click="navigateTo('/register')"
        @keydown.enter="navigateTo('/register')"
      />
    </div>
  </div>
</template>

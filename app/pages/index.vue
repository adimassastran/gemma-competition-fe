<script setup>
import SectionTitle from '~/components/partial/SectionTitle'

const accCookie = useCookie('acc')
const auth = useAuthStore()
const toast = useToast()
const as = ['Daughter', 'Mother']
const input = ref(null)
const loading = ref(false)

onMounted(() => {
  if (accCookie.value) {
    navigateTo('/home', { replace: true })
  }
})

const login = async () => {
  loading.value = true
  await auth.login({
    email: input.value === as[0] ? 'daughter@mail.com' : 'mother@mail.com',
    password: 'qwertyuiop'
  })
    .then((res) => {
      toast.add({ title: `Hi ${res?.user?.name} 👋`, description: 'Ready to know more?', color: 'success' })
      navigateTo('/home', { replace: true })
    })
    .catch((error) => {
      const description = error.errors 
        ? Object.values(error.errors).flat()[0] 
        : 'Please check your selection.'
      toast.add({ title: 'Wrong credential', description: error?.data?.message, color: 'error' })
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
      <SectionTitle title="Use as" class="text-center" />
      <div class="flex items-center justify-center gap-4">
        <label v-for="(a, i) in as" :index="i" class="flex items-center justify-center w-full aspect-5/3 pt-3 pb-2 px-2 rounded-2xl border-2 border-b-6 outline-offset-2 outline-inverted transform active:translate-y-[4px] active:border-b-2 cursor-pointer bg-neutral-200 border-neutral-400 focus:border-neutral-400/75 focus:border-neutral-400/75 focus-visible:outline-2 has-checked:translate-y-[4px] has-checked:border-b-2 has-checked:bg-primary-400/75 has-checked:border-primary-600/75 dark:!bg-neutral-700 dark:border-neutral-800 dark:focus:border-neutral-800/75 dark:focus:border-neutral-800/75 dark:has-checked:!bg-primary-400/75">
          <input v-model="input" type="radio" name="radioAs" :value="a" class="fixed -top-12 -left-12 opacity-0 peer" />
          <span>{{ a }}</span>
        </label>
      </div>
      <UButton
        label="Start"
        size="xl"
        block
        color="primary"
        variant="solid"
        :loading="loading"
        @click="login"
      />
    </div>
  </div>
</template>

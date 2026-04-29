<script setup>
import { id } from '@nuxt/ui/locale'
import SplashScreen from '~/components/partial/SplashScreen'
import UnderMaintenance from '~/components/partial/UnderMaintenance'
import ErrorOffline from '~/components/partial/ErrorOffline'
import ModalSetting from '~/components/partial/ModalSetting'

const modalSetting = ref()

useHead({
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  link: [{ rel: 'icon', href: '/favicon.png' }],
  htmlAttrs: { lang: 'en' },
  titleTemplate: titleChunk => titleChunk ? `${titleChunk} | MenarcheCare` : 'MenarcheCare',
  description: 'MenarcheCare adalah sebuah Web Application interaktif dan edukatif yang dirancang untuk mengatasi rendahnya literasi menstruasi dan buruknya komunikasi ibu-anak yang sering kali memicu kecemasan pada anak perempuan saat menghadapi menarche (menstruasi pertama). Dengan memanfaatkan kecerdasan model Gemma 4, aplikasi ini menyediakan ruang diskusi yang aman, personalisasi pembelajaran, serta dasbor analitik bagi ibu untuk membantu mendampingi anak melewati fase pubertas dengan pendekatan saintifik dan sosial yang inklusif.'
})

const toaster = {
  position: 'bottom-center',
  duration: 5000,
  max: 0
}
const splashScreenVisible = ref(true)
const showSplashScreen = ref(true)

onMounted(() => {
  setTimeout(() => splashScreenVisible.value = false, 1000)
  setTimeout(() => showSplashScreen.value = false, 1300)
})
</script>

<template>
  <UApp :locale="id" :toaster="toaster">
    <UMain>
      <div>
        <div class="fixed top-0 left-0 h-dvh w-dvw">
          <div class="content-space h-full bg-neutral-100 bg-contain bg-center bg-no-repeat shadow-xl dark:bg-neutral-900" style="background-size: 64px;" :style="{ backgroundImage: 'url(/img/logo.png)' }" />
        </div>
        <SplashScreen v-if="showSplashScreen" class="duration-300" :class="{ 'opacity-0': !splashScreenVisible }" style="z-index: 13;" />
        <div class="content-space relative min-h-dvh px-2 bg-neutral-100 sm:px-4 lg:px-2 dark:bg-neutral-900">
          <UnderMaintenance v-if="$underMaintenance" />
          <div v-else>
            <NuxtPage />
            <ErrorOffline />
          </div>
          <UButton icon="lets-icons:meatballs-menu" color="primary" variant="solid" class="setting-btn rounded-full" @click="modalSetting.open()" />
        </div>
        <ModalSetting ref="modalSetting" />
      </div>
    </UMain>
  </UApp>
</template>

<style>
  .setting-btn {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    @media(min-width: 640px) { right: 1.5rem; }
    @media(min-width: 1024px) { right: calc(((100dvw - 28rem) / 2) + .5rem); }
  }
</style>

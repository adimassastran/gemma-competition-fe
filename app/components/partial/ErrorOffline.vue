<script setup>
import { useOnline } from '@vueuse/core'

const isOnline = useOnline()
const loading = ref(false)

const checkConnection = () => {
  loading.value = true
  setTimeout(() => loading.value = false, 5000)
}
</script>

<template>
  <div class="fixed top-0 left-0 h-dvh w-dvw transform duration-300" :class="{ 'translate-y-full': isOnline }" style="z-index: 13;">
    <div class="content-space flex flex-col gap-4 items-center min-h-dvh py-4 px-2 bg-neutral-100 sm:px-4 lg:px-2 dark:bg-neutral-900">
      <div class="flex flex-col items-center justify-center h-full max-w-xs space-y-4 my-auto">
        <div class="bg-contain bg-center bg-no-repeat" :style="{ backgroundImage: 'url(/img/illu/error-noInternet.png)' }">
          <img src="/img/illu/error-noInternet.png" class="h-full invisible">
        </div>
        <div class="font-header text-center text-xl text-primary">
          Internet disconnected
        </div>
        <div class="text-center">
          Looks like your internet connection is unstable or disconnected. Please check your Wi-Fi or mobile data, then try refreshing.
        </div>
      </div>
      <UButton
        size="xl"
        color="primary"
        variant="solid"
        label="Reload"
        block
        :loading="loading"
        :disabled="loading"
        @click="checkConnection"
      />
    </div>
  </div>
</template>

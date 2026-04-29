<script setup>
defineProps(['error'])
</script>

<template>
  <div class="content-space flex flex-col items-center justify-center h-full min-h-dvh w-full space-y-4 py-4 px-2 text-center bg-neutral-100 sm:px-4 lg:px-2 dark:bg-neutral-900">
    <div class="flex flex-col items-center justify-center h-full space-y-4">
      <template v-if="error.statusCode === 404 || error.statusCode === 500">
        <div class="bg-contain bg-center bg-no-repeat" :style="{ backgroundImage: `url(/img/illu/error-${error.statusCode}.png)` }">
          <img :src="`/img/illu/error-${error.statusCode}.png`" class="h-full invisible">
        </div>
        <div class="font-semibold text-center text-xl text-primary">
          {{ error.statusCode === 404 ? 'Kamu Tersesat?' : 'Ups..' }}
        </div>
        <div>
          {{ error.statusCode === 404 ? 'Sepertinya kamu begitu menikmati hingga akhirnya tersesat.' : 'Sepertinya terjadi kendala pada server kami.' }}
        </div>
      </template>
      <template v-else>
        <div class="font-semibold text-center text-xl text-primary">
          {{ error.statusCode }}
        </div>
        <div>
          Terjadi kesalahan
        </div>
      </template>
    </div>
    <UButton
      icon="lets-icons:arrow-left"
      size="xl"
      color="primary"
      variant="solid"
      label="Kembali"
      block
      @click="$router.back()"
    />
    <div class="text-center opacity-50">
      {{ $verNum }}
    </div>
  </div>
</template>
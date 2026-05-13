<script setup>
defineProps(['error'])
</script>

<template>
  <div class="content-space flex flex-col items-center justify-center h-full min-h-dvh w-full space-y-4 py-4 px-2 text-center bg-neutral-100 sm:px-4 lg:px-2 dark:bg-neutral-900">
    <div class="flex flex-col items-center justify-center h-full space-y-4">
      <template v-if="error.statusCode === 404 || error.statusCode === 500">
        <div class="bg-contain bg-center bg-no-repeat" :style="{ backgroundImage: `url(/img/illu/error-${error.statusCode}.svg)` }">
          <img :src="`/img/illu/error-${error.statusCode}.svg`" class="h-full invisible">
        </div>
        <div class="font-header text-center text-xl text-primary">
          {{ error.statusCode === 404 ? 'Are you lost?' : 'Oops..' }}
        </div>
        <div>
          {{ error.statusCode === 404 ? 'Looks like you got so into it that you ended up lost.' : 'Looks like there’s an issue with our server. We will fix it soon, please try again later.' }}
        </div>
      </template>
      <template v-else>
        <div class="font-header text-center text-xl text-primary">
          {{ error.statusCode }}
        </div>
        <div>
          Something went wrong
        </div>
      </template>
    </div>
    <UButton
      icon="lets-icons:arrow-left"
      size="xl"
      color="primary"
      variant="solid"
      label="Back"
      block
      @click="$router.back()"
    />
    <div class="text-center opacity-50">
      {{ $verNum }}
    </div>
  </div>
</template>
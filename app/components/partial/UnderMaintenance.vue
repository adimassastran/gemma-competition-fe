<template>
  <div class="flex flex-col items-center justify-center h-full min-h-dvh py-4">
    <div class="max-w-xs space-y-4">
      <div class="bg-contain bg-center bg-no-repeat" :style="{ backgroundImage: 'url(/img/illu/maintenance.png)' }">
        <img src="/img/illu/maintenance.png" class="h-full invisible">
      </div>
      <div class="font-semibold text-center text-xl text-primary">
        Under maintenance
      </div>
      <div class="text-center">
        Sorry, the app’s under maintenance right now. We’re fixing things up to make it smoother for you. Try again in a bit, okay?
      </div>
    </div>
  </div>
</template>

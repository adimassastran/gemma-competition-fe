<script setup>
import ModalSetting from '~/components/partial/ModalSetting'
import Parent from '~/components/functional/dashboard/Parent'

useHead({ title: 'Dashboard' })

const modalSetting = ref()
</script>

<template>
  <div class="min-h-screen-main pt-4 space-y-12">
    <div class="flex items-end justify-between gap-4 w-full">
      <div>
        <div class="text-3xl font-bold">
          Hi {user} 👋
        </div>
        <div class="text-gray-400">
          What are you looking for today?
        </div>
      </div>
      <UButton icon="lets-icons:meatballs-menu" color="neutral" variant="solid" class="rounded-full" @click="modalSetting.open()" />
      <ModalSetting ref="modalSetting" />
    </div>
    <Parent />
  </div>
</template>

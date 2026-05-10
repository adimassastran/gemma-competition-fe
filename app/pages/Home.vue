<script setup>
import ModalSetting from '~/components/partial/ModalSetting'

useHead({ title: 'Home' })

const modalSetting = ref()
const Parent = defineAsyncComponent(() => import('~/components/functional/dashboard/Parent'))
const Child = defineAsyncComponent(() => import('~/components/functional/dashboard/Child'))
const user = {
  name: 'Mita',
  role: 'child' // parent, child
}
</script>

<template>
  <div class="min-h-screen-main pt-4 space-y-12">
    <div class="flex items-end justify-between gap-4 w-full">
      <div>
        <div class="text-3xl font-bold">
          Hi {{ user.name }} 👋
        </div>
        <div class="text-neutral-400">
          {{ user.role === 'parent' ? 'What are you looking for today?' : 'What do you wanna know today?' }}
        </div>
      </div>
      <UButton icon="lets-icons:meatballs-menu" color="neutral" variant="solid" class="rounded-full" @click="modalSetting.open()" />
      <ModalSetting ref="modalSetting" />
    </div>
    <Parent v-if="user.role === 'parent'" />
    <Child v-if="user.role === 'child'" />
  </div>
</template>

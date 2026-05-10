<script setup>
import SectionTitle from '~/components/partial/SectionTitle'

const showModal = ref(false)
const detail = ref(null)

const emit = defineEmits(['next', 'done'])

const open = (d) => {
  detail.value = d
  showModal.value = true
}
const next = () => {
  emit('next')
  if (!detail.value?.isLast) {
    showModal.value = false
  }
}
const openFormEdit = (d) => {
  trxCookie.value = d
  navigateTo('/trx/edit')
}

defineExpose({ open })
</script>

<template>
  <UDrawer v-model:open="showModal" :overlay="false" :dismissible="false" :handle="false" class="content-space">
    <template #title>
      <SectionTitle v-if="detail?.type" :title="detail.type === 'right' ? 'Right answer 👍' : detail.type === 'wrong' ? 'Wrong answer 😢' : detail.type === 'score' ? 'Your score' : detail.type" :class="{ 'text-center': detail.type === 'score' }" />
    </template>
    <template #body>
      <div v-if="detail?.type === 'wrong'" class="space-y-4">
        <div class="flex gap-2 pt-3 pb-2 px-2 rounded-2xl border-2 bg-primary-400/75 border-primary-600/75 text-lg font-bold">
          {{ detail.right }}
        </div>
        <div>
          {{ detail.explanation }}
        </div>
      </div>
      <div v-if="detail?.type === 'score'" class="font-header text-9xl text-center !font-bold">
        {{ detail.score }}
      </div>
    </template>
    <template #footer>
      <UButton
        v-if="detail?.type !== 'score'"
        :label="detail?.isLast ? 'See my score' : 'Next question'"
        size="xl"
        block
        color="primary"
        variant="solid"
        @click="next"
        @keydown.enter="next"
      />
      <UButton
        v-else
        label="Back to main page"
        size="xl"
        block
        color="primary"
        variant="solid"
        @click="emit('done')"
        @keydown.enter="emit('done')"
      />
    </template>
  </UDrawer>
</template>

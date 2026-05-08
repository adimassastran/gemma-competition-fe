<script setup>
import PageNavbar from '~/components/partial/PageNavbar'
import ErrorData404 from '~/components/partial/ErrorData404'

useHead({ title: 'Quick learning' })

const input = ref(null)
const loading = ref(false)
const localData = ref([])
</script>

<template>
  <div class="min-h-screen-main">
    <PageNavbar title="Quick learning" transparent :trigger-scroll-height="2" class="h-20" />
    <ErrorData404 v-if="localData.length < 1">
      Ask something to start learning 😉
    </ErrorData404>
    <UTextarea
      v-model="input"
      :placeholder="loading ? 'Waiting for answer' : localData.length < 1 ? 'Ask something..' : 'Ask more, understand more..'"
      size="xl"
      :disabled="loading"
      :loading="loading"
      :rows="1"
      :maxrows="5"
      autoresize
      variant="subtle"
      class="w-full rounded-2xl transform duration-300"
    />
  </div>
</template>

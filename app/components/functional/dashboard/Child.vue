<script setup>
import { LineChart } from 'vue-chrts'
import SectionTitle from '~/components/partial/SectionTitle'
import ErrorData404 from '~/components/partial/ErrorData404'

const monitor = useMonitorStore()
const loading = ref(true)
const mainMenu = [
  { name: 'Take a quiz', desc: 'Check your understanding now', id: 'quiz' },
  { name: 'Quick learning', desc: 'Start learning with personal AI now', id: 'learn' },
]

onMounted(async () => {
  await monitor.getAll().then(() => loading.value = false)
})
</script>

<template>
  <div v-if="loading || monitor.all?.data" class="space-y-8">
    <div class="grid grid-cols-1 gap-2">
      <div class="col-span-1">
        <div class="py-2 px-3 rounded-2xl border border-neutral-300 bg-white dark:bg-neutral-800 dark:border-neutral-700">
          <span class="text-lg font-bold opacity-50">Overall understanding</span>
          <div class="text-3xl font-bold mt-2">
            57%
          </div>
        </div>
      </div>
    </div>
    <div>
      <SectionTitle title="Learn" class="mb-4" />
      <div class="grid grid-cols-2 gap-2">
        <div v-for="(m, i) in mainMenu" :index="i" class="col-span-1">
          <div class="pt-3 pb-2 px-2 rounded-2xl border border-neutral-300 bg-white cursor-pointer transform duration-300 active:scale-90 dark:bg-neutral-800 dark:border-neutral-700" @click="navigateTo(`/${m.id}`)">
            <span class="text-lg font-bold">{{ m.name }}</span>
            <div class="text-gray-400 pt-12 mt-auto">
              {{ m.desc }}
            </div>
            <div class="flex justify-end w-full mt-2">
              <div class="h-7 w-7 p-1 rounded-full ml-auto bg-neutral-800/10 dark:bg-white/25">
                <UIcon name="lets-icons:arrow-right" class="size-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ErrorData404 v-else>
    No kid activity to monitor yet
  </ErrorData404>
</template>

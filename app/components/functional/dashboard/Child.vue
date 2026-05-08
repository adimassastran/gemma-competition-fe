<script setup>
import { LineChart } from 'vue-chrts'
import SectionTitle from '~/components/partial/SectionTitle'
import ErrorData404 from '~/components/partial/ErrorData404'

const monitor = useMonitorStore()
const loading = ref(true)
const mainMenu = [
  { name: 'Take a quiz', desc: 'Check your understanding now', id: 'quiz' },
  { name: 'Quick learn', desc: 'Start learning with personal AI now', id: 'learn' },
]

onMounted(async () => {
  await monitor.getAll().then(() => loading.value = false)
})
</script>

<template>
  <div v-if="loading || monitor.all?.data" class="space-y-8">
    <div class="grid grid-cols-1 gap-2">
      <div class="col-span-1">
        <div class="py-2 px-3 rounded-2xl border border-neutral-400 bg-neutral-200 dark:bg-neutral-700 dark:border-neutral-700">
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
          <div tabindex="0" class="pt-3 pb-2 px-2 rounded-2xl border-2 border-b-6 outline-offset-2 outline-inverted transform active:translate-y-[4px] active:border-b-2 cursor-pointer bg-neutral-200 border-neutral-400 focus:border-neutral-400/75 focus:border-neutral-400/75 focus-visible:outline-2 dark:!bg-neutral-700 dark:border-neutral-800 dark:focus:border-neutral-800/75 dark:focus:border-neutral-800/75" @click="navigateTo(`/${m.id}`)" @keydown.enter="navigateTo(`/${m.id}`)">
            <span class="text-lg font-bold">{{ m.name }}</span>
            <div class="text-neutral-500 pt-12 mt-auto dark:text-neutral-400">
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

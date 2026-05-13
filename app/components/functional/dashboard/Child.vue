<script setup>
import LoadingSpinner from '~/components/partial/LoadingSpinner'
import SectionTitle from '~/components/partial/SectionTitle'
import ErrorData404 from '~/components/partial/ErrorData404'

const stat = useStatStore()
const loading = ref(true)
const mainMenu = [
  { name: 'Take a quiz', desc: 'Check your understanding now', id: 'quiz' },
  { name: 'Quick learn', desc: 'Start learning with personal AI now', id: 'learn' },
]
const chartData = ref([])

onMounted(async () => {
  await stat.get().then(() => {
    chartData.value = stat.stat.history.slice().reverse().map(item => ({
      date: item.date,
      score: item.score
    }))
    loading.value = false
  })
})

const xFormatter = (i) => chartData.value[i]?.date || ''
const yFormatter = (tick) => `${tick}%`

const chartCategories = computed(() => ({
  score: {
    name: 'Quiz score',
    color: 'var(--ui-primary)'
  }
}))
</script>

<template>
  <div class="space-y-8">
    <div v-if="loading || stat.stat" class="grid grid-cols-2 gap-2">
      <div class="col-span-1">
        <div class="flex flex-col justify-between h-full py-2 px-3 rounded-2xl border border-neutral-400 bg-neutral-200 dark:bg-neutral-700 dark:border-neutral-700">
          <span class="text-lg font-bold opacity-50">Overall understanding</span>
          <LoadingSpinner v-if="loading" class="mt-4" />
          <div v-else class="text-3xl font-bold mt-2">
            {{ stat.stat.total_score / stat.stat.total_question * 100 }}%
          </div>
        </div>
      </div>
      <div class="col-span-1">
        <div class="flex flex-col justify-between h-full py-2 px-3 rounded-2xl border border-neutral-400 bg-neutral-200 dark:bg-neutral-700 dark:border-neutral-700">
          <span class="text-lg font-bold opacity-50">Quiz taken</span>
          <LoadingSpinner v-if="loading" class="mt-4" />
          <div v-else class="text-3xl font-bold mt-2">
            {{ stat.stat.total_quiz_taken }}
          </div>
        </div>
      </div>
      <div class="col-span-2">
        <div class="py-2 px-3 rounded-2xl border border-neutral-400 bg-neutral-200 dark:bg-neutral-700 dark:border-neutral-700">
          <span class="text-lg font-bold opacity-50">Learning progress</span>
          <LoadingSpinner v-if="loading" class="mt-4" />
          <div v-else class="text-3xl font-bold mt-2">
            <BarChart
              :data="chartData"
              :height="300"
              :categories="chartCategories"
              :y-axis="['score']"
              :x-num-ticks="chartData.length"
              :radius="6"
              :y-grid-line="true"
              :x-formatter="xFormatter"
              :y-formatter="yFormatter"
              legend-position="top-right"
              :hide-legend="false"
            />
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
</template>

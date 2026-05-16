<script setup>
import LoadingSpinner from '~/components/partial/LoadingSpinner'
import SectionTitle from '~/components/partial/SectionTitle'
import ErrorData404 from '~/components/partial/ErrorData404'

const stat = useStatStore()
const loading = ref(true)
const chartData = ref([])

onMounted(async () => {
  await stat.getChild().then(() => {
    chartData.value = stat.statChild.history.slice().reverse().map(item => ({
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
  <div v-if="loading || stat.statChild">
    <SectionTitle :title="`${stat.statChild.child_name}'s progress`" class="mb-4" />
    <div class="grid grid-cols-2 gap-2">
      <div class="col-span-1">
        <div class="flex flex-col justify-between h-full py-2 px-3 rounded-2xl border border-neutral-400 bg-neutral-200 dark:bg-neutral-700 dark:border-neutral-700">
          <span class="text-lg font-bold opacity-50">Overall understanding</span>
          <LoadingSpinner v-if="loading" class="mt-4" />
          <div v-else class="flex items-center justify-between">
            <div class="text-3xl font-bold mt-2">
              {{ stat.statChild.total_score && stat.statChild.total_question ? Math.round(stat.statChild.total_score / stat.statChild.total_question * 100) : 0 }}%
            </div>
            <DonutChart
              :data="[
                  { name: 'Total', percentage: 100 - (stat.statChild.total_score / stat.statChild.total_question * 100) },
                  { name: 'Score', percentage: stat.statChild.total_score / stat.statChild.total_question * 100 }
                ].map((i) => i.percentage)"
              :height="36"
              :arc-width="8"
              :categories="{
                Total: { name: 'Total', color: 'transparent' },
                Score: { name: 'Score', color: 'var(--ui-primary)' }
              }"
              hide-legend
              hide-tooltip
              :radius="6"
              style="width: 36px;"
            />
          </div>
        </div>
      </div>
      <div class="col-span-1">
        <div class="flex flex-col justify-between h-full py-2 px-3 rounded-2xl border border-neutral-400 bg-neutral-200 dark:bg-neutral-700 dark:border-neutral-700">
          <span class="text-lg font-bold opacity-50">Quiz taken</span>
          <LoadingSpinner v-if="loading" class="mt-4" />
          <div v-else class="text-3xl font-bold mt-2">
            {{ stat.statChild.total_quiz_taken }}
          </div>
        </div>
      </div>
      <div class="col-span-2">
        <div class="py-2 px-3 rounded-2xl border border-neutral-400 bg-neutral-200 dark:bg-neutral-700 dark:border-neutral-700">
          <span class="text-lg font-bold opacity-50">Learning progress</span>
          <LoadingSpinner v-if="loading" class="mt-4" />
          <BarChart
            v-else
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
            class="mt-2 -mx-3"
          />
        </div>
      </div>
    </div>
  </div>
  <ErrorData404 v-else>
    No kid activity to monitor yet
  </ErrorData404>
</template>

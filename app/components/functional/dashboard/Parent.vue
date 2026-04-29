<script setup>
import { LineChart } from 'vue-chrts'
import SectionTitle from '~/components/partial/SectionTitle'
import ErrorData404 from '~/components/partial/ErrorData404'

const monitor = useMonitorStore()
const loading = ref(true)

onMounted(async () => {
  await monitor.getAll().then(() => loading.value = false)
})
</script>

<template>
  <div v-if="loading || monitor.all?.data" class="space-y-8">
    <div class="grid grid-cols-1 gap-4">
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
      <SectionTitle title="Section name" class="mb-4" />
      <div class="grid grid-cols-1 gap-4">
        <div class="col-span-1">
          <LineChart
            :data="monitor.all.data"
            :categories="{
              sales: { name: 'Sales', color: '#3b82f6' },
              profit: { name: 'Profit', color: '#10b981' }
            }"
            :height="300"
            :xFormatter="i => monitor.all.data[i].month"
            xLabel="Month"
            yLabel="Amount"
          />
        </div>
      </div>
    </div>
  </div>
  <ErrorData404 v-else>
    No kid activity to monitor yet
  </ErrorData404>
</template>

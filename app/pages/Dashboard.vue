<script setup>
import { LineChart } from 'vue-chrts'
import PageNavbar from '~/components/partial/PageNavbar'
import SectionTitle from '~/components/partial/SectionTitle'
import ErrorData404 from '~/components/partial/ErrorData404'

useHead({ title: 'Dashboard' })

const monitor = useMonitorStore()
const loading = ref(true)

onMounted(async () => {
  await monitor.getAll().then(() => loading.value = false)
})
</script>

<template>
  <div class="min-h-screen-main">
    <PageNavbar title="Dashboard" transparent :trigger-scroll-height="2" class="h-20" />
    <div v-if="loading || monitor.all?.data" class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
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
    <div v-else class="flex items-center w-full" style="height: calc(100dvh - (5rem + 2rem);">
      <ErrorData404>
        No kid activity to monitor yet
      </ErrorData404>
    </div>
  </div>
</template>

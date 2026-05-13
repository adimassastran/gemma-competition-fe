export default defineNuxtPlugin(() => {
  const underMaintenance = false
  const verNum = 'v1.3.0'
  const dayDiff = (d1 = new Date(), d2 = new Date()) => {
    const dt1 = new Date(d1)
    const dt2 = new Date(d2)
    dt1.setHours(0, 0, 0, 0)
    dt2.setHours(0, 0, 0, 0)
    const diffTime = dt1.getTime() - dt2.getTime()
    const diffDay = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    return diffDay
  }
  return {
    provide: {
      underMaintenance,
      verNum,
      dayDiff
    }
  }
})

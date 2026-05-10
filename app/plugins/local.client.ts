export default defineNuxtPlugin(() => {
  const underMaintenance = false
  const verNum = 'v0.1.6'
  return {
    provide: {
      underMaintenance,
      verNum
    }
  }
})

export default defineNuxtPlugin(() => {
  const underMaintenance = false
  const verNum = 'v0.1.8'
  return {
    provide: {
      underMaintenance,
      verNum
    }
  }
})

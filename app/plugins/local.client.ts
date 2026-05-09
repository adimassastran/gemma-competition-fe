export default defineNuxtPlugin(() => {
  const underMaintenance = false
  const verNum = 'v0.1.3'
  return {
    provide: {
      underMaintenance,
      verNum
    }
  }
})

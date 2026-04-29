export default defineNuxtPlugin(() => {
  const underMaintenance = false
  const verNum = 'v0.1.0'
  return {
    provide: {
      underMaintenance,
      verNum
    }
  }
})

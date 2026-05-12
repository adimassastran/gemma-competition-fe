export default defineNuxtPlugin(() => {
  const underMaintenance = false
  const verNum = 'v1.0.0'
  return {
    provide: {
      underMaintenance,
      verNum
    }
  }
})

export default defineNuxtPlugin(() => {
  const underMaintenance = false
  const verNum = 'v0.1.7'
  return {
    provide: {
      underMaintenance,
      verNum
    }
  }
})

export default defineNuxtPlugin(() => {
  const underMaintenance = false
  const verNum = 'v0.1.1'
  return {
    provide: {
      underMaintenance,
      verNum
    }
  }
})

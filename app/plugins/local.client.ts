export default defineNuxtPlugin(() => {
  const underMaintenance = false
  const verNum = 'v0.1.4'
  return {
    provide: {
      underMaintenance,
      verNum
    }
  }
})

export const useMonitorStore = defineStore('monitor', () => {
  const all = ref({})

  const setAll = data => all.value = data

  const getAll = async () => {
    try {
      const res = {
        data: [
          { month: 'Jan', sales: 100, profit: 50 },
          { month: 'Feb', sales: 120, profit: 55 },
          { month: 'Mar', sales: 180, profit: 80 },
          { month: 'Apr', sales: 110, profit: 40 },
          { month: 'May', sales: 90, profit: 30 },
        ]
      }
      setAll(res)
    }
    catch (error) { setAll(error) }
  }

  return {
    all,
    getAll
  }
})

export const useStatStore = defineStore('stat', () => {
  const stat = ref({})

  const set = data => stat.value = data

  const get = async () => {
    try {
      const res = await fetchApi('quiz-stats', { method: 'get' })
      set(res)
    }
    catch (error) {
      throw error.data
    }
  }

  return {
    stat,
    get
  }
})

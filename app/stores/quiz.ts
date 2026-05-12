export const useQuizStore = defineStore('quiz', () => {
  const stcQuizAll = ref(null)

  const all = ref({})

  const setAll = data => all.value = data

  const getAll = async () => {
    if (process.client) {
      stcQuizAll.value = JSON.parse(localStorage.getItem('stcQuizAll'))
    }
    if (useNuxtApp().$dayDiff(stcQuizAll.value?.since) <= 14 && stcQuizAll.value?.data) {
      setAll(stcQuizAll.value.data)
    }
    else {
      try {
        const res = await fetchApi('questions', { method: 'get' })
        setAll(res)
        if (process.client) {
          localStorage.setItem('stcQuizAll', JSON.stringify({ since: new Date(), data: res }))
        }
        return res 
      }
      catch (error) {
        throw error.data
      }
    }
  }

  return {
    all,
    getAll
  }
})

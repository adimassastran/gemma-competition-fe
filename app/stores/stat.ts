export const useStatStore = defineStore('stat', () => {
  const stat = ref({})
  const statChild = ref({})

  const set = data => stat.value = data
  const setChild = data => statChild.value = data

  const get = async () => {
    try {
      const res = await fetchApi('quiz-stats', { method: 'get' })
      set(res)
    }
    catch (error) {
      throw error.data
    }
  }
  const getChild = async () => {
    try {
      const res = await fetchApi('child-stats', { method: 'get' })
      setChild(res)
    }
    catch (error) {
      throw error.data
    }
  }

  return {
    stat,
    statChild,
    get,
    getChild
  }
})

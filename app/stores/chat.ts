export const useChatStore = defineStore('chat', () => {
  const all = ref({})

  const setAll = data => all.value = data

  const getAll = async () => {
    try {
      const res = await fetchApi('chat/history', { method: 'get' })
      setAll(res)
      return res 
    }
    catch (error) {
      throw error.data
    }
  }
  const send = async (data) => {
    try {
      return await fetchApi('chat/send', { method: 'post', body: data })
    }
    catch (error) {
      throw error.data
    }
  }

  return {
    all,
    getAll,
    send
  }
})

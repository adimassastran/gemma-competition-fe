export const useChatStore = defineStore('chat', () => {
  const stcChatAll = ref(null)

  const all = ref({})

  const setAll = data => all.value = data

  const getAll = async () => {
    if (process.client) {
      stcChatAll.value = JSON.parse(localStorage.getItem('stcChatAll'))
    }
    if (useNuxtApp().$dayDiff(stcChatAll.value?.since) <= 14 && stcChatAll.value?.data) {
      setAll(stcChatAll.value.data)
    }
    else {
      try {
        const res = await fetchApi('chat/history', { method: 'get' })
        setAll(res)
        if (process.client) {
          localStorage.setItem('stcChatAll', JSON.stringify({ since: new Date(), data: res }))
        }
        return res 
      }
      catch (error) {
        throw error.data
      }
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

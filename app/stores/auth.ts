export const useAuthStore = defineStore('auth', () => {
  const accCookie = useCookie('acc')
  const atokCookie = useCookie('atok')

  const register = async (data) => {
    try {
      const res = await fetchApi('register', { method: 'post', body: data })
      accCookie.value = res.user
      atokCookie.value = res.token
      return res 
    }
    catch (error) {
      throw error.data
    }
  }
  const login = async (data) => {
    try {
      const res = await fetchApi('login', { method: 'post', body: data })
      accCookie.value = res.user
      atokCookie.value = res.token
      return res 
    }
    catch (error) {
      throw error.data
    }
  }

  return {
    register,
    login
  }
})

export const useAuthStore = defineStore('auth', () => {
  const accCookie = useCookie('acc')
  const atokCookie = useCookie('atok')

  const profile = ref({})

  const setProfile = data => profile.value = data

  const register = async (data) => {
    try {
      const res = await fetchApi('register', { method: 'post', body: data })
      accCookie.value = res.user
      atokCookie.value = res.token
      setProfile(res)
      return res 
    }
    catch (error) {
      setProfile(error)
      throw error.data
    }
  }
  const login = async (data) => {
    try {
      const res = await fetchApi('login', { method: 'post', body: data })
      accCookie.value = res.user
      atokCookie.value = res.token
      setProfile(res)
      return res 
    }
    catch (error) {
      setProfile(error)
      throw error.data
    }
  }

  return {
    profile,
    register,
    login
  }
})

export const useAuthStore = defineStore('auth', () => {
  const profile = ref({})

  const setProfile = data => profile.value = data

  const register = async (data) => {
    try {
      const res = await fetchApi('register', { method: 'post', body: data })
      const accCookie = useCookie('acc')
      const atokCookie = useCookie('atok')
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
    register
  }
})

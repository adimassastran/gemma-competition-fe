export const fetchApi = async (path, data) => {
  const atokCookie = useCookie('atok')
  const accCookie = useCookie('acc')
  const route = useRoute()
  const { $toast } = useNuxtApp()
  return await $fetch(`${useRuntimeConfig().public.apiBaseUrl}api/${path}`, {
    ...data,
    headers: atokCookie.value
      ? { Authorization: `Bearer ${atokCookie.value.token}` }
      : {}
  })
    .then((res) => {
      console.log('FETCH', res)
      return res
    })
    .catch((error) => {
      if (error.response.status === 401 && route.path === '/') {
        atokCookie.value = null
        accCookie.value = null
        throw error
      }
      else if (error.response.status === 401) {
        atokCookie.value = null
        accCookie.value = null
        $toast.error('Your account is not registered, try to login again')
        navigateTo('/', { replace: true })
      }
      else {
        throw error
      }
    })
}

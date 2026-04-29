export const fetchApi = async (payload) => {
  const data = await $fetch('/api/gsheet', {
    method: 'POST',
    body: {
      ...payload,
      X_API_KEY: useRuntimeConfig().public.apiKey
    }
  })

  if (!data.success) {
    throw new Error(data.error.message)
  }

  return data.data
}

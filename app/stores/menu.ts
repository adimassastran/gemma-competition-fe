export const useMenuStore = defineStore('menu', () => {
  const stcMenuAll = ref(null)

  const all = ref({})

  const setAll = data => all.value = data

  const getAll = async () => {
    if (process.client) {
      stcMenuAll.value = JSON.parse(localStorage.getItem('stcMenuAll'))
    }
    if (useNuxtApp().$dayDiff(stcMenuAll.value?.since) <= 14 && stcMenuAll.value?.data) {
      setAll(stcMenuAll.value.data)
    }
    else {
      try {
        const res = await fetchApi({ action: 'getMenu' })
        const formattedData = []
        res.map((i) => {
          formattedData.push({
            value: i.Name,
            label: `${i.Name} (${useNuxtApp().$formatCurrency(i.Price)})`,
            price: i.Price
          })
        })
        setAll(formattedData)
        if (process.client) {
          localStorage.setItem('stcMenuAll', JSON.stringify({ since: new Date(), data: formattedData }))
        }
      }
      catch (error) { setAll(error) }
    }
  }

  return {
    all,
    getAll
  }
})

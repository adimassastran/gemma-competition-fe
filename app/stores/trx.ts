export const useTrxStore = defineStore('trx', () => {
  const stcTrxAll = ref(null)
  const currentDate = new Date()
  currentDate.setHours(0,0,0,0)
  currentDate.toISOString()

  const all = ref({})
  const allFull = ref({})

  const setAll = data => all.value = data
  const setAllFull = data => allFull.value = data

  const getAll = async (data) => {
    if (process.client) {
      stcTrxAll.value = JSON.parse(localStorage.getItem('stcTrxAll'))
    }
    if (useNuxtApp().$dayDiff(stcTrxAll.value?.since) < 1 && stcTrxAll.value?.data) {
      setAll(stcTrxAll.value.data)
    }
    else {
      try {
        const res = await fetchApi({ ...data, action: 'get' })
        setAll(res)
        if (process.client) {
          localStorage.setItem('stcTrxAll', JSON.stringify({ since: currentDate, data: res }))
        }
      }
      catch (error) { setAll(error) }
    }
  }
  const getAllFull = async (data) => {
    try {
      const res = await fetchApi({ ...data, action: 'getFull' })
      setAllFull(res)
    }
    catch (error) {
      setAllFull(error)
    }
  }
  const add = async (data) => {
    const res = await fetchApi({ ...data, action: 'create' })
    if (res.data && process.client) {
      const resData = JSON.parse(localStorage.getItem('stcTrxAll'))
      resData?.data?.unshift(res.data)
      localStorage.setItem('stcTrxAll', JSON.stringify(resData))
    }
    return res
  }
  const edit = async (data) => {
    const res = await fetchApi({ ...data, action: 'update' })
    if (res.data && process.client) {
      let resData = JSON.parse(localStorage.getItem('stcTrxAll'))
      if (resData.data) {
        resData.data[resData.data.findIndex(d => d.TransactionID === data.TransactionID)] = res.data
        localStorage.setItem('stcTrxAll', JSON.stringify(resData))
      }
    }
    return res
  }
  const editStatus = async (data) => {
    const res = await fetchApi({ ...data, action: 'updateStatus' })
    if (res && process.client) {
      let resData = JSON.parse(localStorage.getItem('stcTrxAll'))
      if (resData.data) {
        resData.data[resData.data.findIndex(d => d.TransactionID === data.TransactionID)].Status = data.Status
        localStorage.setItem('stcTrxAll', JSON.stringify(resData))
      }
    }
    return res
  }

  return {
    all,
    allFull,
    getAll,
    getAllFull,
    add,
    edit,
    editStatus
  }
})

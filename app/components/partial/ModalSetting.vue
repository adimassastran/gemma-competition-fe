<script setup>
import SectionTitle from '~/components/partial/SectionTitle'

const colorMode = useColorMode()
const showModal = ref(false)
const menuList =  [
  { id: 'colorTheme', label: 'Change color theme', icon: 'lamp' },
  { id: 'clearData', label: 'Log out', icon: 'sign-out-squre' }
]

onMounted(() => {
  window.addEventListener('popstate', () => {
    if (showModal.value) {
      showModal.value = false
      history.pushState(null, '')
    }
  })
})

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set(_isDark) {
    colorMode.preference = _isDark ? 'dark' : 'light'
  }
})

const open = () => { showModal.value = true }
const doAction = (id) => {
  if (id === menuList[0].id) {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
  else if (id === menuList[1].id) {
    navigateTo('/', { replace: true })
    const ls = Object.keys(localStorage)
    const lsL = ls?.length
    ls.forEach((l, i) => {
      if (l.slice(0, 3) === 'stc') {
        localStorage.removeItem(l)
      }
    })
    const cookieList = document.cookie.split(';')
    cookieList.forEach(c => {
      const cookie = c.split('=')[0].trim()
      document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
    })
    setTimeout(() => location.reload(true), 1000)
  }
}

defineExpose({ open })
</script>

<template>
  <UDrawer v-model:open="showModal" class="content-space">
    <template #title>
      <SectionTitle title="Setting" />
    </template>
    <template #body>
      <div class="space-y-2">
        <UButton
          v-for="(m, i) in menuList"
          :key="i"
          :icon="`lets-icons:${m.icon}`"
          :label="m.label"
          :color="m.id === menuList[menuList.length - 1].id ? 'error' : 'neutral'"
          block
          size="xl"
          class="justify-start"
          @click="doAction(m.id)"
        />
      </div>
    </template>
    <template #footer>
      <UButton label="Close" color="neutral" block size="xl" @click="showModal = false" />
    </template>
  </UDrawer>
</template>

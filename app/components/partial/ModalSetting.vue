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
        <div v-for="(m, i) in menuList" :key="i" class="flex gap-2 p-3 rounded-xl border" :class="[m.id === menuList[menuList.length - 1].id ? 'border-red-300 bg-red-100 dark:bg-red-950 dark:border-red-900' : 'border-neutral-300 bg-white dark:bg-neutral-800 dark:border-neutral-700']" @click="doAction(m.id)">
          <UIcon :name="`lets-icons:${m.icon}`" class="size-6" />
          <div class="w-full">
            {{ m.label }}
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <UButton label="Close" color="neutral" block size="xl" class="rounded-xl" @click="showModal = false" />
    </template>
  </UDrawer>
</template>

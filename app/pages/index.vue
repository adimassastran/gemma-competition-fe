<script setup>
const accCookie = useCookie('acc')

onMounted(() => {
  accCookie.value = null
  navigateTo('/', { replace: true })
})
</script>

<template>
  <div />
</template>

<script setup>
import SectionTitle from '~/components/partial/SectionTitle'

const props = defineProps({
  title: { type: String, default: null },
  titleAlign: { type: String, default: 'center' },
  transparent: { type: Boolean, default: false },
  triggerScrollHeight: { type: Number, default: 62 }
})

const scrolled = ref(false)

onMounted(() => window.addEventListener('scroll', handleScroll))

const handleScroll = () => scrolled.value = window.scrollY > props.triggerScrollHeight

onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <div>
    <div class="fixed w-screen top-0 left-0" style="z-index: 2;">
      <div class="content-space py-4 duration-300" :class="{ 'bg-white shadow-md dark:bg-neutral-700': !transparent || (transparent && scrolled) }">
        <div class="container">
          <SectionTitle v-if="title" :title="title" class="whitespace-nowrap overflow-x-hidden text-ellipsis" :class="[`text-${titleAlign}`]" />
        </div>
      </div>
    </div>
  </div>
</template>

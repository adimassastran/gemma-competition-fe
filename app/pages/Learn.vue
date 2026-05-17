<script setup>
import PageNavbar from '~/components/partial/PageNavbar'
import ErrorData404 from '~/components/partial/ErrorData404'

useHead({ title: 'Quick learn' })

const chat = useChatStore()
const toast = useToast()
const input = ref(null)
const loading = ref({
  send: false,
  receive: false
})
const localData = ref([])

onMounted(async () => {
  loading.value = true
  await chat.getAll()
    .then((res) => {
      for (let i = 0; i < chat.all?.data?.length; i++) {
        localData.value.push({
          ...chat.all?.data[i],
          id: generateId(),
          parts: [{ type: 'text', text: chat.all?.data[i]?.content }]
        })
      }
    })
    .catch((error) => {
      const description = error.errors 
        ? Object.values(error.errors).flat()[0] 
        : 'Please try again later.'
      toast.add({ title: 'Error occured when loading past chat', description: error?.data?.message, color: 'error' })
    })
  loading.value = false
})

const generateId = () => Date.now().toString(36) + Math.random().toString(36).slice(2)
const checkForm = () => {
  if (input.value) {
    submitForm()
  }
}
const submitForm = async () => {
  loading.value.send = true
  await chat.send({ message: input.value })
    .then((res) => {
      localData.value.push({
        id: generateId(),
        role: 'user',
        parts: [{ type: 'text', text: input.value }]
      })
      input.value = null
      loading.value.receive = true
      setTimeout(() => {
        localData.value.push({
          id: generateId(),
          role: 'assistant',
          parts: [{ type: 'text', text: JSON.parse(JSON.stringify(res.data.reply)) }]
        })
        loading.value.receive = false
        console.log(localData.value)
      }, 3000)
    })
    .catch((error) => {
      toast.add({ title: 'Something went wrong', description: error?.message, color: 'error' })
    })
  loading.value.send = false
}
</script>

<template>
  <div class="min-h-screen-main flex flex-col">
    <PageNavbar title="Quick learning" transparent :trigger-scroll-height="2" class="h-20" />
    <UChatMessages v-if="localData.length >= 1" :messages="localData" :status="loading.receive ? 'submitted' : 'ready'" class="chat-messages pb-12 mb-auto" style="--last-message-height: auto;">
      <template #content="{ message }">
        <Comark v-if="message.role === 'assistant'">
          {{ message.content }}
        </Comark>
        <template v-else>
          {{ message.content }}
        </template>
      </template>
    </UChatMessages>
    <ErrorData404 v-else class="my-auto">
      Ask something to start learning 😉
    </ErrorData404>
    <div class="fixed bottom-0 left-0 w-full">
      <div class="content-space pb-8 px-2 bg-neutral-100 dark:bg-neutral-900">
        <div class="flex rounded-2xl border-2 border-b-6 outline-offset-2 outline-inverted transform has-[textarea:focus]:translate-y-[4px] has-[textarea:focus]:border-b-2 bg-neutral-200 border-neutral-400 has-[textarea:focus]:border-primary-400/75 has-[textarea:focus]-visible:outline-2 has-[textarea:not(:placeholder-shown)]:flex-col has-[textarea:not(:placeholder-shown)]:gap-2 dark:!bg-neutral-700 dark:border-neutral-800">
          <UTextarea
            v-model="input"
            :placeholder="loading.receive ? 'Waiting for answer' : localData.length < 1 ? 'Ask something..' : 'Ask more, understand more..'"
            size="xl"
            :disabled="loading.send || loading.receive"
            :rows="1"
            :maxrows="5"
            autoresize
            variant="none"
            class="w-full"
          />
          <div v-if="input" class="flex justify-end">
            <UButton
              icon="lets-icons:send-fill"
              size="xl"
              color="primary"
              variant="solid"
              :loading="loading.send || loading.receive"
              @click="checkForm"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

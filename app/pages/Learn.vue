<script setup>
import PageNavbar from '~/components/partial/PageNavbar'
import ErrorData404 from '~/components/partial/ErrorData404'

useHead({ title: 'Quick learn' })

const chat = useChatStore()
const toast = useToast()
const uId = useId()
const input = ref(null)
const loading = ref({
  send: false,
  receive: false
})
// const localData = ref([
//   {
//     id: '6045235a-a435-46b8-989d-2df38ca2eb47',
//     role: 'user',
//     parts: [
//       {
//         type: 'text',
//         text: 'Hello, how are you?'
//       }
//     ]
//   },
//   {
//     id: '7a92b3c1-d5f8-4e76-b8a9-3c1e5fb2e0d8',
//     role: 'assistant',
//     parts: [
//       {
//         type: 'text',
//         text: 'I am doing well, thank you for asking! How can I assist you today?'
//       }
//     ]
//   },
//   {
//     id: '9c84d6a7-8b23-4f12-a1d5-e7f3b9c05e2a',
//     role: 'user',
//     parts: [
//       {
//         type: 'text',
//         text: 'What is the current weather in Tokyo?'
//       }
//     ]
//   },
//   {
//     id: 'b2e5f8c3-a1d9-4e67-b3f2-c9d8e7a6b5f4',
//     role: 'assistant',
//     parts: [
//       {
//         type: 'text',
//         text: "Based on the latest data, Tokyo is currently experiencing sunny weather with temperatures around 24°C (75°F). It's a beautiful day with clear skies."
//       }
//     ]
//   },
//   {
//     id: '6045235a-a435-46b8-989d-2df38ca2eb47',
//     role: 'user',
//     parts: [
//       {
//         type: 'text',
//         text: 'Hello, how are you?'
//       }
//     ]
//   },
//   {
//     id: '7a92b3c1-d5f8-4e76-b8a9-3c1e5fb2e0d8',
//     role: 'assistant',
//     parts: [
//       {
//         type: 'text',
//         text: 'I am doing well, thank you for asking! How can I assist you today?'
//       }
//     ]
//   },
//   {
//     id: '9c84d6a7-8b23-4f12-a1d5-e7f3b9c05e2a',
//     role: 'user',
//     parts: [
//       {
//         type: 'text',
//         text: 'What is the current weather in Tokyo?'
//       }
//     ]
//   },
//   {
//     id: 'b2e5f8c3-a1d9-4e67-b3f2-c9d8e7a6b5f4',
//     role: 'assistant',
//     parts: [
//       {
//         type: 'text',
//         text: "Based on the latest data, Tokyo is currently experiencing sunny weather with temperatures around 24°C (75°F). It's a beautiful day with clear skies."
//       }
//     ]
//   },
//   {
//     id: '6045235a-a435-46b8-989d-2df38ca2eb47',
//     role: 'user',
//     parts: [
//       {
//         type: 'text',
//         text: 'Hello, how are you?'
//       }
//     ]
//   },
//   {
//     id: '7a92b3c1-d5f8-4e76-b8a9-3c1e5fb2e0d8',
//     role: 'assistant',
//     parts: [
//       {
//         type: 'text',
//         text: 'I am doing well, thank you for asking! How can I assist you today?'
//       }
//     ]
//   },
//   {
//     id: '9c84d6a7-8b23-4f12-a1d5-e7f3b9c05e2a',
//     role: 'user',
//     parts: [
//       {
//         type: 'text',
//         text: 'What is the current weather in Tokyo?'
//       }
//     ]
//   },
//   {
//     id: 'b2e5f8c3-a1d9-4e67-b3f2-c9d8e7a6b5f4',
//     role: 'assistant',
//     parts: [
//       {
//         type: 'text',
//         text: "Based on the latest data, Tokyo is currently experiencing sunny weather with temperatures around 24°C (75°F). It's a beautiful day with clear skies."
//       }
//     ]
//   },
//   {
//     id: '6045235a-a435-46b8-989d-2df38ca2eb47',
//     role: 'user',
//     parts: [
//       {
//         type: 'text',
//         text: 'Hello, how are you?'
//       }
//     ]
//   },
//   {
//     id: '7a92b3c1-d5f8-4e76-b8a9-3c1e5fb2e0d8',
//     role: 'assistant',
//     parts: [
//       {
//         type: 'text',
//         text: 'I am doing well, thank you for asking! How can I assist you today?'
//       }
//     ]
//   },
//   {
//     id: '9c84d6a7-8b23-4f12-a1d5-e7f3b9c05e2a',
//     role: 'user',
//     parts: [
//       {
//         type: 'text',
//         text: 'What is the current weather in Tokyo?'
//       }
//     ]
//   },
//   {
//     id: 'b2e5f8c3-a1d9-4e67-b3f2-c9d8e7a6b5f4',
//     role: 'assistant',
//     parts: [
//       {
//         type: 'text',
//         text: "Based on the latest data, Tokyo is currently experiencing sunny weather with temperatures around 24°C (75°F). It's a beautiful day with clear skies."
//       }
//     ]
//   },
//   {
//     id: '6045235a-a435-46b8-989d-2df38ca2eb47',
//     role: 'user',
//     parts: [
//       {
//         type: 'text',
//         text: 'Hello, how are you?'
//       }
//     ]
//   },
//   {
//     id: '7a92b3c1-d5f8-4e76-b8a9-3c1e5fb2e0d8',
//     role: 'assistant',
//     parts: [
//       {
//         type: 'text',
//         text: 'I am doing well, thank you for asking! How can I assist you today?'
//       }
//     ]
//   },
//   {
//     id: '9c84d6a7-8b23-4f12-a1d5-e7f3b9c05e2a',
//     role: 'system',
//     parts: [
//       {
//         type: 'text',
//         text: 'This is a message from system'
//       }
//     ]
//   },
//   {
//     id: '9c84d6a7-8b23-4f12-a1d5-e7f3b9c05e2a',
//     role: 'user',
//     parts: [
//       {
//         type: 'text',
//         text: 'What is the current weather in Tokyo?'
//       }
//     ]
//   },
//   {
//     id: 'b2e5f8c3-a1d9-4e67-b3f2-c9d8e7a6b5f4',
//     role: 'assistant',
//     parts: [
//       {
//         type: 'text',
//         text: "Based on the latest data, Tokyo is currently experiencing sunny weather with temperatures around 24°C (75°F). It's a beautiful day with clear skies."
//       }
//     ]
//   }
// ])
const localData = ref([])

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
        id: uId,
        role: 'user',
        parts: [{ type: 'text', text: input.value }]
      })
      input.value = null
      loading.value.receive = true
      setTimeout(() => {
        localData.value.push({
          id: uId,
          role: 'assistant',
          parts: [{ type: 'text', text: JSON.parse(JSON.stringify(res.data.reply)) }]
        })
        loading.value.receive = false
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
    <UChatMessages v-if="localData.length >= 1" :messages="localData" :status="loading.receive ? 'submitted' : 'ready'" class="chat-messages pb-12 mb-auto" style="--last-message-height: auto;" />
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

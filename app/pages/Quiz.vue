<script setup>
import PageNavbar from '~/components/partial/PageNavbar'
import ErrorData404 from '~/components/partial/ErrorData404'
import ModalCheckAnswer from '~/components/functional/quiz/ModalCheckAnswer'

useHead({ title: 'Quiz' })

const quiz = useQuizStore()
const router = useRouter()
const toast = useToast()
const modalCheckAnswer = ref()
const input = ref(null)
const loading = ref(false)
const question = ref([])
const currentQuiz = ref(0)
const answer = ref([])
const score = ref(0)

onMounted(async () => {
  loading.value = true
  await quiz.getAll()
    .then((res) => {
      if (quiz.all?.length > 0) {
        const all = JSON.parse(JSON.stringify(quiz.all))
        const shuffled = all.sort(() => 0.5 - Math.random())
        question.value = shuffled.slice(0, 5).map((q) => {
          return {
            q: q.question_text,
            option: q.options.map(opt => opt.option_text),
            right: q.options.find(opt => opt.is_correct)?.option_text || "",
            explanation: "Just dummy explanation" 
          }
        })
      }
    })
    .catch((error) => {
      const description = error.errors 
        ? Object.values(error.errors).flat()[0] 
        : 'Please try again later.'
      toast.add({ title: 'Error occured when loading quiz', description: error?.data?.message, color: 'error' })
    })
  loading.value = false
})

const optionLetter = (i) => {
  const l = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  return l[i]
}
const checkAnswer = () => {
  let data = {}
  if (answer.value[currentQuiz.value] === question.value[currentQuiz.value].right) {
    data = { type: 'right' }
    score.value++
  } else if (answer.value[currentQuiz.value] !== question.value[currentQuiz.value].right) {
    data = {
      type: 'wrong',
      right: question.value[currentQuiz.value].right,
      explanation: question.value[currentQuiz.value].explanation
    }
  }
  if (currentQuiz.value >= question.value.length - 1) {
    data = { ...data, isLast: true }
  }
  modalCheckAnswer.value.open(data)
}
const changeQuestion = () => {
  if (currentQuiz.value < question.value.length - 1) {
    currentQuiz.value++
  } else {
    setTimeout(() => {
      modalCheckAnswer.value.open({
        type: 'score',
        score: Math.round(score.value / question.value.length * 100)
      })
    }, 500)
  }
}
const done = () => {
  router.back()
}
</script>

<template>
  <div class="min-h-screen-main flex flex-col">
    <PageNavbar title="Quiz" transparent :trigger-scroll-height="2" class="h-20" />
    <div v-if="loading" class="flex items-center justify-center fixed top-0 left-0 h-dvh w-dvw">
      <svg class="size-12 animate-spin text-neutral" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
    </div>
    <template v-else-if="question.length >= 1">
      <div class="space-y-4">
        <div class="text-xl">
          {{ question[currentQuiz].q }}
        </div>
        <label v-for="(o, i) in question[currentQuiz].option" :index="i" class="flex gap-2 pt-3 pb-2 px-2 rounded-2xl border-2 border-b-6 outline-offset-2 outline-inverted transform active:translate-y-[4px] active:border-b-2 cursor-pointer bg-neutral-200 border-neutral-400 focus:border-neutral-400/75 focus:border-neutral-400/75 focus-visible:outline-2 has-checked:translate-y-[4px] has-checked:border-b-2 has-checked:bg-primary-400/75 has-checked:border-primary-600/75 dark:!bg-neutral-700 dark:border-neutral-800 dark:focus:border-neutral-800/75 dark:focus:border-neutral-800/75 dark:has-checked:!bg-primary-400/75">
          <input v-model="answer[currentQuiz]" type="radio" :name="`radio${1}.${i}`" :value="o" class="fixed -top-12 -left-12 opacity-0 peer" />
          <div class="flex items-center justify-center flex-shrink-0 h-8 w-8 rounded-full bg-neutral-400 text-neutral-100 peer-checked:bg-primary-600">
            {{ optionLetter(i) }}
          </div>
          <span class="text-lg font-bold">{{ o }}</span>
        </label>
      </div>
      <div v-if="answer[currentQuiz]" class="fixed bottom-0 left-0 w-full">
        <div class="content-space space-y-4 pb-8 px-2">
          <UButton
            label="Check"
            size="xl"
            block
            color="primary"
            variant="solid"
            @click="checkAnswer"
            @keydown.enter="checkAnswer"
          />
        </div>
      </div>
      <ModalCheckAnswer ref="modalCheckAnswer" @next="changeQuestion" @done="done" />
    </template>
  </div>
</template>

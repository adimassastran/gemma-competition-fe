<script setup>
import PageNavbar from '~/components/partial/PageNavbar'
import ErrorData404 from '~/components/partial/ErrorData404'
import ModalCheckAnswer from '~/components/functional/quiz/ModalCheckAnswer'

useHead({ title: 'Quiz' })

const router = useRouter()
const modalCheckAnswer = ref()
const input = ref(null)
const loading = ref(false)
const quiz = ref([
  {
    q: 'Q1 Lorem ipsum dolor sit amet consectetur adipisicing, elit. Commodi, ipsa laudantium aspernatur voluptas ducimus! Tenetur sint vel, autem.',
    option: [
      'Lorem ipsum dolor sit amet consectetur adipisicing, elit.',
      'Commodi, ipsa laudantium aspernatur voluptas ducimus!'
    ],
    right: 'Commodi, ipsa laudantium aspernatur voluptas ducimus!',
    explanation: 'Explanation of: Commodi, ipsa laudantium aspernatur voluptas ducimus!'
  },
  {
    q: 'Q2 Lorem ipsum dolor sit amet consectetur adipisicing, elit. Commodi, ipsa laudantium aspernatur voluptas ducimus! Tenetur sint vel, autem.',
    option: [
      'Lorem ipsum dolor sit amet consectetur adipisicing, elit.',
      'Commodi, ipsa laudantium aspernatur voluptas ducimus!'
    ],
    right: 'Commodi, ipsa laudantium aspernatur voluptas ducimus!',
    explanation: 'Explanation of: Commodi, ipsa laudantium aspernatur voluptas ducimus!'
  },
  {
    q: 'Q3 Lorem ipsum dolor sit amet consectetur adipisicing, elit. Commodi, ipsa laudantium aspernatur voluptas ducimus! Tenetur sint vel, autem.',
    option: [
      'Lorem ipsum dolor sit amet consectetur adipisicing, elit.',
      'Commodi, ipsa laudantium aspernatur voluptas ducimus!'
    ],
    right: 'Commodi, ipsa laudantium aspernatur voluptas ducimus!',
    explanation: 'Explanation of: Commodi, ipsa laudantium aspernatur voluptas ducimus!'
  }
])
const currentQuiz = ref(0)
const answer = ref([])
const score = ref(0)

const optionLetter = (i) => {
  const l = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  return l[i]
}
const checkAnswer = () => {
  let data = {}
  if (answer.value[currentQuiz.value] === quiz.value[currentQuiz.value].right) {
    data = { type: 'right' }
    score.value++
  } else if (answer.value[currentQuiz.value] !== quiz.value[currentQuiz.value].right) {
    data = {
      type: 'wrong',
      right: quiz.value[currentQuiz.value].right,
      explanation: quiz.value[currentQuiz.value].explanation
    }
  }
  if (currentQuiz.value >= quiz.value.length - 1) {
    data = { ...data, isLast: true }
  }
  modalCheckAnswer.value.open(data)
}
const changeQuestion = () => {
  if (currentQuiz.value < quiz.value.length - 1) {
    currentQuiz.value++
  } else {
    setTimeout(() => {
      modalCheckAnswer.value.open({
        type: 'score',
        score: Math.round(score.value / quiz.value.length * 100)
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
    <div class="space-y-4">
      <div class="text-xl">
        {{ quiz[currentQuiz].q }}
      </div>
      <label v-for="(o, i) in quiz[currentQuiz].option" :index="i" class="flex gap-2 pt-3 pb-2 px-2 rounded-2xl border-2 border-b-6 outline-offset-2 outline-inverted transform active:translate-y-[4px] active:border-b-2 cursor-pointer bg-neutral-200 border-neutral-400 focus:border-neutral-400/75 focus:border-neutral-400/75 focus-visible:outline-2 has-checked:translate-y-[4px] has-checked:border-b-2 has-checked:bg-primary-400/75 has-checked:border-primary-600/75 dark:!bg-neutral-700 dark:border-neutral-800 dark:focus:border-neutral-800/75 dark:focus:border-neutral-800/75 dark:has-checked:!bg-primary-400/75">
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
  </div>
</template>

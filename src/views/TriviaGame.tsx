import { getGame, TriviaGame } from '@/api'
import router from '@/router'
import { ref, computed, defineComponent, watchEffect } from '@vue/runtime-core'

export default defineComponent({
  props: {
    gameId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const game = ref(null as TriviaGame | null)

    const loading = ref(false)

    const loadGame = async () => {
      loading.value = true
      try {
        game.value = await getGame(props.gameId)
      } catch (e) {
        alert('An error occurred - returning to main page')
        goToGameSetup()
      } finally {
        loading.value = false
      }
    }
    loadGame()

    type LastGameState = {
      gameId: string
      questionNumber: number
      correctAnswers: number
      incorrectAnswers: number
      selectedAnswer: string
    }

    let lastGameState: LastGameState | null = JSON.parse(localStorage.getItem('last-game') ?? 'null')

    if (lastGameState?.gameId !== props.gameId) {
      lastGameState = null
    }

    const questionNumber = ref(lastGameState?.questionNumber ?? 0)

    const correctAnswers = ref(lastGameState?.correctAnswers ?? 0)

    const incorrectAnswers = ref(lastGameState?.incorrectAnswers ?? 0)

    const selectedAnswer = ref(lastGameState?.selectedAnswer ?? '')

    watchEffect(() => {
      const state: LastGameState = {
        gameId: props.gameId,
        questionNumber: questionNumber.value,
        correctAnswers: correctAnswers.value,
        incorrectAnswers: incorrectAnswers.value,
        selectedAnswer: selectedAnswer.value,
      }
      localStorage.setItem('last-game', JSON.stringify(state))
    })

    const questions = computed(() => game.value?.questions || [])

    const currentQuestion = computed(() => questions.value[questionNumber.value])

    const hasNextQuestion = computed(() => questionNumber.value < questions.value.length - 1)

    const accuracy = computed(() => correctAnswers.value / (correctAnswers.value + incorrectAnswers.value))

    const goToNextQuestion = () => {
      if (hasNextQuestion.value) {
        selectedAnswer.value = ''
        questionNumber.value++
      }
    }

    const goToGameSetup = () => {
      router.push({ name: 'TriviaSetup' })
    }

    const chooseAnswer = (answer: string) => {
      if (selectedAnswer.value) {
        return
      }
      selectedAnswer.value = answer
      if (answer === currentQuestion.value.correctAnswer) {
        correctAnswers.value++
      } else {
        incorrectAnswers.value++
      }
    }

    const shareTheseQuestions = () => {
      if (!navigator.share) {
        alert('Your browser does not support sharing!')
        return
      }

      navigator.share({
        title: 'Trivya',
        url: window.location.href,
      })
    }

    return () => loading.value ? <div>Loading...</div> : <div>
      <div class="share-these-questions" onClick={shareTheseQuestions}>
        Share these questions
      </div>

      <div class="question-progress">
        Question: {questionNumber.value + 1} / {questions.value.length}
      </div>

      <div class="difficulty">
        Difficulty: {currentQuestion.value.difficulty}
      </div>

      <div class="category">
        Category: {currentQuestion.value.category}
      </div>

      <div class="question">
        {currentQuestion.value.question}
      </div>

      <div class="answers">
        <ul>
          {currentQuestion.value.allAnswers.map(a =>
            <li
              onClick={() => chooseAnswer(a)}
              class={{
                'correct-answer': selectedAnswer.value && a === currentQuestion.value.correctAnswer,
                'incorrect-answer': a === selectedAnswer.value && a !== currentQuestion.value.correctAnswer,
              }}
            >
              {a}
            </li>,
          )}
        </ul>
      </div>

      {!!selectedAnswer.value && <div>
        <div class="accuracy">
          {!isNaN(accuracy.value) && <>Accuracy: {Math.round(accuracy.value * 100)}%</>}
        </div>

        {hasNextQuestion.value ?
          <div class="next-question">
            <button onClick={goToNextQuestion}>
              Next Question
            </button>
          </div> :
          <div class="set-up-new-game">
            <button onClick={goToGameSetup}>
              Set up a new game
            </button>
          </div>
        }
      </div>}
    </div>
  },
})
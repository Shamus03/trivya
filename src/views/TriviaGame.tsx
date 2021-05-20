import { getGame, TriviaGame } from '@/api'
import router from '@/router'
import { ref, computed, defineComponent, watchEffect, onBeforeMount, onBeforeUnmount } from '@vue/runtime-core'
import { Transition } from 'vue'
import canvasConfetti from 'canvas-confetti'

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

    type LastGameState = {
      gameId: string
      questionNumber: number
      correctAnswers: number
      incorrectAnswers: number
      selectedAnswer: string
    }

    const questionNumber = ref(0)
    const correctAnswers = ref(0)
    const incorrectAnswers = ref(0)
    const selectedAnswer = ref('')

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
      case 'Digit1':
        selectedAnswer.value = currentQuestion.value.allAnswers[0]
        break
      case 'Digit2':
        selectedAnswer.value = currentQuestion.value.allAnswers[1]
        break
      case 'Digit3':
        selectedAnswer.value = currentQuestion.value.allAnswers[2]
        break
      case 'Digit4':
        selectedAnswer.value = currentQuestion.value.allAnswers[3]
        break
      case 'Enter':
        if (selectedAnswer.value) {
          if (hasNextQuestion.value) {
            goToNextQuestion()
          } else {
            goToGameSetup()
          }
        }
        break
      }
    }
    onBeforeMount(() => {
      window.addEventListener('keydown', handleKeyDown)
    })
    onBeforeUnmount(() => {
      window.removeEventListener('keydown', handleKeyDown)
    })

    watchEffect(async () => {
      loading.value = true
      try {
        game.value = await getGame(props.gameId)
        
        let lastGameState: LastGameState | null = JSON.parse(localStorage.getItem('last-game') ?? 'null')

        if (lastGameState?.gameId !== game.value.id) {
          lastGameState = {
            gameId: game.value.id,
            questionNumber: 0,
            correctAnswers: 0,
            incorrectAnswers: 0,
            selectedAnswer: '',
          }
        }
        
        questionNumber.value = lastGameState.questionNumber
        correctAnswers.value = lastGameState.correctAnswers
        incorrectAnswers.value = lastGameState.incorrectAnswers
        selectedAnswer.value = lastGameState.selectedAnswer
      } catch (e) {
        alert('An error occurred - returning to main page')
        goToGameSetup()
      } finally {
        loading.value = false
      }
    })

    watchEffect(() => {
      if (!game.value) return
      
      const state: LastGameState = {
        gameId: game.value.id,
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

    const delayAfterChoosingAnswer = ref(true)
    let lastDelay = 0

    const chooseAnswer = (answer: string) => {
      if (selectedAnswer.value) {
        return
      }
      delayAfterChoosingAnswer.value = false
      selectedAnswer.value = answer
      if (answer === currentQuestion.value.correctAnswer) {
        correctAnswers.value++
      } else {
        incorrectAnswers.value++
      }
      clearTimeout(lastDelay)
      lastDelay = setTimeout(() => {
        delayAfterChoosingAnswer.value = true
      }, 1000)
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

    const showNewGameButton = computed(() => {
      return !hasNextQuestion.value && delayAfterChoosingAnswer.value
    })

    watchEffect(() => {
      if (correctAnswers.value === game.value?.questions.length) {
        canvasConfetti()
      }
    })

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

      <Transition name="fade" mode="out-in">
        <div key={questionNumber.value}>
          <div class="question">
            {currentQuestion.value.question}
          </div>

          <div class="answers">
            <ul>
              {currentQuestion.value.allAnswers.map(a =>
                <li
                  key={a}
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
        </div>
      </Transition>

      <Transition name="slide-fade">
        {!!selectedAnswer.value && <div>
          <div class="accuracy">
            {!isNaN(accuracy.value) && <>Accuracy: {Math.round(accuracy.value * 100)}%</>}
          </div>

          {hasNextQuestion.value &&
            <div class="next-question">
              <button onClick={goToNextQuestion}>
              Next Question
              </button>
            </div>
          }

          <Transition name="slide-fade">
            {showNewGameButton.value &&
              <div class="set-up-new-game">
                <button onClick={goToGameSetup}>
                Set up a new game
                </button>
              </div>}
          </Transition>
        </div>}
      </Transition>
    </div>
  },
})
import { TriviaQuestion } from '@/api'
import router from '@/router'
import { ref, computed, defineComponent } from '@vue/runtime-core'

export default defineComponent({
  props: {
    questions: {
      type: Array as (() => TriviaQuestion[]),
      required: true,
    },
  },
  setup(props) {

    const questionNumber = ref(0)

    const currentQuestion = computed(() => props.questions[questionNumber.value])

    const hasNextQuestion = computed(() => questionNumber.value < props.questions.length - 1)

    const selectedAnswer = ref('')

    const correctAnswers = ref(0)

    const incorrectAnswers = ref(0)

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

    return () => <div>
      <div class="share-these-questions" onClick={shareTheseQuestions}>
        Share these questions
      </div>

      <div class="question-progress">
        Question: {questionNumber.value + 1} / {props.questions.length}
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
          <div class="new-game">
            <button onClick={goToGameSetup}>
              Start a new game
            </button>
          </div>
        }
      </div>}
    </div>
  },
})
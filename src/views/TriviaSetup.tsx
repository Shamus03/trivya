import router from '@/router'
import { getTriviaQuestions } from '@/api'
import { defineComponent, ref } from '@vue/runtime-core'

export default defineComponent({
  setup() {
    const difficultyOptions = [
      { text: 'Any', value: '' },
      { text: 'Easy', value: 'easy' },
      { text: 'Medium', value: 'medium' },
      { text: 'Hard', value: 'hard' },
    ]
    const selectedDifficulty = ref(difficultyOptions[0].value)

    const startNewGame = async () => {
      const questions = await getTriviaQuestions({ amount: 10, difficulty: selectedDifficulty.value })
      router.push({
        name: 'TriviaGame',
        params: {
          questions: btoa(escape(JSON.stringify(questions))),
        },
      })
    }

    return () => <div>
      <h4>Set up a new game</h4>

      <div class="difficulty-selector">
        <div class="label">Select a difficulty:</div>
        <select v-model={selectedDifficulty.value}>
          {difficultyOptions.map(d => <option key={d.value} value={d.value}>{d.text}</option>)}
        </select>
      </div>

      <button class="start-new-game" onClick={startNewGame}>Start!</button>
    </div>
  },
})
import router from '@/router'
import { createGame, getTriviaQuestions } from '@/api'
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
      const gameId = await createGame({ questions })
      router.push({
        name: 'TriviaGame',
        params: {
          gameId: gameId,
        },
      })
    }

    return () => <div>
      <h4>Set up a new game</h4>

      <div class="difficulty-selector">
        <div class="label">Select a difficulty:</div>
        {difficultyOptions.map(d => <div><label key={d.value}><input v-model={selectedDifficulty.value} type="radio" value={d.value}></input> {d.text}</label></div>)}
      </div>
      <button class="start-new-game" onClick={startNewGame}>Start!</button>
    </div>
  },
})
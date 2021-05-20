import router from '@/router'
import { createGame, getTriviaQuestions, getMostRecentGameIdByRoomCode } from '@/api'
import { defineComponent, ref, watchEffect } from '@vue/runtime-core'

export default defineComponent({
  setup() {
    const difficultyOptions = [
      { text: 'Any', value: '' },
      { text: 'Easy', value: 'easy' },
      { text: 'Medium', value: 'medium' },
      { text: 'Hard', value: 'hard' },
    ]
    const selectedDifficulty = ref(difficultyOptions[0].value)

    const creatingGame = ref(false)
    const findingGame = ref(false)

    const roomCode = ref(localStorage.getItem('room-code') || '')
    watchEffect(() => {
      localStorage.setItem('room-code', roomCode.value)
    })

    const startNewGame = async () => {
      creatingGame.value = true
      try {
        const questions = await getTriviaQuestions({ amount: 10, difficulty: selectedDifficulty.value })
        const gameId = await createGame({ questions, roomCode: roomCode.value })
        goToGame(gameId)
      } finally {
        creatingGame.value = false
      }
    }

    const findGame = async () => {
      findingGame.value = true
      try {
        const gameId = await getMostRecentGameIdByRoomCode(roomCode.value)
        if (gameId) {
          goToGame(gameId)
        }
      } finally {
        findingGame.value = false
      }
    }

    const goToGame = (gameId: string) => {
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
      <button class="start-new-game" onClick={startNewGame} disabled={creatingGame.value}>
        {!creatingGame.value ? 'Start!' : 'Loading...'}
      </button>

      <hr />
      
      <div class="room-code">
        <label>
          <span>Room code: </span>
          <input type="text" v-model={roomCode.value}/>
        </label>
      </div>
      
      <div>
        <button class="find-game-by-room-code" onClick={findGame} disabled={findingGame.value}>
          {!findingGame.value ? 'Find a Game' : 'Loading...'}
        </button>
      </div>
    </div>
  },
})
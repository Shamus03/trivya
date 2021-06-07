import router from '@/router'
import { createGame, getTriviaQuestions, getMostRecentGameIdByRoomCode, getCategoryOptions, OpenTdbCategory } from '@/api'
import { defineComponent, onMounted, ref, watchEffect } from '@vue/runtime-core'

const tryParseInt = (s: string) => isNaN(parseInt(s)) ? undefined : parseInt(s)

export default defineComponent({
  props: {
    difficulty: {
      type: String as (() => string | undefined),
      default: undefined,
    },
    categoryId: {
      type: String as (() => string | undefined),
      default: undefined,
    },
  },
  setup(props) {
    const difficultyOptions = [
      { text: 'Any', value: '' },
      { text: 'Easy', value: 'easy' },
      { text: 'Medium', value: 'medium' },
      { text: 'Hard', value: 'hard' },
    ]
    const selectedDifficulty = ref(props.difficulty ?? difficultyOptions[0].value)

    const allCategoriesOption = { id: 0, name: 'All Categories' }
    const categoryOptions = ref<OpenTdbCategory[]>([ allCategoriesOption ])
    onMounted(async () => {
      const c = await getCategoryOptions()
      categoryOptions.value = [allCategoriesOption, ...c].sort((a, b) => a.name.localeCompare(b.name))
    })
    const selectedCategoryId = ref(tryParseInt(props.categoryId ?? '') ?? 0)
    if (!categoryOptions.value.some(o => o.id === selectedCategoryId.value)) {
      categoryOptions.value.push({ id: selectedCategoryId.value, name: 'Loading...' })
    }

    const creatingGame = ref(false)
    const findingGame = ref(false)

    const roomCode = ref(localStorage.getItem('room-code') || '')
    watchEffect(() => {
      localStorage.setItem('room-code', roomCode.value)
    })

    const startNewGame = async () => {
      creatingGame.value = true
      try {
        const difficulty = selectedDifficulty.value
        const categoryId = selectedCategoryId.value
        const questions = await getTriviaQuestions({
          amount: 10,
          difficulty,
          categoryId,
        })
        const gameId = await createGame({ questions, roomCode: roomCode.value, difficulty, categoryId })
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
        <div>Select a difficulty:</div>
        {difficultyOptions.map(d =>
          <div>
            <label key={d.value}>
              <input
                v-model={selectedDifficulty.value}
                type="radio"
                value={d.value}
              />
              {d.text}
            </label>
          </div>,
        )}
      </div>

      <div class="category-selector">
        <label>
          <div>Select a category:</div>
          <select v-model={selectedCategoryId.value}>
            {categoryOptions.value.map(c =>
              <option key={c.id} value={c.id}>{c.name}</option>,
            )}
          </select>
        </label>
      </div>
      
      <button class="start-new-game" onClick={startNewGame} disabled={creatingGame.value}>
        {!creatingGame.value ? 'Start!' : 'Loading...'}
      </button>

      <hr class="room-code-separator" />
      
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
import Axios from 'axios'
import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseApp  = firebase.initializeApp({
  apiKey: 'AIzaSyDc2ej0u82U5xnQDWjzBNyFBHh3UwFyfpg',
  authDomain: 'trivya-2135a.firebaseapp.com',
  projectId: 'trivya-2135a',
  storageBucket: 'trivya-2135a.appspot.com',
  messagingSenderId: '448392939023',
  appId: '1:448392939023:web:dedce129a86efbe4e1857a',
})

const db = firebase.firestore(firebaseApp)

const games = db.collection('games')

export interface TriviaGame {
  id: string
  roomCode?: string
  createdAt: firebase.firestore.Timestamp
  questions: TriviaQuestion[]
}

export interface TriviaQuestion {
  question: string
  category: string
  difficulty: string
  correctAnswer: string
  allAnswers: string[]
}

export async function createGame(game: Omit<TriviaGame, 'id' | 'createdAt'>): Promise<string> {
  const doc = await games.add({
    ...game,
    createdAt: firebase.firestore.Timestamp.now(),
  })
  return doc.id
}

export async function getGame(gameId: string): Promise<TriviaGame> {
  const doc = await games.doc(gameId).get()
  return docToTriviaGame(doc)
}

export async function getMostRecentGameIdByRoomCode(roomCode: string): Promise<string | null> {
  const result = await games
    .where('roomCode', '==', roomCode)
    .orderBy('createdAt', 'desc')
    .limit(1)
    .get()
  if (result.empty) {
    return null
  }
  return result.docs[0].id
}

const docToTriviaGame = (doc: firebase.firestore.DocumentData): TriviaGame => {
  const game = doc.data() as TriviaGame
  game.id = doc.id
  return game
}

const openTdb = Axios.create({
  baseURL: 'https://opentdb.com',
})
let openTdbSessionToken = ''

enum OpenTdbResponseCode {
  Success = 0,
  NoResults = 1,
  InvalidParameter = 2,
  TokenNotFound = 3,
  TokenEmpty = 4,
}

export async function getTriviaQuestions({ difficulty, amount }: { difficulty?: string, amount?: number }): Promise<TriviaQuestion[]> {
  if (!openTdbSessionToken) {
    const resp = await openTdb.get<{
      token: string
    }>('/api_token.php?command=request')
    openTdbSessionToken = resp.data.token
  }
  const resp = await openTdb.get<{
    response_code: OpenTdbResponseCode,
    results: {
      question: string
      category: string
      type: string
      difficulty: string
      correct_answer: string
      incorrect_answers: string[]
    }[],
  }>('/api.php', {
    params: {
      encode: 'url3986',
      amount,
      difficulty,
      token: openTdbSessionToken,
    },
  })

  if ([OpenTdbResponseCode.TokenEmpty, OpenTdbResponseCode.TokenNotFound].includes(resp.data.response_code)) {
    openTdbSessionToken = ''
    return await getTriviaQuestions({ difficulty, amount })
  }

  if (resp.data.response_code != OpenTdbResponseCode.Success) {
    throw new Error('Failed to get questions')
  }

  return resp.data.results.map(q => {
    const correctAnswer = decodeURIComponent(q.correct_answer)
    const allAnswers = q.incorrect_answers.map((a: string) => decodeURIComponent(a)).concat(correctAnswer)
    return {
      category: decodeURIComponent(q.category),
      difficulty: decodeURIComponent(q.difficulty),
      question: decodeURIComponent(q.question),
      correctAnswer,
      allAnswers: q.type === 'boolean' ? allAnswers.sort().reverse() : allAnswers.sort(),
    }
  })
}
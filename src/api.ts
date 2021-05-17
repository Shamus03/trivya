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
  questions: TriviaQuestion[]
}

export interface TriviaQuestion {
  question: string
  category: string
  difficulty: string
  correctAnswer: string
  allAnswers: string[]
}

export async function createGame(game: TriviaGame): Promise<string> {
  const doc = await games.add(game)
  return doc.id
}

export async function getGame(gameId: string): Promise<TriviaGame> {
  const doc = await games.doc(gameId).get()
  const game = doc.data() as TriviaGame
  return game
}

export async function getTriviaQuestions({ difficulty, amount }: { difficulty?: string, amount?: number }): Promise<TriviaQuestion[]> {
  const resp = await Axios.get<{
    results: {
      question: string
      category: string
      type: string
      difficulty: string
      correct_answer: string
      incorrect_answers: string[]
    }[],
  }>('https://opentdb.com/api.php', {
    params: {
      encode: 'url3986',
      amount,
      difficulty,
    },
  })

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
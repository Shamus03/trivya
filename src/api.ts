import Axios from 'axios'

export interface TriviaQuestion {
  question: string
  category: string
  difficulty: string
  correctAnswer: string
  allAnswers: string[]
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
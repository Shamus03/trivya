import TriviaGame from '@/views/TriviaGame'
import TriviaSetup from '@/views/TriviaSetup'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/setup',
    name: 'TriviaSetup',
    component: TriviaSetup,
  },
  {
    path: '/game/:gameId',
    props: true,
    name: 'TriviaGame',
    component: TriviaGame,
  },
  {
    path: '/',
    redirect: '/setup',
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router

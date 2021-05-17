import { createApp } from 'vue'
import App from './App'
import './registerServiceWorker'
import router from './router'
import './style.css'

createApp(App).use(router).mount('#app')

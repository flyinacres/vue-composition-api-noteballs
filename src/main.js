import { createApp, markRaw } from 'vue'
import App from './App.vue'

// By default with no file specified it will look for index.js
import router from '@/router'
import {createPinia} from 'pinia'

import './assets/main.css'

const pinia = createPinia()

pinia.use(({ store }) => {
    store.router = markRaw(router)
})

createApp(App)
    .use(router)
    .use(pinia)
    .mount('#app')

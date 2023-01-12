import { createApp } from 'vue'
import App from './App.vue'

// By default with no file specified it will look for index.js
import router from '@/router'
import {createPinia} from 'pinia'

import './assets/main.css'


createApp(App)
    .use(router)
    .use(createPinia())
    .mount('#app')

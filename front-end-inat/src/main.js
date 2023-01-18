import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios'

import './assets/main.css'

const app = createApp(App)

axios.create({
    //baseURL: process.env.VUE_APP_API_URL,
    baseURL: 'http://localhost:3100',
    headers: {
        common: {
            'Access-Control-Allow-Origin': '*'
        }
    }
})

app.use(VueAxios, axios)

app.use(router)

app.mount('#app')

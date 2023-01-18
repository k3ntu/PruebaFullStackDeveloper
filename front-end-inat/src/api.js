import Vue from 'vue'

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

export default axios.create({
  //baseURL: process.env.VUE_APP_API_URL,
  baseURL: 'http://localhost:3100',
  headers: {
    common: {
      'Access-Control-Allow-Origin': '*'
    }
  }
})

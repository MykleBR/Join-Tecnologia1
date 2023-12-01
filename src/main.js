// src/main.js

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';

axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.xsrfCookieName = 'csrftoken';

const backendUrl = 'http://127.0.0.1:8000/';
const app = createApp(App);
app.config.globalProperties.$axios = axios.create({
    baseURL: backendUrl,
});

app.use(router);
app.mount('#app');

import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './assets/styles/styles.css'
import router from './router/router.js'
import App from './App.vue'

createApp(App).use(router).mount('#app')

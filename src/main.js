import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router.js'

// Import Bootstrap & BootstrapVue3 styles
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css' 

// Custom styles
import './assets/styles/styles.css' 

const app = createApp(App) 
app.use(router) 
app.mount('#app')

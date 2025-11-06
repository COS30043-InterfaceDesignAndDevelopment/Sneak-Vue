import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router/router.js';
import Vueform from '@vueform/vueform';
import vueformConfig from '../vueform.config.js'; 

// Import Bootstrap & BootstrapVue3 styles
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@vueform/vueform/dist/vueform.css';
import '@vueform/slider/themes/default.css';

// Custom styles
import './assets/styles/styles.css';

const app = createApp(App);
const pinia = createPinia();
 
app.use(pinia);
app.use(Vueform, vueformConfig);
app.use(router);
app.mount('#app');
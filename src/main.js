import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Import Bootstrap JS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
// Import Font Awesome
import '@fortawesome/fontawesome-free/css/all.min.css'

import router from './router'

const app = createApp(App)
app.use(router)


app.mount('#app')


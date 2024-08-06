import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'
import router from './router'
import store from "./store";
import { createApp } from 'vue'
import App from './App.vue'
import ArgonDashboard from "./argon-dashboard";

const app = createApp(App);
app.use(store);
app.use(router);
app.use(ArgonDashboard);
app.mount('#app');

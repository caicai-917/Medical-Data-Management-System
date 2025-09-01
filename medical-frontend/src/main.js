import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/css/tailwind.css'; // 假设你已配置 Tailwind

const app = createApp(App);
app.use(router);
app.mount('#app');
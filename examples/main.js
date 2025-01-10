import { createApp } from 'vue'
import App from '@example/App.vue'
import { createPinia } from 'pinia'

createApp(App).use(createPinia()).mount('#app')

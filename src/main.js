import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import { createI18n } from 'vue-i18n'

// Import translations
import en from './locales/en.json'
import pa from './locales/pa.json'
import hi from './locales/hi.json'

// Create i18n instance
const i18n = createI18n({
  legacy: false,
  locale: 'en', // default language
  fallbackLocale: 'en',
  messages: {
    en,
    pa,
    hi
  }
})

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(i18n)
app.mount('#app')





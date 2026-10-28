import '@/shared/styles'

import { createApp } from 'vue'

import App from './App.vue'
import { installProviders } from './providers'

const app = createApp(App)

installProviders(app)

app.mount('#app')

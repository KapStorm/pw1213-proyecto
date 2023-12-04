import './index.css'
import 'vuetify/styles'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const app = createApp(App)

app.use(router)

const vuetify = createVuetify({
  components,
  directives
})

app.use(vuetify)

app.mount('#app')

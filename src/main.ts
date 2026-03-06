import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './styles/global.scss'
import 'photoswipe/style.css'
import { createLazyImageDirective } from './directives/lazyImage'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.directive('lazy-image', createLazyImageDirective({ maxConcurrent: 4 }))

app.mount('#app')

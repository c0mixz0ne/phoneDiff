import './assets/styles/main.less'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

// Dynamic titles
router.afterEach((to) => {
    if (to.meta.title) {
      document.title = to.meta.title as string
    } else {
      document.title = 'Каталог' // Default
    }
})

app.mount('#app')

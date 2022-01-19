import { createApp } from 'vue'
import App from './App.vue'
import VueHighlightJS from 'vue3-highlightjs'
import 'highlight.js/styles/solarized-light.css'
import './assets/css/main.css';


const app = createApp(App)

app.use(VueHighlightJS)
app.mount('#app')
// https://vitepress.dev/guide/custom-theme
import DefaultTheme from 'vitepress/theme'
import './style.css'
import 'uno.css'

import MyPosts from './components/MyPosts.vue'
import type { App } from 'vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.component('MyPosts', MyPosts)
  },
}

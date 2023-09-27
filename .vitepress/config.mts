import { defineConfig } from 'vitepress'
import UnoCSS from 'unocss/vite'
import { getBlogPosts } from './theme/composables/useMySidebar'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-TW',
  title: 'Sabina·Note',
  description: '莎賓娜的學習筆記',
  head: [['link', { rel: 'icon', href: '/q版老爹.jpg' }]],
  cleanUrls: true,
  markdown: { lineNumbers: true },
  vite: { plugins: [UnoCSS()] },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Blog', link: '/blog/' }
    ],

    sidebar: [
      { text: 'Blog', items: getBlogPosts('blog/posts') }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],

    footer: {
      message: 'All rights reserved.',
      copyright: 'Copyright © 2023 Sabina',
    },
  }
})

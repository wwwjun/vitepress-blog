// https://vitepress.dev/guide/custom-theme
/// <reference types="vite/client" />
import { defineAsyncComponent, h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
// import Layout from './components/Layout.vue'

import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
        // https://vitepress.dev/guide/extending-default-theme#layout-slots
        // 插槽：只在首页渲染 PostList
      'layout-top': () => {
        if (typeof window !== 'undefined' && location.pathname === '/') {
          return h(import.meta.glob('./components/Layout.vue'))
        }
        return null
      }
    })
  },
  enhanceApp({ app, router, siteData }) {
    // 注册自定义全局组件
    // app.component('MyGlobalComponent' /* ... */)
    const components = import.meta.glob('./components/*.vue')

    for (const path in components) {
      const name = path
        .split('/')
        .pop()
        ?.replace(/\.vue$/, '') || 'Unknown'

      app.component(
        name,
        defineAsyncComponent(
          components[path] as () => Promise<{ default: import('vue').Component }>
        )
      )
    }
  }
} satisfies Theme

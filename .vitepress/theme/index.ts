// https://vitepress.dev/guide/custom-theme
/// <reference types="vite/client" />
import { defineAsyncComponent, h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
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

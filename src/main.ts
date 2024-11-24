import { createApp } from 'vue'

import App from './App.vue'

const app = createApp(App)

// https://cn.vitejs.dev/guide/migration-from-v2.html#importmetaglob
// import plugins
;((s) => Object.values(s).forEach((plugin: any) => plugin.default && app.use(plugin.default)))(
  import.meta.glob('./plugins/*.ts', { eager: true }),
)

app.mount('#app')

import { createMemoryHistory, createRouter } from 'vue-router'

import Home from '../pages/Home.vue'
import Author from '../pages/Author.vue'

const routes = [
  { name: 'home', path: '/', component: Home },
  { name: "author", path: '/author/:author', component: Author },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
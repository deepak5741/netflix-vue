import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'BrowseMovies',
    component: () => import('../views/movie/BrowseMovies.vue'),

  },
  {
    path: '/movie/details/:id',
    name: 'Moviedetails',
    component: () => import('../views/movie/Moviedetails.vue'),

  },

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), 
  routes
})

export default router
import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import RecipeList from '@/views/RecipeList.vue'
import RecipeForm from '@/views/RecipeForm.vue'
import RecipeSearch from '@/views/RecipeSearch.vue'
import RecipeDelete from '@/views/RecipeDelete.vue'
import NotFound from '@/views/NotFound.vue'

const isAuthenticated = () => !!localStorage.getItem('token')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', name: 'login', component: Login },
    { path: '/register', name: 'register', component: Register },
    {
      path: '/recipes',
      name: 'recipes',
      component: RecipeList,
      meta: { requiresAuth: true },
    },
    {
      path: '/recipes/new',
      name: 'recipe-new',
      component: RecipeForm,
      meta: { requiresAuth: true },
    },
    {
      path: '/recipes/search',
      name: 'recipe-search',
      component: RecipeSearch,
      meta: { requiresAuth: true },
    },
    {
      path: '/recipes/:id/edit',
      name: 'recipe-edit',
      component: RecipeForm,
      meta: { requiresAuth: true },
    },
    {
      path: '/recipes/:id/delete',
      name: 'recipe-delete',
      component: RecipeDelete,
      meta: { requiresAuth: true },
    },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import SubmitBin from '../components/SubmitBin.vue'
import BinPage from '../components/BinPage.vue'
import HomePage from '../components/HomePage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:id([a-zA-Z0-9]{10})',
      name: 'BinPage',
      component: BinPage
    }
    ,
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/submit',
      name: 'submit',
      component: SubmitBin
    }
  ]
})

export default router

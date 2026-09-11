import { createRouter, createWebHistory } from 'vue-router'
import CatalogueView from '../views/CatalogueView.vue'
import HomeView from '../views/HomeView.vue'
import ProductView from '../views/ProductView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/catalogue',
    name: 'catalogue',
    component: CatalogueView
  },
  {
    path: '/produit/:id',
    name: 'product',
    component: ProductView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
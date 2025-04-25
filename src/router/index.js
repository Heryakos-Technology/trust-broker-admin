import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CustomerDashboard from '../views/CustomerDashboard.vue'
import BrokerDashbord from '../views/BrokerDashbord.vue'
import LoginPage from '@/views/Auth/LoginPage.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/BrokerDashbord',
      name: 'BrokerDashbord',
      component: BrokerDashbord,
    },
    {
      path: '/CustomerDashboard',
      name: 'CustomerDashboard',
      component: CustomerDashboard,
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginPage,
      meta: { guest: true },
    },

  ],
})

export default router

import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CustomerDashboard from '../views/CustomerDashboard.vue'
import BrokerDashbord from '../views/BrokerDashbord.vue'

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

  ],
})

export default router

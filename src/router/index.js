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
      component: HomeView,
      meta: { welcome: true },

    },
    {
      path: '/BrokerDashbord',
      name: 'BrokerDashbord',
      component: BrokerDashbord,
      meta: { admin: true },
    },
    {
      path: '/CustomerDashboard',
      name: 'CustomerDashboard',
      component: CustomerDashboard,
      meta: { admin: true }
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginPage,
      meta: { guest: true },
    },

  ],
})



router.beforeEach(async (to, from) => {
  const userInfoString = localStorage.getItem("userInfo");

  const userInfo = JSON.parse(userInfoString);

  const user_role = userInfo?.role;
  const userId = userInfo?.userId;

  if (user_role === "Admin" && to.meta.welcome) {
    return { name: "CustomerDashboard" };
  }
  if (user_role === "Admin" && to.meta.broker) {
    return { name: "CustomerDashboard" };
  }
  if (user_role === "Admin" && to.meta.guest) {
    return { name: "CustomerDashboard" };
  }
  if (!userId && to.meta.customer) {
    return { name: "Login" };
  }
  if (!userId && to.meta.broker) {
    return { name: "Login" };
  }


});


export default router

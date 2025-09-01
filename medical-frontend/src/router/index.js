/* eslint-disable */
import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../views/LoginPage.vue';
import PatientList from '../views/PatientList.vue';
import PatientDetail from '../views/PatientDetail.vue';
import UserProfile from '../views/UserProfile.vue'; // 导入个人信息页面

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginPage },
  { path: '/patients', component: PatientList },
  { path: '/patient/:id', component: PatientDetail },
  { path: '/profile', component: UserProfile } // 添加个人信息页面路由
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// 路由守卫：未登录拦截
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.getItem('isLogin');
  if (to.path !== '/login' && !isLogin) {
    next('/login');
  } else {
    next();
  }
});

export default router;

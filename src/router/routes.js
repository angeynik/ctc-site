import { createRouter, createWebHistory } from 'vue-router';

import EngineeringSystems from '@/components/EngineeringSystems.vue';
import ServiceSystem from '@/components/ServiceSystem.vue';
import EquipmentRepair from '@/components/EquipmentRepair.vue';
import AeroDynamics from '@/components/AeroDynamics.vue';
import AutomationService from '@/components/AutomationService.vue';
import OurClients from '@/components/OurClients.vue';
import OurReviews from '@/components/OurReviews.vue';
import WorkFlow from '@/components/WorkFlow.vue';
// import RequestForm from '@/components/RequestForm.vue';
// import AccessDenied from '../components/AccessDenied.vue'; // Компонент для ошибки доступа
// import store from '@/store'; // Импортируем хранилище Vuex

const routes = [
    {
    path: '/',
    name: 'Home',
    meta: { public: true }
  },
  {
    path: '/engineering',
    name: 'EngineeringSystems',
    component: EngineeringSystems,
    meta: { public: true } // Публичный маршрут
  },
{
  path: '/service',
  name: 'ServiceSystem',
  component: ServiceSystem,
  meta: { public: true } // Публичный маршрут
  // meta: { requiresAuth: true, requiredLevel: 1 },
  // children: [
  //       {
  //     path: '', // Пустой путь для основного состояния
  //     name: 'Dashboad',
  //     component: null // Явно указываем, что компонент не нужен
  //   },
  //   {
  //     path: 'rooms',
  //     name: 'DashboardRooms',
  //     component: () => import('@/components/DashboardRooms.vue')
  //   },
  //   {
  //     path: 'params',
  //     name: 'DashboardParams',
  //     component: () => import('@/components/DashboardParams.vue')
  //   },
  //   {
  //     path: 'common',
  //     name: 'DashboardCommon',
  //     component: () => import('@/components/DashboardCommon.vue')
  //   },
  //   {
  //     path: 'settings',
  //     name: 'DashboardSettings',
  //     component: () => import('@/components/DashboardSettings.vue')
  //   }
  // ]
},
  {
    path: '/repair',
    name: 'SmartEquipmentRepairHome',
    component: EquipmentRepair,
    meta: { public: true } // Публичный маршрут
    // meta: { requiresAuth: true, requiredLevel: 1 }, // Добавляем проверку аутентификации
  },
  {
    path: '/aero',
    name: 'AeroDynamics',
    component: AeroDynamics,
    meta: { public: true } // Публичный маршрут
    // meta: { requiresAuth: true, requiredLevel: 1 }, // Добавляем проверку аутентификации
  },
  {
    path: '/automation',
    name: 'AutomationService',
    component: AutomationService,
    meta: { public: true } // Публичный маршрут
  },
  {
    path: '/clients',
    name: 'OurClients',
    component: OurClients,
    meta: { public: true } // Публичный маршрут
  },
  {
    path: '/reviews',
    name: 'OurReviews',
    component: OurReviews,
    meta: { public: true } // Публичный маршрут
    // meta: { requiresAuth: true, requiredLevel: 3 }, // Уровень доступа 3
  },
  {
    path: '/workflow',
    name: 'WorkFlow',
    component: WorkFlow,
    meta: { public: true } // Публичный маршрут
  },
  // {
  //   path: '/:pathMatch(.*)*', // Ловим все несуществующие маршруты
  //   redirect: '/', // Перенаправляем на главную страницу
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   const isAuthenticated = !!store.getters.isAuthenticated; // Используем геттер из Vuex
//   const userLevel = store.getters.level || 0; // Получаем уровень доступа пользователя из Vuex

//     // Пропускаем публичные маршруты
//     if (to.matched.some(record => record.meta.public)) {
//       return next();
//     }
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     if (!isAuthenticated) {
//       // Сохраняем запрашиваемый маршрут для перенаправления после входа
//       localStorage.setItem('redirectPath', to.fullPath);
//       next('/login'); // Перенаправляем на страницу логина
//     } else if (to.meta.requiredLevel && userLevel < to.meta.requiredLevel) {
//       // Если у пользователя недостаточно прав
//       next('/access-denied'); // Перенаправляем на страницу с ошибкой доступа
//     } else {
//       next(); // Продолжаем навигацию
//     }
//   } else {
//     next(); // Продолжаем навигацию
//   }
// });

export default router;
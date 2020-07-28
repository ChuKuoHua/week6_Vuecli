import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/front/Home'),
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('@/views/front/About'),
      },
      {
        path: '/products',
        name: 'Products',
        component: () => import('@/views/front/Products'),
      },
      {
        path: '/product/:id',
        name: 'Product',
        component: () => import('@/views/front/Product'),
      },
      {
        path: '/cart',
        name: 'Cart',
        component: () => import('@/views/front/Cart'),
      },
      {
        path: '/checkout',
        name: 'Checkout',
        component: () => import('@/views/front/Checkout'),
      },
      {
        path: '/success',
        name: 'Success',
        component: () => import('@/views/front/OrderSuccess'),
      },
    ],
  },
  // 巢狀路由
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/backstage/Login'),
  },
  {
    path: '/admin',
    component: () => import('@/views/backstage/Dashboard'),
    children: [
      {
        path: 'products',
        name: 'BackProducts',
        component: () => import('@/views/backstage/Products'),
      },
      {
        path: 'orders',
        name: 'BackOrders',
        component: () => import('@/views/backstage/Orders'),
      },
      {
        path: 'coupons',
        name: 'BackCoupons',
        component: () => import('@/views/backstage/Coupons'),
      },
      {
        path: 'pictures',
        name: 'BackPictures',
        component: () => import('@/views/backstage/Pictures'),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;

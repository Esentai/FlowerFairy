import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Add from "@/views/Add";
import Auth from "@/views/Auth";
import Details from "@/views/Details";
Vue.use(VueRouter)


if (!localStorage.getItem('login')){
  localStorage.setItem('login', 'false');
}



const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/add',
    name: 'Add',
    component: Add,
    meta: {requiresAuth: true}
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/:id',
    name: 'Advert',
    component: Details,
    props: true,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next) => {
  if(to.matched.some(route => route.meta.requiresAuth)){
    if (localStorage.getItem('login') === 'true'){
      return next();
    }
    return next('/auth');
  }
  next();
});

export default router

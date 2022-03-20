import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import HomeView from '@/views/HomeView.vue'
import TryingStuffs from '@/components/TryingStuffs.vue'

const routes = [
    {
        path: '/',
        name: 'HomeView',
        component: HomeView
    },
    {
        path: '/registerview',
        name: 'RegisterView',
        component: RegisterView
    },
    {
        path: '/loginview',
        name: 'LoginView',
        component: LoginView
    },
    {
        path: '/tryingstuffs',
        name: 'TryingStuffs',
        component: TryingStuffs
    },

]
const router = createRouter({
    history: createWebHistory(), routes
})

router.beforeEach((to, from, next) => {
    // remove modal backdrop if one exists
    let modalBackground = document.querySelector('.modal-backdrop')
    if (modalBackground) {
      modalBackground.remove()
    }
    // do other stuff
  
    next()
  })


export default router
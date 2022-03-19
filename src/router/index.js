import { createRouter, createWebHistory } from 'vue-router'
// import Home from '@/views/Home.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import HomeView from '@/views/HomeView.vue'

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
        // path: '/',
        name: 'LoginView',
        component: LoginView
    },
]
const router = createRouter({
    history: createWebHistory(), routes
})

export default router
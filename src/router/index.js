import { createRouter, createWebHistory } from 'vue-router'
// import Home from '@/views/Home.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'

const routes = [
    // {
    //     path: '/',
    //     name: 'Home',
    //     component: Home
    // },
    {
        path: '/registerview',
        name: 'RegisteView',
        component: RegisterView
    },
    {
        // path: '/loginview',
        path: '/',
        name: 'LoginRouter',
        component: LoginView
    },
]
const router = createRouter({
    history: createWebHistory(), routes
})

export default router
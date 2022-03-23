import { createRouter, createWebHistory } from 'vue-router'
import FoodAndDining from '@/components/FoodAndDining.vue'

const routes = [
    {
        path: '/',
        name: 'FoodAndDining',
        component: FoodAndDining
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
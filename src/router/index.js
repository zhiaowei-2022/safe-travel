import { createRouter, createWebHistory } from 'vue-router'
import FoodAndDining from '@/components/FoodAndDining.vue'
import ThingsToDo from '@/components/ThingsToDo.vue'

const routes = [
    {
        path: '/',
        name: 'FoodAndDining',
        component: FoodAndDining
    },
    {
        path: '/ThingsToDo',
        name: 'ThingsToDo',
        component: ThingsToDo
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
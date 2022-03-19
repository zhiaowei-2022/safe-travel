import { createRouter, createWebHistory } from 'vue-router'
import BookFlight from '@/components/BookFlight.vue'
import FlightResults from '@/components/FlightResults.vue'

const routes = [
    {
        path: '/',
        name: 'BookFlight',
        component: BookFlight
    },
    {
        path: '/flightresults',
        name: 'FlightResults',
        component: FlightResults
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
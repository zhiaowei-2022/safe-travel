import { createRouter, createWebHistory } from 'vue-router'
import AccomodationPage from '@/components/AccomodationPage.vue'
import AccomodationResults from '@/components/AccomodationResults.vue'
import BookFlight from '@/components/BookFlight.vue'
import FlightResults from '@/components/FlightResults.vue'
// import checkFB from '@/components/checkFB.vue'

const routes = [
    {
        path: '/',
        name: 'AccomodationPage',
        component: AccomodationPage
    },
    {
        path: '/accomodationresults',
        name: 'AccomodationResults',
        component: AccomodationResults
    },
    {
        path: '/bookflight',
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
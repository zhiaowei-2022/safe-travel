import { createRouter, createWebHistory } from 'vue-router'
import AccomodationPage from '@/components/AccomodationPage.vue'
import AccomodationResults from '@/components/AccomodationResults.vue'

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
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
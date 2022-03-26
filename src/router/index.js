import { createRouter, createWebHistory } from 'vue-router'
import FoodAndDining from '@/components/FoodAndDining.vue'
import ThingsToDo from '@/components/ThingsToDo.vue'
import AccomodationPage from '@/components/AccomodationPage.vue'
import AccomodationResults from '@/components/AccomodationResults.vue'
import BookFlight from '@/components/BookFlight.vue'
import FlightResults from '@/components/FlightResults.vue'
// import checkFB from '@/components/checkFB.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import HomeView from '@/views/HomeView.vue'
import TryingStuffs from '@/components/TryingStuffs.vue'

const routes = [
    {
        path: '/FoodAndDining',
        name: 'FoodAndDining',
        component: FoodAndDining
    },
    {
        path: '/ThingsToDo',
        name: 'ThingsToDo',
        component: ThingsToDo
    },
    {
        path: '/accomodationpage',
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
    },    {
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
    history: createWebHistory(),
    routes
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
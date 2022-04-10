import { createRouter, createWebHistory } from 'vue-router'
import FoodAndDining from '@/components/FoodAndDining.vue'
import ThingsToDo from '@/components/ThingsToDo.vue'
import AccommodationPage from '@/components/AccommodationPage.vue'
import AccommodationResults from '@/components/AccommodationResults.vue'
import BookFlight from '@/components/BookFlight.vue'
import FlightResults from '@/components/FlightResults.vue'
import RegisterView from '@/views/RegisterView.vue'
import HomeView from '@/views/HomeView.vue'
import FavouritePage from '@/components/FavouritePage.vue'
import UserProfile from '@/components/UserProfile.vue'

const st = (title) => `Safe Travel | ${title}`

const routes = [
    {
        path: '/FoodAndDining',
        name: 'FoodAndDining',
        component: FoodAndDining,
        meta: {
            title: st("Food And Dining")
        }
    },
    {
        path: '/ThingsToDo',
        name: 'ThingsToDo',
        component: ThingsToDo,
        meta: {
            title: st("Things To Do")
        }
    },
    {
        path: '/accommodationpage',
        name: 'AccommodationPage',
        component: AccommodationPage,
        meta: {
            title: st("Accommodations")
        }
    },
    {
        path: '/accommodationresults',
        name: 'AccommodationResults',
        component: AccommodationResults,
        meta: {
            title: st("Accommodation Results")
        }
    },
    {
        path: '/bookflight',
        name: 'BookFlight',
        component: BookFlight,
        meta: {
            title: st("Book Flights")
        }
    },
    {
        path: '/flightresults',
        name: 'FlightResults',
        component: FlightResults,
        meta: {
            title: st("Flight Results")
        }
    },
    {
        path: '/',
        name: 'HomeView',
        component: HomeView,
        meta: {
            title: st("Home")
        }
    },
    {
        path: '/registerview',
        name: 'RegisterView',
        component: RegisterView,
        meta: {
            title: st("Register")
        }
    },
    {
        path: '/userprofile',
        name: 'UserProfile',
        component: UserProfile,
        meta: {
            title: st("Profile Page")
        }
    },
    {
        path: '/favouritepage',
        name: 'FavouritePage',
        component: FavouritePage,
        meta: {
            title: st("Favourites")
        }
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes,
    // linkActiveClass: "active"
})

router.beforeEach((to, from, next) => {
    // remove modal backdrop if one exists
    let modalBackground = document.querySelector('.modal-backdrop')
 
    if (modalBackground) {
        modalBackground.remove()
    }
    const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
  
    // Find the nearest route element with meta tags.
    const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
  
    const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
  
    // If a route with a title was found, set the document (page) title to that value.
    if(nearestWithTitle) {
      document.title = nearestWithTitle.meta.title;
    } else if(previousNearestWithMeta) {
      document.title = previousNearestWithMeta.meta.title;
    }
  
    // Remove any stale meta tags from the document using the key attribute we set below.
    Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));
  
    // Skip rendering meta tags if there are none.
    if(!nearestWithMeta) return next();
  
    // Turn the meta tag definitions into actual elements in the head.
    nearestWithMeta.meta.metaTags.map(tagDef => {
      const tag = document.createElement('meta');
  
      Object.keys(tagDef).forEach(key => {
        tag.setAttribute(key, tagDef[key]);
      });
  
      // We use this to track which meta tags we create so we don't interfere with other ones.
      tag.setAttribute('data-vue-router-controlled', '');
  
      return tag;
    })
    // Add the meta tags to the document head.
    .forEach(tag => document.head.appendChild(tag));
    
    // do other stuff
    next()
  })

export default router
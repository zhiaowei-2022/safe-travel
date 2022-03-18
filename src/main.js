import { createApp } from 'vue'
import App from './App.vue'
// import router from './router/index.js'
// createApp(App).mount('#app')

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas);
import { dom } from "@fortawesome/fontawesome-svg-core";
dom.watch();



// const app = createApp(App).use(router);
const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);

// add necessary dependencies...

app.mount("#app");
window.$ = window.jQuery = require("jquery");

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);
import { dom } from "@fortawesome/fontawesome-svg-core";
dom.watch();

const app = createApp(App).use(router);

app.component("font-awesome-icon", FontAwesomeIcon);

// add necessary dependencies...

app.mount("#app");

import { createApp } from 'vue'
import App from './App.vue'
import {router} from "./includes/router.ts";
import store from "./includes/store.ts";
import "./main.css";

createApp(App)
    .use(router)
    .use(store)
    .mount('#app')

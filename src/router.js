import Vue from "vue";
import Router from "vue-router";
import LoginPage from "@/views/LoginPage.vue"
import Dashboard from "@/views/Dashboard.vue"

Vue.use(Router);

const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            name: "login",
            component: LoginPage,
        },
        {
            path: "/dashboard",
            name: "dashboard",
            component: Dashboard
        }
    ]
})

export default router;
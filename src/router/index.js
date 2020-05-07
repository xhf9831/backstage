import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/home'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('../views/login/login')
    },
    {
        path: '/register',
        name: 'register',
        component: () =>
            import ('../views/register/register')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
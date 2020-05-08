import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/home'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: {
            title: '首页'
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('../views/login/login'),
        meta: {
            title: '登录'
        }
    },
    {
        path: '/register',
        name: 'register',
        component: () =>
            import ('../views/register/register'),
        meta: {
            title: '注册'
        }
    },
    {
        path: '/findback',
        name: 'findback',
        component: () =>
            import ('../views/findback/findback'),
        meta: {
            title: '找回密码'
        }
    }
]



const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    let token = localStorage.getItem('adminToken')
        // let isLock = sessionStorage.getItem('isLock')
        // if (isLock !== '0' || to.path === '/lockView') next()
        // else next('/lockView')
    if (to.path === '/login' || to.path === '/register' || to.path === '/findback') next()
    else token ? next() : next('/login')
})

export default router
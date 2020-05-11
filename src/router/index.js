import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/home'
import common from '../components/common/common'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: common,
        children: [{
            path: '',
            name: 'home',
            component: Home,
            meta: {
                title: '首页',
                enTitle: 'dashboard'
            },
        }]
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
    },
    {
        path: '/calendar',
        component: common,
        children: [{
            path: '',
            name: 'calendar',
            component: () =>
                import ('../views/calendar/calendar.vue'),
            meta: {
                title: '日程',
                enTitle: 'calendar'
            }
        }],

    },
    {
        path: '/mailList',
        component: common,
        children: [{
            path: '',
            name: 'mailList',
            component: () =>
                import ('../views/maillist/maillist.vue'),
            meta: {
                title: '通讯录',
                enTitle: 'mailList'
            }
        }],
    },
    {
        path: '/form',
        component: common,
        meta: {
            title: '表单页',
            enTitle: 'form',
        },
        children: [{
            path: 'stepForm',
            name: 'stepForm',
            component: () =>
                import ('../views/stepForm/stepForm.vue'),
            meta: {
                title: '分步表单',
                enTitle: 'stepForm'
            },
        }],
    },
    {
        path: '/organization',
        component: common,
        meta: {
            title: '组织员工',
            enTitle: 'organize'
        },
        children: [{
                path: 'offer',
                name: 'offer',
                component: () =>
                    import ('../views/offer/offer.vue'),
                meta: {
                    title: 'offer管理',
                    enTitle: 'offer',
                }
            },
            {
                path: 'userInfo',
                name: 'userInfo',
                enTitle: 'userInfo',
                component: () =>
                    import ('../views/userInfo/userInfo.vue'),
                meta: {
                    title: '人员信息',
                    enTitle: 'userInfo'
                }
            },
            {
                path: 'pay',
                name: 'pay',
                component: () =>
                    import ('../views/pay/pay.vue'),
                meta: {
                    title: '薪酬管理',
                    enTitle: 'payMent'
                }
            }
        ]
    },
    {
        path: '/lockView',
        name: 'lockView',
        component: () =>
            import ('../views/lockView/lockView'),
        meta: {
            title: '锁屏'
        },
    },
    {
        path: '*',
        component: common,
        meta: {
            title: '错误页面'
        },
        children: [{
            path: '',
            component: () =>
                import ('../views/err/404.vue')
        }]
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
    let isLock = localStorage.getItem('isLock')
    if (isLock !== '0' || to.path === '/lockView') next()
    else next('/lockView')
    if (to.path === '/login' || to.path === '/register' || to.path === '/findback') next()
    else token ? next() : next('/login')
})

export default router
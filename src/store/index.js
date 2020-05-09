import Vue from 'vue'
import Vuex from 'vuex'
import login from './login'
import home from './home'
import calendar from './calendar'
import maillist from './maillist'
import offer from './offer'
import pay from './pay'
import stepForm from './stepForm'
import userInfo from './userInfo'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        login,
        home,
        calendar,
        maillist,
        offer,
        pay,
        stepForm,
        userInfo
    }
})
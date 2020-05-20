import api from '../../http/api'
import router from '../../router'
import { Message } from 'element-ui'
export default {
    namespaced: true,
    state: {
        calendarList: []
    },
    mutations: {
        setCalendar(state, data) {
            state.calendarList = data
        }
    },
    actions: {
        async getCalendar({ commit }) {
            let res = await api.getCalendar()
            if (res.code === 200) {
                console.log(res);
                commit('setCalendar', res.data)
            }
        },
        async addCalendar({ commit, dispatch }, parmas) {
            let res = await api.addCalendar(parmas)
            if (res.code === 200) {
                dispatch('getCalendar')
                Message.success(res.msg)
            }
        },
        async repeatDynamic({ commit, dispatch }, params) {
            let res = await api.repeatDynamic(params)
            if (res.code === 200) {
                dispatch('getCalendar')
                Message.success(res.msg)
            }
        },
        async delCalendar({ commit, dispatch }, params) {
            let res = await api.delCalendar(params)
            if (res.code === 200) {
                dispatch('getCalendar')
                Message.success(res.msg)
            }
        }
    }
}
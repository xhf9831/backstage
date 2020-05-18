import api from '../../http/api'
import router from '../../router'
import { Message } from 'element-ui'
export default {
    namespaced: true,
    state: {
        pay: []
    },
    mutations: {
        setPay(state, data) {
            state.pay = data
        }
    },
    actions: {
        async getPay({ commit }) {
            let res = await api.getPay()
            if (res.code === 200) {
                console.log(res);
                commit('setPay', res.data)
            }
        }
    }
}
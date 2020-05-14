import api from '../../http/api'
import router from '../../router'
import { Message } from 'element-ui'
export default {
    namespaced: true,
    state: {
        userinfo: []
    },
    mutations: {
        setUserinfo(state, data) {
            state.userinfo = data
        }
    },
    actions: {
        async getInfo({ commit }) {
            let res = await api.getInfo()
            if (res.code === 200) {
                commit('setUserinfo', res.data)
                console.log(res.data);
            }
        }
    }
}
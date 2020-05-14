import api from '../../http/api'
import router from '../../router'
import { Message } from 'element-ui'
export default {
    namespaced: true,
    state: {
        offer: []
    },
    mutations: {
        setOffer(state, data) {
            state.offer = data
        }
    },
    actions: {
        async getAtitude({ commit }) {
            let res = await api.getAtitude()
            console.log(res);
            if (res.code === 200) {
                commit('setOffer', res.data)
            }
        }
    }
}
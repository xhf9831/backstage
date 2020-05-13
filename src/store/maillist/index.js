import api from '../../http/api'
import router from '../../router'
import { Message } from 'element-ui'
export default {
    namespaced: true,
    state: {
        mail: [],
        tree: []
    },
    mutations: {
        setMail(state, data) {
            state.mail = data
        },
        setTree(state, data) {
            state.tree = data
        }
    },
    actions: {
        async getMail({ commit }) {
            let res = await api.getMail()
            if (res.code === 200) {
                commit('setMail', res.data)
            }
        },
        async getTree({ commit }) {
            let res = await api.getTree()
            if (res.code === 200) {
                commit('setTree', res.data.data)
            }
        }
    }
}
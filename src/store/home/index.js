import api from '../../http/api'
import router from '../../router'
import { Message } from 'element-ui'
export default {
    namespaced: true,
    state: {
        countdata: ''
    },
    mutations: {
        setCount(state, data) {
            state.countdata = data
        }
    },
    actions: {
        async getProgress({ commit }) {
            let res = await api.getProgress()
            if (res.code === 200) {
                res.data.map((item, index) => {
                    if (Number(item.value) === 0) {
                        item.value = '-'
                    }
                    if (index === 0) {
                        item.enTitle = 'revenue'
                        item.barColor = '#5EB0FE'
                        item.backgroundColor = '#A9D0FF'
                        item.desc = 'rate'
                    }
                    if (index === 1) {
                        item.enTitle = 'repaid'
                        item.barColor = '#80E313'
                        item.backgroundColor = '#D3F4AF'
                        item.desc = 'rate'
                    }
                    if (index === 2) {
                        item.enTitle = 'price'
                        item.barColor = '#F2AE57'
                        item.backgroundColor = '#FFE8CC'
                        item.desc = 'rate'
                    }
                })
                console.log(res.data);
                commit('setCount', res.data)
            }
        }
    }
}
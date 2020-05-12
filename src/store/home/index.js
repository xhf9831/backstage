import api from '../../http/api'
import dayjs from 'dayjs'
import router from '../../router'
import { Message } from 'element-ui'
export default {
    namespaced: true,
    state: {
        countdata: '',
        citydata: [],
        reports: [],
        reportuser: []
    },
    mutations: {
        setCount(state, data) {
            state.countdata = data
        },
        setCity(state, data) {
            state.citydata = data
        },
        setReport(state, data) {
            state.reports = data
        },
        setReportuser(state, data) {
            state.reportuser = data
        }
    },
    actions: {
        //获取进度
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
                commit('setCount', res.data)
            }
        },
        //获取城市
        async getCityValue({ commit }) {
            let res = await api.getCityValue()
            if (res.code === 200) {
                commit('setCity', res.data)
            }
        },
        //获取动态 
        async getDynamic({ commit }) {
            let res = await api.getDynamic()
            if (res.code === 200) {
                console.log(res);
                res.data.map(item => {
                    item.time = dayjs(item.date).format('YYYY年MM月DD日')
                    item.date = dayjs(item.date).format('YYYY-MM-DD')
                })
                commit('setReport', res.data)
            }
        },
        //获取报告人
        async getReport({ commit }) {
            let res = await api.getReport()
            if (res.code === 200) {
                commit('setReportuser', res.data)
            }
        },
        //添加动态
        async addDynamic({ commit }, params) {
            let res = await api.addDynamic(params)
            if (res.code === 200) {
                Message.success(res.msg)
            }
        }
    }
}
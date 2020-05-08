import api from '../../http/api'
import router from '../../router'
import { Message } from 'element-ui'
export default {
    namespaced: true,
    state: {
        code: '',
        msg: '',
        menu: ''
    },
    mutations: {
        setCode(state, data) {
            state.code = data
        },
        setSend(state, data) {
            state.msg = data
        },
        setMenu(state, data) {
            state.menu = data
        }
    },
    actions: {
        //发送验证码
        async getCaptcha({ commit }) {
            let res = await api.getCaptcha()
            commit('setCode', res)
        },
        //发送短信
        async sendMsg({ commit }, phone) {
            let res = await api.sendMsg(phone)
            if (res.code === 200) {
                Message.success('发送成功')
                commit('setSend', res.data.code)
            }
        },
        //注册
        async register({ commit }, parmas) {
            let res = await api.register(parmas)
            console.log(res);
            if (res.code === 200) {
                Message.success('注册成功')
                router.push('/login')
            } else {
                Message.warning(res.msg)
            }
        },
        //账户登录
        async login({ commit }, parmas) {
            let res = await api.login(parmas)
            if (res.code === 200) {
                Message.success('登录成功')
                localStorage.setItem('adminUser', JSON.stringify(res.data))
                localStorage.setItem('adminToken', res.token)
                router.push('/home')
            } else {
                Message.warning(res.msg)
            }
        },
        //手机登陆
        async phoneLogin({ commit }, parmas) {
            let res = await api.phoneLogin(parmas)
            if (res.code === 200) {
                Message.success('登录成功')
                localStorage.setItem('adminUser', JSON.stringify(res.data))
                localStorage.setItem('adminToken', res.token)
                router.push('/home')
            } else {
                Message.warning(res.msg)
            }
        },
        //找回密码
        async findPwd({ commit }, parmas) {
            let res = await api.findPwd(parmas)
            if (res.code === 200) {
                Message.success(res.msg)
            } else {
                Message.warning(res.msg)
            }
        },
        //获取菜单
        async getMenus({ commit }) {
            let res = await api.getMenus()
            console.log(res);
        }
    }
}
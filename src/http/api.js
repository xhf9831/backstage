import service from './index'

export default {
    // 验证码
    getCaptcha() {
        return service.get('/api/users/captcha')
    },
    // 登录
    login(params) {
        return service.post('/api/users/login', params)
    },
    // 手机号登录
    phoneLogin(params) {
        return service.post('/api/users/phoneLogin', params)
    },
    // 注册
    register(params) {
        return service.post('/api/users/register', params)
    },
    // 发送短信
    sendMsg(phone) {
        return service.post('/api/users/sendMsg', { phone })
    },
    // 找回密码
    findPwd(params) {
        return service.post('/api/users/findPwd', params)
    },
    // github登录
    gitLogin() {
        return service.get('/api/users/githubUser')
    },
    // 退出登录
    logout() {
        return service.get('/api/users/logout')
    },
    // 修改密码
    updatePwd(params) {
        return service.post('/api/users/updatePwd', params)
    },
    getMenus() {
        return service.get('/api/users/menus')
    },
    getProgress() {
        return service.get('/progress')
    },
    getCityValue() {
        return service.get('/cityValue')
    },
    // 获取动态
    getDynamic() {
        return service.get('getDynamic')
    },
    // 获取报告人
    getReport() {
        return service.get('report')
    },
    // 添加动态
    addDynamic(params) {
        return service.post('addDynamic', params)
    },
    getQuestion() {
        return service.get('question')
    },
    getCalendar() {
        return service.get('calendar')
    },
    addCalendar(params) {
        return service.post('calendar', params)
    },
    repeatDynamic(params) {
        return service.post('repeatDynamic', params)
    },
    delCalendar(params) {
        return service.post('delCalendar', params)
    }
}
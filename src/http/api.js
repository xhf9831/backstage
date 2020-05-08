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
    //上传图片
    upPhoto(file) {
        return service.post('/api/upload/image', { file })
    },
    // 退出登录
    logout() {
        return service.get('/api/users/logout')
    },
    // 修改密码
    updatePwd(params) {
        return service.post('/api/users/updatePwd', params)
    },
    //获取菜单
    getMenus() {
        return service.get('/api/users/menus')
    },
    //首页进度条数据
    getProgress() {
        return service.get('/api/progress')
    },
    //首页利润
    getCityValue() {
        return service.get('/api/cityValue')
    },
    // 获取动态
    getDynamic() {
        return service.get('/api/getDynamic')
    },
    // 获取报告人
    getReport() {
        return service.get('/api/report')
    },
    // 添加动态
    addDynamic(params) {
        return service.post('/api/addDynamic', params)
    },
    //网站调查
    getQuestion() {
        return service.get('/api/question')
    },
    //获取日程
    getCalendar() {
        return service.get('/calendar')
    },
    //添加日程
    addCalendar(params) {
        return service.post('/calendar', params)
    },
    //重复上周
    repeatDynamic(params) {
        return service.post('/repeatDynamic', params)
    },
    //删除日程
    delCalendar(params) {
        return service.post('/api/delCalendar', params)
    },
    //通讯录
    getMail() {
        return service.get('/api/getMailList')
    },
    //通讯录部门
    getTree() {
        return service.get('/api/getTreeData')
    },
    //offer状态
    getAtitude() {
        return service.get('/api/getOffer')
    },
    //获取员工信息
    getInfo() {
        return service.get('/api/userInfo')
    },
    //薪酬信息
    getPay() {
        return service.get('/api/pay')
    }
}
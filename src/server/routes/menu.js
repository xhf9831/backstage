let menus = [{
        index: '1',
        name: '首页',
        icon: 'el-icon-location',
        url: '/home',
        enName: 'dashboard',
        children: []
    },
    {
        index: '2',
        name: '日程管理',
        icon: 'el-icon-date',
        url: '/calendar',
        enName: 'calendar',
        children: []
    },
    {
        index: '3',
        name: '通讯录',
        icon: 'el-icon-document',
        url: '/maillist',
        enName: 'mailList',
        children: []
    },
    {
        index: '4',
        name: '组织员工',
        icon: 'el-icon-user',
        url: '/organization',
        enName: 'organize',
        children: [{
                index: '4-1',
                name: 'offer管理',
                icon: 'el-icon-c-scale-to-original',
                url: '/organization/offer',
                enName: 'offer',
            },
            {
                index: '4-2',
                name: '人员信息',
                icon: 'el-icon-folder-checked',
                url: '/organization/userInfo',
                enName: 'userInfo',
            },
            {
                index: '4-3',
                name: '薪酬管理',
                icon: 'el-icon-coin',
                enName: 'payMent',
                url: '/organization/pay',
            }
        ]
    },
    {
        index: '5',
        name: '表单页',
        icon: 'el-icon-files',
        url: '/form',
        enName: 'form',
        children: [{
            index: '5-1',
            name: '分步表单',
            icon: 'el-icon-edit',
            enName: 'stepForm',
            url: '/form/stepForm',
        }]
    },
]

module.exports = menus
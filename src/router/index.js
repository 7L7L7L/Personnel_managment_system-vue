import Vue from 'vue'
import router from 'vue-router'
import register from '../components/register.vue'
import login from '../components/login.vue'
import home from '../components/home.vue'
import list from '../views/user/list.vue'
import profile from '../views/user/profile.vue'
//安装路由
Vue.use(router);
//配置导出路由
export default new router({
    routes:[
        {
            name:'register',
            path:'/register',
            component : register
        },
        {
            name:'login',
            path:"/",
            component: login
        },
        {
            name:'home',
            path:'/home',
            component: home,
            children:[
                {
                    path:"/user/list",
            component: list
                },
                {
                    path:"/user/profile",
            component: profile
                }
            ]
        }
    ]

})
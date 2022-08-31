import Vue from 'vue'
import router from 'vue-router'
import register from '../components/register.vue'
import login from '../components/login.vue'
import hello from '../components/HelloWorld.vue'
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
            name:'hello',
            path:'/hello',
            component: hello
        }
    ]

})
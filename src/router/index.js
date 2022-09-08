import Vue from 'vue'
import Router from 'vue-router'
import register from '../components/register.vue'
import login from '../components/login.vue'
import home from '../components/home.vue'
import employeehome from '../components/employeehome.vue'
import employeeList from '../views/user/employeeList.vue'
import departmentList from '../views/user/departmentList.vue'
import notfound from '../views/notFound.vue'
import holidayManagement from '../views/user/holidayManagement.vue'
import holidayEmpolyee from '../views/user/holidayEmpolyee.vue'
import userProfile from '../views/user/userProfile.vue'
//安装路由
Vue.use(Router);
//配置导出路由
const routes = [

    {
        name: 'register',
        path: '/register',
        component: register
    },
    {
        name: 'login',
        path: "/",
        component: login
    },
    {
        name: 'home',
        path: '/home',
        component: home,
        children: [
            {
                path: "/employeeManagement/getList",
                component: employeeList
            },
            {
                path: "/departmentManagement/getList",
                component: departmentList
            },
            {
                path:"/holidayManagement",
                component:holidayManagement
            }
        ]
    },
    {
        name: 'employeehome',
        path: '/employeehome',
        component: employeehome,
        children:[
            {
                path:"/holidayEmpolyee",
                component: holidayEmpolyee
            },
            {
                path:"/userProfile",
                component:userProfile
            }
        ]
    },
    {
        name: 'notfound',
        path: '*',
        component: notfound
    }

]
const router = new Router({
    routes,
    mode: 'history',
    // linkActiveClass:'active'
})
router.beforeEach((to, from, next) => {
    // console.log("路由守卫")
    let token = sessionStorage.getItem("jwt");
    // console.log("token"+token)
    if (token) {
        if (to.path === "/") {
            if (login.isAdmin) {
                next({ path: "/home" });
            } else {
                next({ path: "/employeehome" });
            }

        } else {
            next();
        }
    } else {
        if (to.path === "/") {
            next();
        } else 
        if (to.path === "/register") {
            next();
        }else{
            next("/");
        }

    }
})
// 解决vue-router报NavigationDuplicated: Avoided redundant navigation to current location 的问题
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};
const originalReplace = Router.prototype.replace;
Router.prototype.replace=function replace(location) {
    return originalReplace.call(this,location).catch(err => err)
};

export default router;

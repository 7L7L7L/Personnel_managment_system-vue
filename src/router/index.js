import Vue from 'vue'
import Router from 'vue-router'
import register from '../components/register.vue'
import login from '../components/login.vue'
import home from '../components/home.vue'
import managementhome from '../components/managementhome.vue'
import employeehome from '../components/employeehome.vue'
import employeeList from '../views/user/employeeList.vue'
import departmentList from '../views/user/departmentList.vue'
import notfound from '../views/notFound.vue'
import holidayManagement from '../views/user/holidayManagement.vue'
import holidayEmpolyee from '../views/user/holidayEmpolyee.vue'
import salaryManagement from '../views/user/salaryManagement.vue'
import salaryEmployee from '../views/user/salaryEmployee.vue'
import overtimeManagement from '../views/user/overtimeManagement.vue'
import overtimeEmployee from '../views/user/overtimeEmployee.vue'

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
        name: 'managementhome',
        path: '/managementhome',
        component: managementhome,
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
            },
            {
                path:"/overtimeManagement",
                component:overtimeManagement
            },
            {
                path:"/salaryManagement",
                component:salaryManagement
            },
            {
                name:'home',
                path:'/managementhome/home',
                component:home,
              
            },
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
                path:"/overtimeEmployee",
                component: overtimeEmployee
            },
            {
                path:"/salaryEmployee",
                component:salaryEmployee
            },
            {
                name:'home',
                path:'/employeehome/home',
                component:home,
              
            },
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
                next({ path: "/managementhome" });
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

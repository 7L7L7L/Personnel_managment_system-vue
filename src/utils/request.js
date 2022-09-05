import axios from 'axios'
// import { Message } from 'element-ui'
// import store from '@/store'
// import { getToken } from '@/utils/auth'
import domMessage from '@/utils/messageOnce'
// import { resetRouter } from '@/router'
const messageOnce = new domMessage()
// 创建axios实例对象
const service = axios.create({
    //配置请求根地址
  baseURL: http,
  timeout: 10000 * 30 // request timeout
})
// 请求拦截器
service.interceptors.request.use(
  config => {
    let token = sessionStorage.getItem("jwt");
    // do something before request is sent
    if (token) {
      config.headers['Jwt'] = token;
    }
    config.headers['Async'] = 'true'
    config.headers['Access-Control-Allow-Origin'] = '*'
    config.headers['Access-Control-Allow-Credentials'] = 'true'
    config.headers['Content-Type'] = 'application/json;charset=utf-8;multipart/form-data;'
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

//配置相应拦截器
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // const status = response.status
    if (res.code) {
      if (res.code !== 200) {
        messageOnce.error({
          title: res.msg || 'Error',
          type: 'error',
          duration: 1500
        })
        return Promise.reject(new Error(res.msg || 'Error'))
      } else {
        return res
      }
    } else {
      return res
    }
  },
  error => {
    messageOnce.error({
      title: res.msg || 'Error',
      type: 'error',
      duration: 1500
    })
    return Promise.reject(error)
  }
)

export default service
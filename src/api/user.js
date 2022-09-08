import request from '@/utils/request'



export function login(data) {
    return request({
        url: '/user/login',
        method: 'POST',
        params: data
    })
}
export function register(data) {
    return request({
        url: '/user/register',
        method: 'POST',
        params: data
    })
}
export function updatePassword(data) {
    return request({
        url: '/user/updatePassword',
        method: 'POST',
        params: data
    })
}
export function userBind(id,uuid){
    return request({
        url: '/user/userBind/'+id+'/'+uuid,
        method: 'POST',
        params: id,uuid
    })
}
export function getOneById(data){
    return request({
        url: '/user/getOneById/'+data,
        method: 'GET',
        params: data
    })
}
import request from '@/utils/request'


export function getList(){
    return request({
        url:'/employeeManagement/getList',
        method:'GET'
    })
}
export function deleteEmployee(){
    return request({
        url:'/employeeManagement/deleteEmployee',
        method:'POST'
    })
}

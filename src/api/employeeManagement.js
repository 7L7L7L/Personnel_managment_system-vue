import request from '@/utils/request'


export function getList() {
    return request({
        url: '/employeeManagement/getList',
        method: 'GET'
    })
}
export function deleteEmployee(data) {
    return request({
        url: '/employeeManagement/deleteEmployee',
        method: 'POST',
        params: data
    })
}
export function updateEmployee(data) {
    return request({
        url: '/employeeManagement/updateEmployee',
        method: 'POST',
        params: data
    })
}
export function addOne(data) {
    return request({
        url: '/employeeManagement/addOne',
        method: 'POST',
        params: data
    })
}
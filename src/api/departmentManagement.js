import request from '@/utils/request'


export function getdepartmenList() {
    return request({
        url: '/departmentManagement/getList',
        method: 'GET'
    })
}
export function deleteOne(data) {
    return request({
        url: '/departmentManagement/deleteOne/'+data,
        method: 'POST',
        params: data
    })
}
export function updateOne(data) {
    return request({
        url: '/departmentManagement/updateOne',
        method: 'POST',
        params: data
    })
}
export function addOne(data) {
    return request({
        url: '/departmentManagement/addOne',
        method: 'POST',
        params: data
    })
}
export function getAllEmployeeManagement(data){
    
    return request({
        url: '/departmentManagement/getAllEmployeeManagement/'+data,
        method: 'GET',
        params: data
    })
}
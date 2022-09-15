import request from '@/utils/request'

export function getOvertimeList(){
    return request({
        url:'/overtimeManagement/getOvertimeList',
        method: 'GET',
    })
}
export function getOvertimeForOne() {
    return request({
        url: '/overtimeManagement/getOvertimeForOne',
        method: 'GET',
        
    })
}
export function deleteOvertime(id){
    return request({
        url:'/overtimeManagement/deleteOvertime/'+id,
        method: 'POST',
        params:id  
    })
}
export function updateOvertime(data){
    return request({
        url:'/overtimeManagement/updateOvertime',
        method: 'POST',
        params:data
    })
}
export function addOvertime(data) {
    return request({
        url: '/overtimeManagement/addOvertime',
        method: 'POST',
        params: data
    })
}
export function allowOvertime(id,isAllow) {
    return request({
        url: '/overtimeManagement/allowOvertime/'+id+'/'+isAllow,
        method: 'POST',
        params: id,isAllow
    })
}
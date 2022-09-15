import request from '@/utils/request'

export function getHolidayForOne() {
    return request({
        url: '/holidayManagement/getHolidayForOne',
        method: 'GET',
        
    })
}
export function deleteHoliday(data) {
    return request({
        url: '/holidayManagement/deleteHoliday/'+data,
        method: 'POST',
        params: data
    })
}
export function updateHoliday(data) {
    return request({
        url: '/holidayManagement/updateHoliday',
        method: 'POST',
        params: data
    })
}
export function addHoliday(data) {
    return request({
        url: '/holidayManagement/addHoliday',
        method: 'POST',
        params: data
    })
}
export function allowHoliday(id,isAllow) {
    return request({
        url: '/holidayManagement/allowHoliday/'+id+'/'+isAllow,
        method: 'POST',
        params: id,isAllow
    })
}
export function getHolidayList() {
    return request({
        url: '/holidayManagement/getHolidayList',
        method: 'GET',
        
    })
}
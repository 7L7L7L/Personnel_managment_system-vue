import request from "@/utils/request"



export function getOneSalary(data){
    return request({
        url:'/salaryManagement/getOneSalary/'+data,
        params:data,
        method: 'GET',
    })
}
export function getSalaryList(){
    return request({
        url:'/salaryManagement/getSalaryList',
        method: 'GET',
    })
}

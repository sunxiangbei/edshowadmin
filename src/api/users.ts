//获取用户列表数据
import request from "@/utils/request";

export function users(params:any){
    return request({
        url:'/api/admin/users',
        method:'get',
        params
    })
}

export function addUser(data:any){
    return request({
        url:'/api/admin/users',
        method:'post',
        data,
    })
}

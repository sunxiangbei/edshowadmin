//获取用户列表数据
import request from "@/utils/request";

export function users(params:any){
    return request({
        url:'/api/admin/users',
        method:'get',
        params
    })
}
//添加用户信息
export function addUser(data:any){
    return request({
        url:'/api/admin/users',
        method:'post',
        data,
    })
}
//获取用户信息
export function getUserInfo (userid:number){
    return request({
        url:`/api/admin/users/${userid}`,
        method:'get',
    })
}

//更新用户信息
export function updataUser (userid:number,data:any){
    return request({
        url:`/api/admin/users/${userid}`,
        method:'put',
        data
    })
}

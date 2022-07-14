import request from "@/utils/request";

//登录接口
export function login(data:object){
    return request({
        url:'/api/auth/login',
        method:'post',
        data:data
    })
}
//登录信息接口
export function User(data:object){
    return request({
        url:'/api/admin/user',
        method:'get',
    })
}
//退出登录接口
export function logout(){
    return request({
        url:'/api/auth/logout',
        method:'post',
    })
}

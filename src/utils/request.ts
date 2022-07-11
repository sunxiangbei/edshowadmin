//引入axios依赖包
import axios from "axios";
import {useRouter} from "vue-router";
import router from "@/router";
//创建axios对象
const request=axios.create({
    baseURL:"https://api.shop.eduwork.cn/",//管理后台要使用的接口基地址
    // timeout:8000,//超时时间
})
//定义前置拦截器，请求拦截器，请求发送出去之前触发
request.interceptors.request.use((config)=>{
    //    如果有一个接口需要认证才可以访问，就在这里统一设置
    const token=localStorage.getItem('token')
    // console.log(token)
    // console.log(config)
    if(token){
        config.headers.Authorization='Bearer '+token;
    }
//  config请求接口的配置信息  一定要返回，这个是固定写法
    return config
},error => {

//    报错时候会抛出一个错误信息
    return Promise.reject(error)
})

//定义响应拦截器
request.interceptors.response.use((response)=>{
    // console.log(response)
    return response
},error => {
    // if(error.response.status==401){
    //     alert('请您先登录')
    //     router.push({path:'/Login'})
    // }
    //    报错时候会抛出一个错误信息
    return Promise.reject(error)
})

export default request
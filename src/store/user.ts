import {defineStore} from "pinia";
import {login,User} from "@/api/auth";
//定义一个TS接口设置类型
export type IUserState={
    token:String,
    username:String,
    avatar:String,
    permissions:String[],
    info:Object,
}

export const useUserStore = defineStore({
    id:'app-user',
    //用IUserState定义TS类型响应的数据是Ts的结构
    //state定义里面有哪些数据
    state:():IUserState=> ({
        //有就获取使用本地token，没有就赋值为空
        token:localStorage.getItem('token')||'', //请求登录返回的token
        username:'',  //用户名
        avatar:'',  //头像
        permissions:[],  //权限
        info:{}  //用户其他详细信息
    }),
    getters:{
        getToken() : string {
            return this.token
        },
        getAvatar():string {
            return this.avatar
        },
        getUserName():string{
            return this.username
        },
        getPermissions():string{
            return this.permissions
        },
        getUserInfo():object{
            return this.info
        }
    },
    actions:{
        setToken(token:string)  {
            // sessionStorage.setItem('token',token) //会话存储
            localStorage.setItem('token',token)  //本地存储
            this.token=token
        },
        setAvatar(avatar:string)  {
            this.avatar=avatar
        },
        setUserinfo(info:object)  {
            this.info=info
        },
        setUserName(username:string){
            this.username=username
        },
        setPermissions(permissions:string[])  {
            this.permissions=permissions
        },
        //异步用户登录验证的信息
        async login(userInfo:object){
            try{
                const response=await login(userInfo)
                // console.log(response.data.access_token)
                if(response.data.access_token){
                    this.setToken(response.data.access_token)
                    //当用户登录时，在这里调用其他用户信息
                    this.getUser()
                }
            }catch (error){
                // console.log(error)
            }finally{
                // console.log(userInfo)

            }
        },
        //异步用户已登录的信息信息
        async getUser(){
            try{
                const response=await User()
                // console.log(response)
                this.setUserinfo(response)
                this.setAvatar(response.data.avatar)
                this.setUserName(response.data.name)
                this.permissions(response.permissions)
                // if(response.data){
                //     this.setUserinfo(response.data)
                //     this.setPermissions(response.data.permissions)
                // }
            }catch (error){
                console.log(error)
            }
        }
    }
})


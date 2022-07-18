//导入路由
import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
//导入路由组件
import Home from '@/views/Home.vue'
import Login from '@/views/Login/index.vue'
//在外面导入的路由很多的情况下，可以把这些封装成一个函数
//引入当前目录下的所有ts
const modues=import.meta.globEager('./modues/**/*.ts');
//定义一个route的结构是数组，用来接收上面导入函数中所有要导入的ts文件
const routeModuleList:RouteRecordRaw[]=[]
//遍历函数中的文件，导入数组中
Object.keys(modues).forEach((key)=>{
    const mod=modues[key].default || {}
    const modList=Array.isArray(mod)?[...mod]:[mod]
    routeModuleList.push(...modList)
})
// console.log(routeModuleList)
//引入把dashboard解剖出去的路由
//这样一个一个引入会积累很多代码，可以把它们进行一个函数的封装遍历。见上面
// import dashboard from "./modues/dashboard";
// import user from "@/router/modues/user";
// import order from "@/router/modues/order";
//定义路由跳转
const routes = [
    {
      path: '/',
      redirect: '/Login'
    },
    {
      path: '/Home',
      component: Home ,
      name:'home',
      meta:{title:'首页'},
    },
    {
      path: '/Login',
      component: Login ,
      name:'Login',
      meta:{title:'登录'}
    },
    // {  把Dashboard路由分解出去，因为路由太多会累赘，进行重新定义
    //   path:'/Dashboard',
    //   component: Dashboard,
    //   meta:{title:'控制台'}
    // }
]
//>把所有设置好的路由进行，展开赋值
const baseRoutes=[...routes,...routeModuleList /*...dashboard,...user,...order*/]


//创建路由
const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history:createWebHistory(),
    routes:baseRoutes, // `routes: routes` 的缩写
})
//导航守卫
router.beforeEach((to,from,next)=>{
    //把各个页面的title进行动态赋值
    document.title=to.meta.title
    // console.log(to)
//注意：方法一如果以后if判断hash地址很多可以定义一个数组进行判断
    // const pastArr=['/Home','/Home/uesrs','/Home/rights']
    // if(pastArr.indexOf(to.path)!==-1)
    //这个就可以用indexOf进行判断里面不等于-1
    //1判断访问地址是否是后台页面，如果是就进行判断token账号密码
    // console.log(to,from)
    // if(to.path =='/Dashboard'){
    //     // console.log(to)
    //     //2然后获取页面的token
    //     const token=localStorage.getItem('token')
    //     //3再次判断token如果相等就放行
    //         if(token){
    //             next()
    //         }else{
    //             //    否则就保持登录页面
    //             router.push('/Login')
    //         }
    //     }else{
    //     // 判断不是就放行放他去别的页面
    //         next()
    // }
    //方法二如果to.name不等于登录页
    if(to.name!='Login'){
    // 就再次判断，如果没有token
        if(!localStorage.getItem('token')){
    // 就还保持在登录页
            next({
                path:'/Login',
                query:{
                    redirect:to.fullPath
                }
            })
        }
    }
    next()
})
//暴露路由
export {routeModuleList}
export default router
//导入路由
import { createRouter, createWebHistory } from 'vue-router'
//导入路由组件
import Home from '@/views/Home.vue'
import Login from '@/views/Login/index.vue'
import Dashboard from '@/views/Dashboard/index.vue'
//引入把dashboard解剖出去的路由
import dashboard from "./modues/dashboard";


//定义路由跳转
const routes = [
    {
      path: '/',
      redirect: '/Login'
    },

    {
      path: '/Home',
      component: Home ,
      meta:{title:'首页'}
    },

    {
      path: '/Login',
      component: Login ,
      name:'Login',
      meta:{title:'登录页'}
    },

    // {  把Dashboard路由分解出去，因为路由太多会累赘，进行重新定义
    //   path:'/Dashboard',
    //   component: Dashboard,
    //   meta:{title:'控制台'}
    // }
]

//>把所有设置好的路由进行，展开赋值
const baseRoutes=[...routes,...dashboard]


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
    console.log(to)
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
export default router
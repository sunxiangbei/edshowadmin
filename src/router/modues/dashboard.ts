//把路由下的导航栏分解出来
import {RouteRecordRaw} from "vue-router";
import Layout from "@/layout/index.vue"
//引入公共的图标进行图标修改
import {renderIcon} from "@/utils";
import {Browsers} from '@vicons/ionicons5'
const routeName='dashboard'
//name 路由名称，必须设置，且不能重名
//meta 路由元信息 （路由附带扩展信息）
//redirect 重定向地址，访问这个路由时，自动进行重定向
//meta.disabled 禁用整个菜单
//meta.title 菜单名称
//meta.icon 菜单图标
//meta.sort 排序越小越排前

const routes:Array<RouteRecordRaw>=[
    {
        path:'/dashboard',
        name:routeName,
        component:Layout,
        redirect:'/dashboard/console',
        meta:{
            title:'主控台',
            icon:renderIcon(Browsers),
            sort:0,
        },
        children:[
            {
                path:'console',
                name:`${routeName}_console`,
                // meta:{
                //     // title:'主控台',
                //     // icon:renderIcon(Browsers)
                // },
                component:()=>import('@/views/Dashboard/index.vue')
            }
        ]
    }
]
export default routes

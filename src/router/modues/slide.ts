//把路由下的导航栏分解出来
import {RouteRecordRaw} from "vue-router";
import Layout from "@/layout/index.vue"
import {Body} from '@vicons/ionicons5'
import {renderIcon} from "@/utils";

const routeName='slide'
//name 路由名称，必须设置，且不能重名
//meta 路由元信息 （路由附带扩展信息）
//redirect 重定向地址，访问这个路由时，自动进行重定向
//meta.disabled 禁用整个菜单
//meta.title 菜单名称
//meta.icon 菜单图标
//meta.sort 排序越小越排前

const routes:Array<RouteRecordRaw>=[
    {
        path:'/slide',
        name:routeName,
        component:Layout,
        redirect:'/slide/list',
        meta:{
            title:'轮播管理',
            icon:renderIcon(Body),
            sort:3,
        },
        children:[
            {
                path:'list',
                name:`${routeName}_list`,
                meta:{
                    title:'轮播列表',
                    icon:renderIcon(Body)
                },
                component:()=>import('@/views/slide/index.vue')
            }
        ]
    }
]
export default routes

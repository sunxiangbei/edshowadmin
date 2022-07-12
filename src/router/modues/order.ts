//把路由下的导航栏分解出来
import {RouteRecordRaw} from "vue-router";
import Layout from "@/layout/index.vue"
import {renderIcon} from "@/utils";
import {JournalOutline} from '@vicons/ionicons5'

const routeName='order'
//name 路由名称，必须设置，且不能重名
//meta 路由元信息 （路由附带扩展信息）
//redirect 重定向地址，访问这个路由时，自动进行重定向
//meta.disabled 禁用整个菜单
//meta.title 菜单名称
//meta.icon 菜单图标
//meta.sort 排序越小越排前

const routes:Array<RouteRecordRaw>=[
    {
        path:'/order',
        name:routeName,
        component:Layout,
        redirect:'/order/list',
        meta:{
            title:'财务管理',
            icon:renderIcon(JournalOutline),
            sort:2,
        },
        children:[
            {
                path:'list',
                name:`${routeName}_list`,
                meta:{
                    title:'订单列表',
                    // icon:renderIcon(JournalOutline)
                },
                component:()=>import('@/views/order/index.vue')
            },
            {
                path:'refund',
                name:`${routeName}_refund`,
                meta:{
                    title:'退款订单',
                    // icon:renderIcon(JournalOutline)
                },
                component:()=>import('@/views/order/refund.vue')
            },
        ]
    }
]
export default routes

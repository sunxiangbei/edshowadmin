import {Component, h} from "vue";
import {NIcon} from "naive-ui";
//公共的图标
export const renderIcon = (icon: Component):Component=> {
    return () => h(NIcon, null, { default: () => h(icon) })
}

export function generatorMenu(routerMap:Array<any>){
    //把放在大数组里面的路由设置上sort属性，对列表进行sort排序
    routerMap.sort((a, b)=>a.meta.sort - b.meta.sort)
    console.log(routerMap)
    //用map遍历这个数组
    let result=routerMap.map((item)=>{
        let menu={
            label:item?.meta?.title,
            key:item?.name,
            icon:item.meta?.icon
        }
        if(item.children && item.children.length>1){
            menu.children=generatorMenu(item.children)
        }
        console.log(menu)
        return menu
    })
    return  result
}
import {Component, h} from "vue";
import {NIcon} from "naive-ui";
//公共的图标
export const renderIcon = (icon: Component):Component=> {
    return () => h(NIcon, null, { default: () => h(icon) })
}

export function generatorMenu(routerMap:Array<any>){
    //把放在大数组里面的路由设置上sort属性，对列表进行sort排序
    routerMap.sort((a, b)=>a.meta.sort - b.meta.sort)
    // console.log(routerMap)
    //权限
    let permissions=['users','goods','dashboard']
    //用map遍历这个数组
    let result=routerMap.map((item)=>{
        //判断item.name是否存在permissions中，如果不存在跳过
        if(!permissions.includes(item.name)){
            return null
        }


        let menu={
            label:item?.meta?.title,
            key:item?.name,
            icon:item.meta?.icon
        }
        if(item.children && item.children.length>1){
            menu.children=generatorMenu(item.children)
        }else if(item.children && item.children.length==1){
            menu.key=item.children[0].name
        }
        // console.log(menu)
        return menu
    })
    //去除result  中的null
    return  result.filter(item=>{return item!==null})
}
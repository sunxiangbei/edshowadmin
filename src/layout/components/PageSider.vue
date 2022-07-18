<template>
  <div class="pt-4">
    <div class="m-0">
      <img class="m-auto" src="@/assets/image/logo.png"  alt="logo"/>
    </div>
    <n-menu :options="menuOptions" :value="defaultKey" inverted @update:value="handleUpdateValue" />

    <!--    <n-menu-->
    <!--        :inverted="true"-->
    <!--        :collapsed-width="64"-->
    <!--        :collapsed-icon-size="22"-->
    <!--        :options="menuOptions"-->
    <!--        @update:value="selectMenu"-->
    <!--        :value="routeKey"-->
    <!--    />-->
  </div>
</template>

<script lang="ts" setup>
import {  ref ,onMounted} from 'vue'
import { h, defineComponent,  Component } from 'vue'
import { NIcon } from 'naive-ui'
import {routeModuleList}  from '@/router/index'
// console.log(routeModuleList,'123')
// function renderIcon (icon: Component) {
//   return () => h(NIcon, null, { default: () => h(icon) })
// }这个函数可以写成公共样式然后再导进来
import {generatorMenu, renderIcon} from '@/utils'

import { useRoute, useRouter } from 'vue-router';

onMounted(()=>{
  const route=useRoute()
  const routeKey=route.name
  typeof routeKey==='string'?defaultKey.value=routeKey : defaultKey.value=''

})
const router = useRouter()
const menuOptions = generatorMenu(routeModuleList)
const defaultKey=ref('dashboard')
const handleUpdateValue=(key,item) =>{
  // console.log(key)
  // console.log(item,'11')
  defaultKey.value=key
  router.push({name:key})
}

// // 获取当前页面的路由名称
// const getCurrentRouteName = () => {
//   const { name } = route.currentRoute.value
//   return name
// }
// console.log(getCurrentRouteName(),'11111111');
// const routeKey = ref(getCurrentRouteName())
// const selectMenu = (key) =>{
//   console.log(key,123)
//   routeKey.value = key
//   router.push({name:key})
// }

</script>

<style scoped>
</style>
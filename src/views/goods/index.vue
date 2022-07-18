<template>
<div>
  <div class="h-24 w-full bg-white p-3 mb-6">
    <div>
      <span class="text-slate-400 pr-1">首页</span> / <span class="pl-1">用户列表</span>
      <div class="pt-3 text-xl text-black font-medium">
        用户管理
      </div>
    </div>
  </div>
  <div class="content px-4">
    <div class="bg-white pt-4 pr-6">
      <n-form
          ref="formRef"
          inline
          :label-width="80"
          :model="formSearch"
          label-placement="left"
      >
        <n-form-item label="姓名" path="name">
          <n-input v-model:value="formSearch.name" placeholder="输入姓名" />
        </n-form-item>
        <n-form-item label="邮箱" path="email">
          <n-input v-model:value="formSearch.email" placeholder="输入邮箱" />
        </n-form-item>

        <n-form-item class="ml-auto">
          <n-button class="mr-4" attr-type="button" @click="searchRehoid">
            重置
          </n-button>
          <n-button attr-type="button" @click="searchSubmit">
            搜索
          </n-button>
        </n-form-item>
      </n-form>
    </div>
    <div class="pt-4 bg-white">
      <div class="text-md px-6 py-4 flex">
        <span>用户列表</span>
        <span class="ml-auto"><NButton type="info" @click="showModal=true">新建用户</NButton></span>
      </div>
      <div>
        <n-data-table
            :columns="columns"
            :data="data"
            :pagination="pagination"
            :bordered="false"
        />
        <div class="p-4 flex justify-end pr-10">
          <n-pagination v-model:page="page" @update:page="updatePage" :page-count="totalPages" />
        </div>
      </div>
    </div>
<!--    v-if就是在清空上次表单内留下的值-->
    <AddGoods v-if="showModal" :showModal="showModal" @checxShowModal="checxShowModal" @reloadTable="reload"></AddGoods>
<!--   :user_id=""传一个id进去 -->
  </div>
</div>

</template>

<script lang="ts" setup>
import { h ,ref,onMounted} from 'vue'
import {users} from "@/api/users";
import { NButton, useMessage ,NAvatar,NSwitch,useLoadingBar } from 'naive-ui'
import AddGoods from '@/views/goods/components/AddGoods.vue'
const page=ref(1)
const message=useMessage()
const data=ref([])
const totalPages=ref(0)
const columns =  [
  {
    title: '头像',
    key: 'avatar_url',
    render(row:any){
        //NAvatar是写一个组件对组件的引用
      return h(NAvatar,{round:true,src:row.avatar_url,size:'medium'}
        // 'img',这个是写一个属性，对属性操作
        // {src:row.avatar_url,class:'w-10 h-10 rounded-full'}
      )
    }
  },
  {
    title: '姓名',
    key: 'name'
  },
  {
    title: '邮箱',
    key: 'email'
  },
  {
    title: '是否禁用',
    key: 'is_locked',
    render(row:any){
      return h(NSwitch,{
        size:'small',
        color:'#1890ff',
        activeColor:"#52c41a",
        inactiveColor:'#d9d9d9',
        activeValue:1,
        inactiveValue:0,
        value:row.is_locked==1?false:true,
          }
      )
    }
  },
  {
    title: '创建时间',
    key: 'created_at',
  },
  {
    title: '操作',
    key: 'created_at',
    render(row:any){
      return h(NButton, {
        size:'small',
        color:'#1890ff',
        strong:true,
        onclick:()=>{
          user_id.value=row.id
          showEditModal.value=true
        }
      },'编辑')
    }
  },
]
const pagination= ref(false as const)
const formSearch=ref({
  name:'',
  email:'',
})
//添加模态框显示状态
const showModal=ref(false)
//编辑模态框显示状态
const showEditModal=ref(false)
//点击编辑把user——id进行赋值，同时传进去，让子组件通过id进行发送接口请求
const user_id=ref('')
const checxEditModal=(show)=>{
  showEditModal.value=show
}
const checxShowModal=(val)=>{
  showModal.value=val
}
//loading
const loadingBar = useLoadingBar()
//渲染整个页面请求数据
onMounted(async ()=>{
  getUserList({})
  //传入一个空对象
  const {data:res}=await users({})
  data.value=res.data
  totalPages.value=res.meta.pagination.total_pages
  page.value=res.meta.pagination.current_page
})
//点击分页进行重新请求变换分页里面的数据
//通过形参传入一个参数类型是数字类型这个是点第几页输出第几页
const updatePage=async (pageNum:number)=>{
  getUserList({
    current:pageNum,
    name:formSearch.value.name,
    email:formSearch.value.email,
  })
  // console.log(pageNum)
  //把输出的页数用过current:pageNum接口传进去，再把点击的当前页数据进行渲染
  // const {data:res}=await users({current:pageNum})
  // data.value=res.data
  // totalPages.value=res.meta.pagination.total_pages
  // page.value=res.meta.pagination.current_page
}
//点击搜索事件
const searchSubmit=async (e:any)=>{
  e.preventDefault()
  getUserList({
    name:formSearch.value.name,
    email:formSearch.value.email,
    current:1})
  //点击搜索调用接口，把要搜索的内容通过接口传进去，再渲染，current:1是不知道是第几页，让显示到第一页
  // const {data:res}=await users({name:formSearch.value.name,email:formSearch.value.email,current:1})
  // data.value=res.data
  // totalPages.value=res.meta.pagination.total_pages
  // page.value=res.meta.pagination.current_page
}
//点击重置事件
const searchRehoid=async (e:any)=>{
  e.preventDefault()
  getUserList({})
  formSearch.value.name=''
  formSearch.value.email=''
}
//上面三个接口维护会很麻烦，可以合并成一个接口
//上面三个调用这个方法，不管传什么都把它们通过params传进去交给users进行处理
const getUserList=async (params:any)=>{
  loadingBar.start()
  const {data:res}=await users(params)
  data.value=res.data
  totalPages.value=res.meta.pagination.total_pages
  page.value=res.meta.pagination.current_page
  loadingBar.finish()
}
const reload=()=>{
  getUserList({
    current:page.value,
    name:formSearch.value.name,
    email:formSearch.value.email,
  })
}
//

</script>

<style scoped>

</style>
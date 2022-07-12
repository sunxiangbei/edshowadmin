<template>
  <div class="view-account">
    <div class="view-account-header"></div>
    <div class="view-account-container">
      <div class="view-account-top">
        <div class="view-account-top-logo m-0">
          <img class="m-auto" src="@/assets/image/logo.png" alt="" />
        </div>
      </div>
      <div class="view-account-form">
        <n-form
            ref="formRef"
            label-placement="left"
            size="large"
            :model="formInline"
            :rules="rules"
        >
          <n-form-item path="username">
            <n-input v-model:value="formInline.username" placeholder="请输入用户名">
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <PersonOutline />
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item path="password">
            <n-input
                v-model:value="formInline.password"
                type="password"
                showPasswordOn="click"
                placeholder="请输入密码"
            >
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <LockClosedOutline />
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item>
            <n-button type="primary" @click="handleSubmit" size="large" :loading="loading" block>
              登录
            </n-button>
          </n-form-item>
        </n-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref,reactive} from "vue";
import {useRouter,useRoute} from "vue-router"
import { PersonOutline, LockClosedOutline} from '@vicons/ionicons5';
import {useMessage} from 'naive-ui'
const message=useMessage()
window.$message=useMessage()
//这里用红线会报错，不是因为写错了，而是因为编译器不知道是什么，需要去tsconfig.json中进行配置
// import request from "@/utils/request"; 登录页面写到了user全局里面
// //引入二次封装axios
// import {login} from "@/api/auth";
//引入store下的user 相当于vuex
import {useUserStore} from "@/store/user";
const userStore=useUserStore()
//声明一个TS接口 接收登录邮箱信息和密码为字符串
type FormState = {
  email: string;
  password: string;
}
// const userStore = useUserStore();
const loading = ref(false)
const formInline = reactive({
  username: 'super@a.com',
  password: '123123',
});
//创建formRef准备接收表单信息验证
const formRef = ref();
// console.log(formRef)
const router = useRouter();
const routr=useRoute()
const rules = {
  username: { required: true, message: '请输入用户名', trigger: 'blur' },
  password: { required: true, message: '请输入密码', trigger: 'blur' },
};
const handleSubmit=(e:Event)=>{
  //阻止表单的提交
  e.preventDefault()
  // console.log(formRef.value);
  //表单验证通过ref获取表单信息，然后验证
  formRef.value.validate(async (errors:any)=>{
    //如果有error就直接返回
    if(errors) return
  //  接收数据
    const {username,password}=formInline
  //  显示登录中
    loading.value=true
  //  调整数据结构
    const data:FormState={
      email:username,
      password:password,
    }
    // console.log(data)
  //  发送登录请求执行登录操作   这里传的data是用户数据邮箱密码
  //   const {data:res}:any=await login(data)把登录页写到了userStore中
  //  这里是调用userStore中的login方法
      userStore.login(data).then(res=>{
      console.log(res)
      //  请求成功关闭登陆中loading
      loading.value=false
      // alert('登录成功')
      message.success('登录成功')
      //保存本地tokey  这个调整到了全局状态中了
      // localStorage.setItem('token',res.access_token)
      // console.log(res.access_token)
      //  成功调整首页
        const herf=window.location.href.split('redirect=')[1]
        console.log(herf)
        // if(herf){
        //   router.push(herf)
        // }else{
        //   router.push('/Dashboard')
        // }
        console.log(herf)
        // console.log(routr);
        setTimeout(()=>{router.push('/Dashboard')},500)
    }).catch(err=>{
      loading.value=false
      alert('登录失败')
    })
  //  失败后提示
  })
}

</script>

<style lang="less" scoped>
.view-account {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
  &-container {
    flex: 1;
    padding: 32px 12px;
    max-width: 384px;
    min-width: 320px;
    margin: 0 auto;
  }
  &-top {
    padding: 32px 0;
    text-align: center;
    &-desc {
      font-size: 14px;
      color: #808695;
    }
  }
  &-other {
    width: 100%;
  }
  .default-color {
    color: #515a6e;
    .ant-checkbox-wrapper {
      color: #515a6e;
    }
  }
}
@media (min-width: 768px) {
  .view-account {
    background-image: url('@/assets/image/login.svg');
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: 100%;
  }
  .page-account-container {
    padding: 32px 0 24px 0;
  }
}
</style>
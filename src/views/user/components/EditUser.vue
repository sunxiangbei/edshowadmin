<template>
  <div>
    <n-modal v-model:show="props.showModal"
             @update:show="$emit('checxShowModal',false)"
             :mask-closable="true"
             :close-on-esc="true">
      <n-card
          style="width: 600px"
          title="编辑用户"
          :bordered="false"
          size="huge"
          role="dialog"
          aria-modal="true"
      >
        <template #header-extra>
          <span @click="$emit('checxShowModal',false)">X</span>
        </template>
        <n-form v-if="showForm" ref="formRef" :model="model" :rules="rules">
          <n-form-item path="name" label="姓名">
            <n-input v-model:value="model.name" placeholder="请输入姓名" />
          </n-form-item>
          <n-form-item path="email" label="邮箱">
            <n-input
                v-model:value="model.email"
                type="email"
                placeholder="请输入邮箱"
            />
          </n-form-item>
          <n-row :gutter="[0, 24]">
            <n-col :span="24">
              <div style="display: flex; justify-content: flex-end">
                <n-button

                    round
                    type="primary"
                    @click="userSubmit"
                >
                  修改
                </n-button>
              </div>
            </n-col>
          </n-row>
        </n-form>
        <n-skeleton v-else text :repeat="2" />
      </n-card>
    </n-modal>
  </div>
</template>

<script setup>
import {ref,onMounted} from "vue";
import {getUserInfo,updataUser} from "@/api/users";
const props=defineProps({
  showModal:{
    type:Boolean,
    default:false
  },
  user_id:{
    default:''
  }
})
const emit=defineEmits(['checxShowModal'])
//创建用于接收的数据结构
const model = ref({
  name: null,
  email: null,
})
const showForm=ref(false)
onMounted(()=>{
  // console.log(props.user_id)
  //点击谁就把谁的id里面的名字邮箱双向绑定到model
  if(props.user_id){
    getUserInfo(props.user_id).then(res=>{
      // console.log(res)
      model.value.name=res.data.name
      model.value.email=res.data.email
      showForm.value=true
    })
  }
})

const rules= {
  name: [
    {
      required: true,
      message: '请输入姓名'
    }
  ],
  email: [
    {
      required: true,
      message: '请输入邮箱'
    }
  ]
}
const formRef=ref()
const userSubmit=(e)=>{
  e.preventDefault()
  formRef.value.validate(errors=>{
    if(errors){
      // console.log(errors)
    }else {
      updataUser(props.user_id,model.value).then(res=>{
        $message.success('修改成功')
        emit('checxShowModal',false)
        emit('reloadTable')
        // parent.reloadTable()
      })
    }
  })
}
</script>

<style scoped>

</style>
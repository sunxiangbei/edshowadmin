<template>
  <div>
    <n-modal v-model:show="props.showModal"
             @update:show="$emit('checxShowModal',false)"
             :mask-closable="true"
             :close-on-esc="true">
      <n-card
          style="width: 600px"
          title="添加用户"
          :bordered="false"
          size="huge"
          role="dialog"
          aria-modal="true"
      >
        <template #header-extra>
          <span @click="$emit('checxShowModal',false)">X</span>
        </template>
        <n-form ref="formRef" :model="model" :rules="rules">
          <n-form-item path="title" label="标题">
            <n-input v-model:value="model.title" placeholder="请输入标题" />
          </n-form-item>

          <n-form-item path="url" label="跳转URL">
            <n-input
                v-model:value="model.url"
                placeholder="请输入跳转URL"
            />
          </n-form-item>
          <n-form-item label="是否启动" path="status">
            <n-radio-group v-model:value="model.status" name="status">
              <n-space>
                <n-radio :value="0">
                  否
                </n-radio>
                <n-radio :value="1">
                  是
                </n-radio>
              </n-space>
            </n-radio-group>
          </n-form-item>
          <n-form-item label="图片上传" path="status">
<!--            <n-upload :custom-request="customRequest">-->
<!--              <n-button>上传文件</n-button>-->
<!--            </n-upload> 封装到了Upload组件里面-->
            <Upload @backkey="backKey"></Upload>
          </n-form-item>
          <n-row :gutter="[0, 24]">
            <n-col :span="24">
              <div style="display: flex; justify-content: flex-end">
                <n-button

                    round
                    type="primary"
                    @click="userSubmit"

                >
                  提交
                </n-button>
              </div>
            </n-col>
          </n-row>
        </n-form>
      </n-card>
    </n-modal>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {addSlide} from '@/api/slide'
import Upload from '@/components/Upload/index.vue'
const props=defineProps({
  showModal:{
    type:Boolean,
    default:false
  }
})
const emit=defineEmits(['checxShowModal'])
const model = ref({
  title: null,
  img: null,
  url: null,
  status: null,
})
const rules= {
  title: [
    {
      required: true,
      message: '请输入标题'
    }
  ],
  img: [
    {
      required: true,
      message: '请上传图片'
    }
  ],
  url: [
    {
      required: true,
      message: '请输入跳转链接',
    },
  ],
  status: [
    {
      required: true,
      message: '请选择状态',
    },
  ]
}
const formRef=ref()
const userSubmit=(e)=>{
  e.preventDefault()
  console.log()
  formRef.value.validate(errors=>{
    if(errors){
      console.log(errors)
    }else {
      //请求api添加数据
      addSlide(model.value).then(res=>{
        console.log(res,'res')
        window.$message.success('添加成功')
        emit('checxShowModal',false)
        emit('reloadTable')
      })
      console.log(model.value)
    }
  })
}
const backKey=(key)=>{
  model.value.img=key
}
</script>

<style scoped>

</style>
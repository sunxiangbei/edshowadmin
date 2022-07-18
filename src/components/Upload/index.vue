<template>
    <n-upload :custom-request="customRequest">
      <n-button v-if="!imgurl">上传文件</n-button>
      <n-image
          v-else
          width="100"
          :src="imgurl"
       />
    </n-upload>
</template>

<script setup>
import {upLoadToken} from "@/api/base";
import {ref} from "vue";
import axios from "axios";
const emit=defineEmits(['backKey'])
const imgurl=ref(null)
const customRequest=({file,action,header,onFinish,onError})=>{
  // console.log(file,action,header,onFinish,onError)
  upLoadToken().then(res=>{
    //  图片上传的逻辑
    //   console.log(res);
    //  组装表单上传的数据

    const formData=new FormData();
    /*随机生成图片名称 带有时间戳 根据file.name来获取文件后缀名*/
    let fileName=`${Date.now()}${Math.floor(Math.random()*1000)}.${file.name.split('.').pop()}`
    formData.append('key',fileName)
    formData.append('OSSAccessKeyId',res.accessid)
    formData.append('policy',res.policy)
    formData.append('Signature',res.signature)
    formData.append('file',file.file)
    axios.post(res.host,formData,{
      headers:{
        'Content-Type':'multipart/form-data'
      }
    }).then(()=>{
      emit('backKey',fileName)
      imgurl.value=`${res.host}${fileName}`
      onFinish(fileName)
    }).catch(err=>{
      // onError(err)
    })

  })
}

</script>

<style scoped>

</style>
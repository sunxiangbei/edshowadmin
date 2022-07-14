<template>
  <div>
    <h3>用户多少人{{num}}</h3>
  </div>
</template>

<script setup >
import {users} from "@/api/users";
import {ref} from "vue";

let num=ref(0)
users().then(res=>{
  num.value=res.data.meta.pagination.total
  console.log(num)
})
</script>

<style scoped>

</style>
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
// 端口当访问 localhost 时，浏览器使用 DNS 来解析地址
import dns from 'dns'
dns.setDefaultResultOrder('verbatim')

//@1配置@符为是src根路径导入解构path模块
const {resolve}=require('path')
//@2声明一个函数封装绝对路径
function pathResolve(dir:string){
  return resolve(process.cwd(),'.',dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [NaiveUiResolver()]
    })
  ],
  // 3@配置绝对路径下的@
  resolve:{
    alias:[
      {
        find:'@',
        replacement:pathResolve('src')
      }
    ]
  },
  //设置端口号
  server:{
    host:'localhost',
    port:8000
  }
})

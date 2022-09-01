// 动态引入全局组件 
import { Component } from 'vue'
interface FileType{
  [key: string]: Component
}
interface componentItem {
  name: string
  sfc: Component
} 

const commonFiles = import.meta.globEager('./*.vue')

const componentList: componentItem[]=[]
const files: Record<string, FileType> = commonFiles

Object.keys(files).forEach((filename: string) =>{
   const compnonet = files[filename]?.default
   componentList.push({name: compnonet.name as string, sfc: compnonet})
})
export default componentList
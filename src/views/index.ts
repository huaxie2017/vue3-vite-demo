import { Component } from "vue";
interface FileType {
  [key: string]: Component;
}
interface componentItem {
  path: string;
  sfc: Component;
  children?: Array<any>;
}
const commonFiles = import.meta.globEager("./**.vue");
/**
 * vue3 使用vite构建  import.meta.globEager import.meta.glob 获取目录下的文件 
 * 一个* 不匹配子文件目录
 * 两个** 配置子文件目录
 * vue2 webpack构建 require.context(directory,useSubdirectories,regExp)
    directory:表示检索的目录
    useSubdirectories：表示是否检索子文件夹
    regExp:匹配文件的正则表达式,一般是文件名
    例如 require.context("@/views/components",false,/.vue$/)
 */
const files: Record<string, FileType> = commonFiles;
const componentList: componentItem[] = [];
Object.keys(files).forEach((filename: string) => {
  const namelist = filename
    .replace(".", "")
    .replace("index.vue", "")
    .replace(".vue", "")
    .split("/")
    .filter((i: any) => {
      return i;
    });
  const component = files[filename]?.default;
  if (namelist.length > 1) {
    namelist.forEach((name) => {
      let ret = componentList.findIndex((item) => {
        return item.path === `/${namelist[0]}`;
      });
      if (ret > -1) {
        // 避免重复生成
        let item = componentList[ret]?.children?.find((routeItem) => {
          return routeItem.path === `/${namelist[0]}/${namelist[1]}`;
        });
        // Index后缀是父路由主页
        if (namelist[1].indexOf("Index") == -1 && !item) {
          componentList[ret]?.children?.push({
            path: `/${namelist[0]}/${namelist[1]}`,
            component: component,
          });
        }
      } else {
        componentList.push({
          path: `/${namelist[0]}`,
          sfc: files[`./${namelist[0]}/${namelist[0]}Index.vue`]?.default,
          children: [],
        });
      }
    });
  } else {
    // 判断是否动态路由参数
    if(component.id){
      componentList.push({ path: `/${component.name}/:id`, sfc: component });
    }else{
      componentList.push({ path: `/${component.name}`, sfc: component });
    }
  }
});
export default componentList;

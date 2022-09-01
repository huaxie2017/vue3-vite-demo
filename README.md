# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471).


# vue3 keep-alive 写法
<router-view v-slot="{Component}">
   <keep-alive>
      <component :is="Component" />
   </keep-alive>
</router-view>

# vue2 keep-alive 写法
<keep-alive>
  <router-view></router-view>
</keep-alive>

## vue2 vue3 作用域插槽变化
vue2 作用域插槽发生变化 父组件会重新渲染
vue3 作用域插槽变化 只影响子组件重新渲染 提升性能

##移动端兼容性
300ms延迟
1px边框 transform:scale(0.5)

## toRef toRefs
toRef(obj,key) 对象内某值变成响应式数据

reactive 定义的对象 不能直接解构 用toRefs()  把整个 reactive 创建的对象变成 普通对象， 然后把每个属性变成 ref 响应式对象。

vue2 mapState mapMuations 可以展开运算符获取store的 state 和方法

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from 'pinia'
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/index.css";
import "@/assets/style/index.scss";
import "@/mock";
import { asyncRoutes } from "@/router";
import "@/components/common/index";
import componentList from "@/components/common/index";
const pinia = createPinia()

const app = createApp(App).use(router).use(store).use(ElementPlus).use(pinia);
app.directive("permission", {
  mounted(el, binding) {
    if (binding.value !== 1) {
      el.parentNode && el.parentNode.removeChild(el);
    }
  },
});

// 添加全局组件
componentList.forEach((component) => {
  app.component(component.name, component.sfc);
});
store.commit("permission/setRoutes", asyncRoutes);
router.isReady().then(() => {
  app.mount("#app");
});

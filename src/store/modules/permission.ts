import { Module } from "vuex";
import router, { constantRoutes, asyncRoutes } from "@/router";

const permissionModule = {
  namespaced: true,
  state: {
    roles: [], // 用户包含的角色
    permissions: [], // 用户指定的操作权限
    accessRoutes: constantRoutes, // 可访问路由集合
    routes: constantRoutes, // 所有路由集合
    authedRoutes: [], // 接口有权限访问的路由
  },
  mutations: {
    setRoles(state: any, payload:any) {
      state.roles = payload.roleName;
    },
    // 设置有权限访问的路由
    setAccessRoutes(state: any, routes:any) {
      state.accessRoutes = constantRoutes.concat(routes);
    },
    setRoutes(state: any, routes: any){
      state.authedRoutes = routes
      for(let obj of routes){
        for(let item of asyncRoutes){
          if(obj.path === item.path){
             router.addRoute(item)
          }
        }
      }
    }
  },
  actions: {},
};

export default permissionModule;

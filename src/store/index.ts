import { createStore } from "vuex";
import permissionModule from './modules/permission'
interface userInfo {
  name: string;
  age?: number;
}
interface StateTypes {
  count: number;
  userInfo: userInfo;
}
const store = createStore({
  state: {
    count: 0,
    userInfo: {
      name: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')!).name : ''
    },
  },
  mutations: {
    getUserInfo(state: StateTypes, payload: any) {
      const { name } = payload;
      state.userInfo.name = name;
    },
    addCount(state: StateTypes) {
      state.count++;
    },
  },
  actions: {},
  getters: {
    userInfoGetter(state: any) {
      return state.userInfo.name;
    },
  },
  modules: {
    permission: permissionModule
  }
});

export default store;

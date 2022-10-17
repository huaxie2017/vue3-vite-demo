<template>
  <commonHeader></commonHeader>
  <div v-if="loading">
    <h2>用户名：{{ name }}</h2>
    <p>x坐标： {{ x }}</p>
    <p>y坐标： {{ y }}</p>
    <HelloWorldVue v-model:str="str" />
    <button type="button" @click="add">
      count is: {{ store.state.count }}
    </button>
    <button @click="jump" v-permission="1">跳转</button>
    <div>
      <component :is="componentname" :newPeople="newPeople" />
    </div>
    <renderHtml />
    <div>{{ deepObj.userInfo.obj1.c }}</div>
    <div>13123-{{ newPeople.name }}</div>
    <div>{{ proxyUser.name }}</div>
  </div>
  <commonFooter></commonFooter>
</template>

<script lang="ts">
export default {
  name: "home",
};
</script>
<script setup lang="ts">
import {
  ref,
  shallowRef,
  onMounted,
  markRaw,
  reactive,
  isReactive,
  shallowReactive,
  watch,
  toRaw,
} from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { getUserInfo } from "../api/index";
import HelloWorldVue from "@/components/HelloWorld.vue";
import child1 from "@/components/child1.vue";
import child2 from "@/components/child2.vue";
import renderHtml from "./renderHtml.vue";
import useMousePosition from "@/hooks/commonHook";
import getWidth from "@/hooks/getWidth";
import CommonPeople from "@/utils/class";
import { asyncRoutes } from "@/router";

components: {
  HelloWorldVue;
  renderHtml;
}
const store = useStore();
const route = useRoute();
const router = useRouter();
const loading = ref(false);
const name = ref();
let newPeople = new CommonPeople();
const str = ref("111");

getWidth();
const { x, y } = useMousePosition();
type tabType = {
  name: string;
  tabComp: any;
};
interface objType {
  sex: string;
  [key: string]: string; // 任意属性 [索引签名]
}
// interface 可以重复声明 声明合并
// type 可以使用联合类型合交集 可以使用typeof
type objType1 = {
  [propsName: string]: number;
};

type objType2 = objType1 & {
  age: number;
};
type Comp = Pick<tabType, "tabComp">;

const obj = reactive<objType>({
  name: "1",
  age: "22",
  sex: "",
});

const messageObj = {
  name: "112",
  age: 122,
};
// shallowReactive 只监听第一层数据变化
const deepObj = shallowReactive({
  name: "11",
  userInfo: {
    name: "111",
    obj1: {
      c: 1,
    },
  },
});

watch(deepObj, () => {
  console.log(111);
});

type messageType = typeof messageObj; // 获取类型

const obj1: messageType = { name: "22", age: 222 };

const componentname = shallowRef(child2); // 只处理基本数据类型的响应式, 不进行对象的响应式处理

const add = () => {
  componentname.value = child1;
  store.commit("addCount");
  newPeople.setName("李四");
};
const jump = () => {
  router.push("/detail");
};

const changeName = (name: string) => {
  newPeople.setName(name);
};

// css scoped 原来
/**
 * 添加自定义属性 data-v-xxx 属性  css选择器添加属性选择器 作用于组件内部
 */

const treeList = reactive([
  {
    id: "1",
    name: "1",
    children: [
      {
        id: "1-1",
        name: "1-1",
        children: [
          {
            id: "1-1-1",
            name: "1-1-1",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "2",
    children: [
      {
        id: "2-1",
        name: "2-1",
        children: [
          {
            id: "2-1-1",
            name: "2-1-1",
          },
        ],
      },
    ],
  },
]);

const getTree = (list: any) => {
  let objArr: any[] = [];
  list.forEach((element: any) => {
    let obj: any = {};
    obj.id = element.id;
    obj.name = element.name;
    obj.str = "111";
    if (element.children && element.children.length > 0) {
      let result = getTree(element.children);
      obj.elements = result;
    }
    objArr.push(obj);
  });
  return objArr;
};

let user = {
  name: "张三",
};
let proxyUser = new Proxy(user, {
  get(target, prop) {
    console.log("get方法调用了");
    return Reflect.get(target, prop);
  },
  //修改目标对象的属性值/添加属性也会调用
  // Reflect es6特性 设置或获取对象成员 （操作对象成员）
  set(target, prop, value) {
    console.log("set方法调用了");
    return Reflect.set(target, prop, value);
  },

  //删除属性
  deleteProperty(target, prop) {
    return Reflect.deleteProperty(target, prop);
  },
});
console.log(proxyUser.name);
console.log("+++++++++++++++++");
proxyUser.name = "刘德华";
console.log(proxyUser.name);
console.log(proxyUser);

onMounted(async () => {
  let data = (await getUserInfo()) as any;
  if (!data.login) {
    router.push("/login");
  } else {
    loading.value = true;
  }
  name.value = store.state.userInfo.name;
  console.log(getTree(treeList));

  // new Proxy()
  let request1 = () => {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        resolve(1);
      }, 2000);
    });
  };
  let request2 = () => {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        resolve(2);
      }, 2000);
    });
  };

  let request3 = () => {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        resolve(3);
      }, 3000);
    });
  };

  let request4 = () => {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        resolve(4);
      }, 3000);
    });
  };
  
  let requestAll = async () =>{
       await request1()
       await Promise.all([request2,request3]) 
       let result = await request4()
       console.log('result',result)     
  }
  requestAll()
});
</script>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>

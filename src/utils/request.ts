import Axios, {
  Method,
  ResponseType,
  AxiosResponse,
  AxiosRequestConfig,
} from "axios";

/**
 * 定义axios 接口
 */

export interface IAxiosData {
  url: string;
  method: Method;
  headers?: any;
  json: boolean;
  contentType?: string;
  data?: any;
  params?: any;
  timeout?: number;
  responseType?: ResponseType;
}

const axios = Axios.create({
  timeout: 100,
});
// 允许携带cookie
axios.defaults.withCredentials = true;
// 请求头信息
axios.defaults.headers.post["Content-Type"] = "application/json";

// 请求拦截器
axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config;
  },
  (err) => Promise.reject(err)
);

// 响应拦截器
axios.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('response',response)
    return response;
  },
  (err) => {
    // 错误信息统一处理
    if (err.response && err.response.data) {
      const code = err.response.status
      const message = err.response.data.message
      alert(`Code：${code},Message：${message}`)
    }
    return Promise.reject(err);
  }
);

/** *
 * axios({url,method,content,params,datas})
 *
 * @param {string}  url，(必填)
 * @param {string}  method,默认post
 * @param {boolean} json, content-type类型，(必填)
 * @param {object}  params
 * @param {object}  datas  //token在datas中
 *
 */
export default function request(arr: IAxiosData) {
  return new Promise((resolve, reject) => {
    axios({
      url: arr.url,
      method: arr.method || "POST",
      headers: {
        "content-type": arr.contentType
          ? arr.contentType
          : arr.json
          ? "application/json; charset=UTF-8"
          : "application/x-www-form-urlencoded; charset=UTF-8",
      },
      params: arr.params || "", // get请求
      data: arr.data || "",
      responseType: arr.responseType || "json",
    })
      .then((response: AxiosResponse<any>) => {
        // 状态码
        const responseStatus = `${response.status}`;
        // 状态码2开头的处理逻辑
        if (responseStatus.charAt(0) === "2") {
          if (response.data.code === "1" || response.data.code === "err_9999") {
            // ElMessage({
            //   type: 'error',
            //   message: response.data.message
            // })
            reject(response.data.data);
            return;
          }
          // if (response.data.code === '401') {
          //   Message({
          //     type: 'error',
          //     message: response.data.message
          //   });
          //   reject(response.data);
          //   remove('token');
          //   router.push('/login');
          //   return;
          // }

          resolve(response.data.data);
        } else {
          // ElMessage({
          //   type: 'error',
          //   message: response.data.message
          // })
          reject(response.data.data);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

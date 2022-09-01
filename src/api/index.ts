import request, {IAxiosData} from "../utils/request";

export const getUserInfo = (data?: any) => {
  return request({
    url: "/api/user/getUserInfo",
    method: "get",
    json: true,
  })
}

export const login = (data: any) => {
  return request({
    url: "/api/user/login",
    method: "post",
    json: true,
    data
  })
}

export const getDetail = () => {
   return request({
    url: "/api/user/detail",
    method: "get",
    json: true
   })
}
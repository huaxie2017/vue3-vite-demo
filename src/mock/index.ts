import Mock from "mockjs";
Mock.setup({
  timeout: 100,
});

const getUserInfo = () => ({
  code: "200",
  data: { login: true },
});

const login = () => ({
  code: "200",
  data: { success: true, message: "登录成功" },
});

const getDetailInfo = () => ({
  code: "200",
  data: { success: true, info: { product: "电脑", price: 10000, num: 1 } },
});

Mock.mock("/api/user/getUserInfo", "get", getUserInfo);

Mock.mock("/api/user/login", "post", login);

Mock.mock("/api/user/detail", "get", getDetailInfo);

/*
 * @Author: ian-kevin126 kevinliao125@163.com
 * @Date: 2023-08-06 23:46:02
 * @LastEditors: ian-kevin126 kevinliao125@163.com
 * @LastEditTime: 2023-09-02 12:17:20
 * @FilePath: /nestjs-vue3-practice/nest_best_practice_fe_vue/src/utils/axios.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from "axios";
import { useUserStore } from "@/store/user";

const store = useUserStore();
// console.log('🚀 ~ file: axios.ts ~ line 4 ~ store', store.token);

const instance = axios.create({
  baseURL: "/api/v1",
  timeout: 60000,
});

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前带上token
    if (store.token) {
      config.headers!.Authorization = `Bearer ${store.token}`;
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if (response.status.toString().startsWith("2")) {
      return response.data;
    }
    return response;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default instance;

/*
 * @Author: ian-kevin126 kevinliao125@163.com
 * @Date: 2023-08-06 23:46:02
 * @LastEditors: ian-kevin126 kevinliao125@163.com
 * @LastEditTime: 2023-08-06 23:58:46
 * @FilePath: /nestjs-vue3-practice/nest_best_practice_fe_vue/src/api/user.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from "@/utils/axios";

export const getAllUsers = () => axios.get("/user");

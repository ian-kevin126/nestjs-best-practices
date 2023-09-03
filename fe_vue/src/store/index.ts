/*
 * @Author: ian-kevin126 kevinliao125@163.com
 * @Date: 2023-08-06 23:46:02
 * @LastEditors: ian-kevin126 kevinliao125@163.com
 * @LastEditTime: 2023-09-02 12:14:26
 * @FilePath: /nestjs-best-practices/fe_vue/src/store/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createPinia } from "pinia";
import { App } from "vue";

// 数据持久化
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const store = createPinia();
// 数据持久化
store.use(piniaPluginPersistedstate);

export function setupStore(app: App<Element>) {
  app.use(store);
}

export { store };

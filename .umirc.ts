import { defineConfig } from 'umi';
// 构建时配置
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
  ],
  fastRefresh: {}, // 刷新 保存组建状态
  devServer: {
    port: 8082, // .env中配置端口的优先级更高
    // 
  },
  title: '标题',
  // favicon: '/favicon.icon'  // icon图标 这里可以是本地 也可以是网上地址 本地需要建public文件夹 将icon放到该目录/favicon.icon
  // 启动按需加载 打包后页面分开 保证首屏加载压力小
  dynamicImport: {
    // loading: '@/components/loading' 页面资源加载动画 loading
  },
  mountElementId: 'root', // umi3根节点id 如果在document.ejs中修改根节点的id, 这里就需要修改会导致
  // theme: {
    
  // }
});


// 这里的配置文件可以直接新建一个config目录 config.js下复制这个文件里的， 
// 有些配置项内容多，如路由routes； 可以直接创建routes.js; 通过export default 导出引入到config,js中
// 同时.umirc,ts文件最好删除 因为他的权重比config高，避免覆盖
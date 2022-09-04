// 使用移动端库 andtm @umijs/preset-react
import { Button, Space } from 'antd-mobile';  // 默认antd-mobile是v2版本 
如果要使用v5版本 需要@umijs/preset-react升级最新版； 此时import { Button, Space } from 'antd-mobile'默认是v5版本，如果还需要v2则改为antd-mobile-v2

theme 主题修改 antd-mobile-v2和antd一样，在配置文件中通过theme配置项修改，antd-mobile-v5版本就需要在global.less文件中修改： 
:root:root {
  --adm-color-primary: #a062d4;
}


// less样式 默认值
.borderMy(@widT: 1px,@widL: 2px) {
    border-top: @widT solid black;
    border-bottom: @widL solid black;
}

.box{
  .borderMy();
}


// 权限路由
在配置路由时， 为该路由配置wrappers
routes: [
    { path: '/user', component: 'user',
      wrappers: [
        '@/wrappers/auth',
      ],
    },
    { path: '/login', component: 'login' },
  ]
在src/wrappers/auth中配置权限
import { Redirect } from 'umi'

export default (props) => {
  const { isLogin } = useAuth();
  if (isLogin) {
    return <div>{ props.children }</div>;
  } else {
    return <Redirect to="/login" />;
  }
}


// 路由传骖的接收
方式两种：
1. 通过组件（路由上下午）上下文：
   const Page = ({ loaction, match }) = > { }
   或者丢失可以用高阶组件
   const withRouter({ loaction, match }) => {}
2. hooks
   useLocation useRouterMatch useParams

// mock 在mock下随意创建js文件
export defalut {
  'GET /goods/list': 数据值 可以是对象或者数组 还可以是函数
  ‘POST /api/users/create': (req, res) => {
    res.end('返回数据')
    这里可以利用req和res做一些逻辑处理
  }
}
roadhog-api-doc 用于数据mock延迟返回
同时也可以用jsonserver代替mock,比mock更好的实现增删改查



// proxy反向代理
{
  '/api': {
    // 真实后端地址
    target: url,
    // 配置了这个可以从http代理到https
    https: true,
    // 依赖origin功能需要cookie
    changeOrigin: true,
    //路径替换 将api替换为‘’
    pathRewrite: { '^/api': '' }
  }
}
   
// umi useRequest 返回必须要有data字段



// dva model数据 可以使用connect在页面拿到数据 也可以用hooks
const dispatch = useDispatch();
const { dva } = useSelector((state) => ({ dva: state.dva }))


app.ts 运行时配置
1. 做权限验证 没登录 返回登录页面
app.ts
import { history } from 'umi';

export function render(oldRender) {
  // 是否登录 oldRende必须写
  fetch('/api/auth').then(auth => {
    // 已登陆
    if (auth.isLogin) { 
      request('/routes').then((res) => {
        extraRoutes = res; // 这里获取的权限路由
      })
     }
    else { 
      history.push('/login'); 
    }
    // 渲染的 
    oldRender()
  });
}

2. 动态路由 后端拿到的路由进行配置修改 拿到的数据为umi.ts里配置的路由类型
let extraRoutes;

export function patchRoutes({ routes }) {
  // routes 旧的路由 原本存在的路由
  // extraRoutes需要处理 需要通过require引入 例如component: require('@/page/user/index.tsx')
  // 路由组件拼接require必须到index.jsx层目录
  // 必须要对组件的路由配置添加exact属性为true，layout组件除外，不加exact否则会导致子路由不跳转， 同时如果路由仍然不跳转，则需要关闭mfsu: { }


  // 获取的后端路由 根据以上要求修改
  filterRoute(extraRoutes);
  extraRoutes.foreach(item => {
    // 原路由上添加登录后可看路由
    routes.push(item)
  })
}
3. 运行时配置请求
import { RequestConfig } from 'umi';

export const request: RequestConfig = {
  timeout: 1000,
  errorConfig: {},
  middlewares: [],
  requestInterceptors: [
    (url, option) => {
       //做请求拦截器
       return { url, option }
    }
  ], //   请求拦截器 多个函数 必须返回
  responseInterceptors: [
    (response, option) => {
      // 响应拦截 请求参数
      return { response, option }
    }
  ], // 响应拦截器 多个函数 必须返回


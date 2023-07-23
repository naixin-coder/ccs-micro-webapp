import { NOT_ACCESS, ACCESS_NAME } from '../src/constants';
import routerSys from './routes/router-sys';

const routes = [
  {
    path: '/login',
    layout: false,
    routes: [
      {
        name: '登录',
        path: '/login',
        component: './login',
      },
      {
        path: '*',
        component: './404',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/BaseLayout',
    routes: [
      {
        path: '/',
        redirect: '/dashboard',
      },
      {
        name: '首页',
        icon: 'SmileOutlined',
        path: '/dashboard',
        component: './dashboard',
      },
      /** 系统管理 */
      ...routerSys,
      {
        path: '*',
        component: './404',
      },
    ],
  },
];

const onDealRoutes = (routes: any[]) => {
  routes.forEach((item) => {
    if (item.path && !NOT_ACCESS.includes(item.path)) item.access = ACCESS_NAME;
    if (item.routes && item.routes.length > 0) onDealRoutes(item.routes);
  });
  return routes;
};

export default onDealRoutes(routes);

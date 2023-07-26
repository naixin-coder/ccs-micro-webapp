import React from 'react';
import { HOME_PATH, LOGIN_PATH, NOT_ACCESS, USER_TOKEN } from '@/constants';
import { MenuDataItem, ProLayout, ProLayoutProps, SettingDrawer } from '@ant-design/pro-components';
import { history, Outlet, useAppData, useLocation, useModel, useNavigate } from '@umijs/max';
import { ConfigProvider } from 'antd';
import HeaderContent from '../HeaderContent';
import NProgress from '../../common/NProgress';

export const isDev = process.env.NODE_ENV === 'development';

export const MicroLayout: React.FC<ProLayoutProps> = (props) => {
  const { initialState } = useModel('@@initialState');
  const location = useLocation();
  const navigate = useNavigate();
  const route = useAppData().clientRoutes[useAppData().clientRoutes.length - 1].routes;

  const loopMenuItem = (menus: MenuDataItem[] = []): MenuDataItem[] =>
    menus.map(({ icon, children, ...item }) => {
      if (children) loopMenuItem(children);
      if (
        !initialState?.currentUser?.authUrl.has(item.path || '') &&
        !NOT_ACCESS.includes(item.path || '')
      )
        return {};
      return {
        ...item,
        children: children && loopMenuItem(children),
      };
    });

  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#1890ff' } }}>
      <ProLayout
        style={{ height: '100%' }}
        route={{ routes: loopMenuItem(route as MenuDataItem[]) }}
        breadcrumbRender={false}
        menuItemRender={(item: any, defaultDom: React.ReactNode) => {
          return (
            <a
              onClick={() => {
                if (location.pathname === item.path) return;
                navigate(item.path || HOME_PATH);
              }}
            >
              {defaultDom}
            </a>
          );
        }}
        onPageChange={(locations) => {
          if (locations?.pathname !== LOGIN_PATH) {
            NProgress.start();
            if (location.pathname !== LOGIN_PATH && !sessionStorage.getItem(USER_TOKEN)) {
              history.replace(LOGIN_PATH); // 如果没有登录，重定向到 login
            }
            setTimeout(() => NProgress.done(), 300);
          }
        }}
        headerRender={() => {
          return (
            <>
              <HeaderContent />
            </>
          );
        }}
        {...initialState?.settings}
        {...props}
      >
        {<Outlet />}
      </ProLayout>
    </ConfigProvider>
  );
};

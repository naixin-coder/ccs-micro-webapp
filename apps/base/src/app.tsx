import '@/assets/css/font.less';
import { LoadingOutlined } from '@ant-design/icons';
import { Settings as LayoutSettings } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Spin } from 'antd';
import defaultSettings, { SettingsTypes } from '../config/defaultSettings';
import { LOGIN_PATH, USER_TOKEN } from './constants';
import { requestConfig } from './requestConfig';
import { refreshToken } from '@ccs/common';
import { onRoundRoutes, onTreeNodes } from '@ccs/common';

export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings & SettingsTypes>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const response = (await refreshToken()) as API.HttpResult;
      sessionStorage.setItem(USER_TOKEN, response.data.token);
      const { data } = response;
      const menus: any = [
        {
          nodeId: '9999',
          parentNodeId: null,
          rawId: null,
          groupId: null,
          nodeType: null,
          sortId: null,
          nodeName: '子应用',
          icon: null,
          leaf: false,
          nodeData: {
            menuCode: '9999',
            menuName: '子应用',
            menuDesc: null,
            menuUrl: '/slave',
            menuType: 0,
            buttonUrlId: 0,
            parentMenuCode: '1',
            createTime: '2023-01-03 09:52:27',
            updateTime: '2023-04-07 14:23:10',
            icon: null,
            sortId: 2,
            state: 1,
            urlPath: null,
            urlName: null,
            invokeMode: 0,
            methodType: null,
          },
          parents: null,
          children: [
            {
              nodeId: '9999001',
              parentNodeId: null,
              rawId: null,
              groupId: null,
              nodeType: null,
              sortId: null,
              nodeName: '用户管理',
              icon: null,
              leaf: false,
              nodeData: {
                menuCode: '9999001',
                menuName: '用户管理',
                menuDesc: '用户管理',
                menuUrl: '/slave/user',
                menuType: 1,
                buttonUrlId: 0,
                parentMenuCode: '9999',
                createTime: '2023-04-07 14:23:38',
                updateTime: '2023-04-07 14:26:10',
                icon: null,
                sortId: 1,
                state: 1,
                urlPath: null,
                urlName: null,
                invokeMode: 0,
                methodType: null,
              },
              parents: null,
              children: [],
              urlList: [],
            },
            {
              nodeId: '9999002',
              parentNodeId: null,
              rawId: null,
              groupId: null,
              nodeType: null,
              sortId: null,
              nodeName: '菜单管理',
              icon: null,
              leaf: false,
              nodeData: {
                menuCode: '9999002',
                menuName: '菜单管理',
                menuDesc: '菜单管理',
                menuUrl: '/slave/menu',
                menuType: 1,
                buttonUrlId: 0,
                parentMenuCode: '9999',
                createTime: '2023-04-07 14:24:13',
                updateTime: '2023-04-07 14:26:15',
                icon: null,
                sortId: 2,
                state: 1,
                urlPath: null,
                urlName: null,
                invokeMode: 0,
                methodType: null,
              },
              parents: null,
              children: [],
              urlList: [],
            },
          ],
          urlList: [],
        },
      ];
      return {
        ...data,
        authButton: onTreeNodes(data.treeNodes, 'Button'),
        // authUrl: onTreeNodes(data.treeNodes, 'Menu'),
        authUrl: onTreeNodes(menus, 'Menu'),
        routes: [...onRoundRoutes(menus)],
      };
    } catch (error) {
      history.push(LOGIN_PATH);
      return undefined;
    }
  };

  if (location.pathname !== LOGIN_PATH) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings as Partial<LayoutSettings>,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

Spin.setDefaultIndicator(<LoadingOutlined spin />); // 设置全局loading样式

export const request = {
  ...requestConfig,
};

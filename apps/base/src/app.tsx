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
      return {
        ...data,
        authButton: onTreeNodes(data.treeNodes, 'Button'),
        authUrl: onTreeNodes(data.treeNodes, 'Menu'),
        routes: [...onRoundRoutes(data.treeNodes)],
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

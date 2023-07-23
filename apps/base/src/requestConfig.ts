import type { RequestOptions } from '@@/plugin-request/request';
import { getDvaApp, RequestConfig } from '@umijs/max';
import { message } from 'antd';
import { throttle } from 'lodash-es';
import NProgress from './components/common/NProgress';
import { USER_TOKEN } from './constants';
import { CODE_MESSAGE } from './constants/enum';
import GlobalConfig from './global';
import { showNotification } from './utils';

const logout = throttle(
  () => {
    message.error('登录已失效、请重新登录。');
    getDvaApp()._store.dispatch({ type: 'authModel/logout' });
  },
  1000,
  { leading: true, trailing: false },
);

export const requestConfig: RequestConfig = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  },
  timeout: 12000,
  errorConfig: {
    //错误接收及处理
    errorHandler(error: any) {
      NProgress.done();
      const { response, code } = error;
      if (code === 'ECONNABORTED') {
        return showNotification('error', '提示', '请求超时，请检查网络稍后再试！');
      }
      if (response) {
        const { status } = response;
        if (status === 401) logout();
        if (status !== 200) {
          const errorText = CODE_MESSAGE[status] || response.statusText;
          showNotification('error', `请求错误 ${status}`, errorText);
        }
      }
    },
  },
  // 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      // 拦截请求配置，进行个性化处理。
      NProgress.start();
      const { headers, url } = config;
      config.headers = {
        ...headers,
        ticket: sessionStorage.getItem(USER_TOKEN) as string,
      };
      config.url = `${GlobalConfig.Api}${url}`;
      // config.url = url?.startsWith('/mock') || url?.startsWith('/api') ? url : `${GlobalConfig.Api}${url}`;
      return { ...config };
    },
  ],
  // 响应拦截器
  responseInterceptors: [
    (response) => {
      NProgress.done();
      const data: API.HttpResult = response.data as unknown as API.HttpResult;
      if (data && !data.success && data.msg) {
        showNotification('error', '提示', data.msg);
      }
      return response;
    },
  ],
};

import { RsaEncrypt, stringToHex } from '@/utils';
import type { FormDataType } from './index';
import { get, post } from '@/services/http';
import { request } from '@umijs/max';

// 登录
const doLogin = async (params: FormDataType) => {
  const password = RsaEncrypt(params.password);
  const param = { ...params, password: stringToHex(password as any), scope: 'WEB' };
  return post('/service-sysmgr/LoginController/login', {}, param);
};

// 刷新
const refreshToken = async () => get('/service-sysmgr/LoginController/auth/refreshToken');

// 退出登录
const logout = async () => get('/service-sysmgr/LoginController/logout');

// 获取验证码
const getCaptchaImg = async () => get(`/service-sysmgr/LoginController/getCaptchaImg`);

// 获取云认证地址
const apiGetAuthUrl = async () => get('/service-sysmgr/blocOAuth/getOAuthURL');

// 发送短信验证码
const apiSendSmsCode = async (params: { phone: string }) =>
  post('/service-sysmgr/LoginController/sendSmsCode', params);

// 短信验证码登录
const apiCodeLogin = async (params: { phone: string; code: string }) =>
  post('/service-sysmgr/LoginController/codeLogin', params);

export {
  doLogin,
  refreshToken,
  logout,
  getCaptchaImg,
  apiGetAuthUrl,
  apiSendSmsCode,
  apiCodeLogin,
};

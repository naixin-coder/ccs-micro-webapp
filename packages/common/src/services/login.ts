import { FormDataType } from '../components';
import { get, post } from '../services/http';
import { RsaEncrypt, stringToHex } from '../utils/utils';

// 登录
export const apiLogin = async (params: FormDataType) => {
  const password = RsaEncrypt(params.password);
  const param = { ...params, password: stringToHex(password as any), scope: 'WEB' };
  return post('/service-sysmgr/LoginController/login', {}, param);
};

// 刷新
export const refreshToken = async () => get('/service-sysmgr/LoginController/auth/refreshToken');

// 获取验证码
export const apiGetCaptchaImg = async () => get(`/service-sysmgr/LoginController/getCaptchaImg`);

import { get, post } from '../../../services';
import { RsaEncrypt, stringToHex } from '@/utils';

// 获取验证码
const getCaptchaImg = async () => get(`/service-sysmgr/LoginController/getCaptchaImg`);

// 发送短信验证码
const apiSendSmsCode = async (params: { phone: string }) =>
  post('/service-sysmgr/LoginController/sendSmsCode', params);

// 找回密码
const apiRetrievePwd = async (params: {
  captcha: string;
  captchaKey: string;
  phoneNum: string;
  shortMsgCode: string;
}) => get('/service-sysmgr/LoginController/retrievePwd', params);

// 修改密码
const apiModifyPwd = async (params: { newPwd: string; secretKey: string }) => {
  const { newPwd, secretKey } = params;
  const param = {
    newPwd: stringToHex(RsaEncrypt(newPwd)),
    secretKey,
  };
  return get('/service-sysmgr/LoginController/modifyPwd', param);
};

export { apiRetrievePwd, apiModifyPwd, getCaptchaImg, apiSendSmsCode };

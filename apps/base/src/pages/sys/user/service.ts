import { post } from '@/services/http';
import { RsaEncrypt, stringToHex } from '@/utils';
import { SysUserType } from './type';

// 用户分页
export const apiQueryWorker = (param: API.PageQuery) =>
  post('/service-sysmgr/auth/WorkerController/pageWorker', param);

// 免密修改
export const apiModifyPwd = (params: { newPwd: string; oldPwd: string }) => {
  const { newPwd, oldPwd } = params;
  const param = {
    newPwd: stringToHex(RsaEncrypt(newPwd)),
    oldPwd: stringToHex(RsaEncrypt(oldPwd)),
  };
  return post('/service-sysmgr/auth/WorkerController/modifyPwd', {}, param);
};

export const apiSaveUser = (param: SysUserType) => {
  if (param.loginId) {
    return post('/service-sysmgr/auth/WorkerController/updateWorker', param);
  }
  return post('/service-sysmgr/auth/WorkerController/createWorker', param);
};

import { get, post } from '@/services/http';
import { SysOrgType } from './type';

// 获取节点
export const apiQueryOrgs = (params: any) =>
  get('/service-sysmgr/auth/OrgController/getOrgChildren', params.query || params);

// 编码校验
export const apiValidateOrg = (params: { orgCode: string }) =>
  get('/service-sysmgr/auth/OrgController/checkOrgCode', params);

// 组织新增修改
export const apiSaveOrg = (param: SysOrgType) => {
  if (param.orgId) {
    return post('/service-sysmgr/auth/OrgController/updateOrg', param);
  }
  return post('/service-sysmgr/auth/OrgController/createOrg', param);
};

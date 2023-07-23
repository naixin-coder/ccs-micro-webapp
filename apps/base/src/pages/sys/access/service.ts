import { post, get } from '@/services/http';

// 接入管理-分页查询
export const apiPageSearch = (param: API.PageQuery) =>
  post('/service-sysmgr/auth/AccessController/pageSearch', param);

// 接入管理-变更状态
export const apiUpdateState = (param: { appId: string; state: number }) =>
  get('/service-sysmgr/auth/AccessController/updateState', param);

// 接入管理-新增配置
export const apiCreate = (param: any) =>
  post('/service-sysmgr/auth/AccessController/create', param);

// 接入管理-修改配置
export const apiUpdate = (param: any) =>
  post('/service-sysmgr/auth/AccessController/update', param);

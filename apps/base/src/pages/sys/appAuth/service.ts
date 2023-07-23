import { get, post } from '@/services/http';

// app获取按钮菜单
export const apicAppControllerQuery = (params: any) =>
  get('/service-sysmgr/auth/tsmAppController/query', params);

//app修改按钮菜单
export const apiSaveAppCreate = (param: any) => {
  if (param.btnId) {
    return post('/service-sysmgr/auth/tsmAppController/update', param);
  }
  return post('/service-sysmgr/auth/tsmAppController/create', param);
};

//app删除按钮菜单
export const apicAppControllerDel = (param: any) =>
  post('/service-sysmgr/auth/tsmAppController/del', param);

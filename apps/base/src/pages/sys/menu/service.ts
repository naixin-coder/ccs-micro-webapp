import { get, post } from '@/services/http';
import { SysMenuType } from './type';

// 菜单新增修改
export const apiSaveMenu = (param: SysMenuType) => {
  if (param.menuCode) {
    return post('/service-sysmgr/auth/MenuController/updateMenu', param);
  }
  return post('/service-sysmgr/auth/MenuController/createMenu', param);
};

// 获取节点
export const apiQueryMenu = (params: any) =>
  get('/service-sysmgr/auth/MenuController/getChildren', params.query || params);

export const apiQueryPageUrl = (param: API.PageQuery) =>
  post('/service-sysmgr/auth/UrlController/pageUrl', param);

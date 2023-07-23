import { get, post } from '@/services/http';
import type { SysUrlGroupType, SysUrlType } from './type';

export const apiQueryPageUrlGroup = (param: API.PageQuery) =>
  post('/service-sysmgr/auth/UrlController/pageUrlGroup', param);

export const apiQueryPageUrl = (param: API.PageQuery) =>
  post('/service-sysmgr/auth/UrlController/pageUrl', param);

export const apiQueryGroupUrl = (param: { groupId: number }) =>
  get('/service-sysmgr/auth/UrlController/getCheckedUrlGroupUrl', param);

export const apiCreateGroupUrl = (param: { groupId?: number; urlIds: string[] }) =>
  post('/service-sysmgr/auth/UrlController/doUrlGroupRelaUrl', param);

export const apiCreateGroup = (param: SysUrlGroupType) => {
  if (param.groupId) {
    return post('/service-sysmgr/auth/UrlController/updateUrlGroup', param);
  }
  return post('/service-sysmgr/auth/UrlController/createUrlGroup', param);
};

export const apiCreateUrl = (param: SysUrlType) => {
  if (param.urlId) {
    return post('/service-sysmgr/auth/UrlController/updateUrl', param);
  }
  return post('/service-sysmgr/auth/UrlController/createUrl', param);
};

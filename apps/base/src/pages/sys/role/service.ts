import { get, post } from '@/services/http';
import type { SysRoleType } from './type';

// 角色分页
export const apiQueryPageRole = (param: API.PageQuery) =>
  post('/service-sysmgr/auth/RoleController/pageRole', param);

// 角色创建 更新
export const apiSaveRole = (param: SysRoleType) => {
  if (param.roleId) {
    return post('/service-sysmgr/auth/RoleController/updateRole', param);
  }
  return post('/service-sysmgr/auth/RoleController/createRole', param);
};

// 角色关联菜单查询
export const apiQueryMenu = (param: { roleId: number }) =>
  get('/service-sysmgr/auth/AuthController/getCheckedRoleTreeNode', param);

// 角色关联菜单
export const apiSaveMenu = (param: {
  roleId: number;
  menuCodes: string[];
  halfMenuCodes: string[];
}) => post('/service-sysmgr/auth/AuthController/doRoleRelaMenu', param);

// 角色APP关联菜单
export const apiDoRoleRelaButton = (param: {
  roleId: number;
  btnIds: string[];
  halfMenuCodes: string[];
}) => post('/service-sysmgr/auth/AuthController/doRoleRelaButton', param);

// 角色关联url组
export const saveGroups = (param: { roleId: number; groupIds: number[] }) =>
  post('/service-sysmgr/auth/AuthController/doRoleRelaUrlGroup', param);

// 角色已关联URL
export const queryUrl = (param: { roleId: string }) =>
  get('/service-sysmgr/auth/AuthController/getCheckedRoleUrlGroup', param);
// 获取角色的按钮权限CheckBox树
export const apiGetRoleBtnTreeNode = (param: { roleId: number }) =>
  get('/service-sysmgr/auth/AuthController/getRoleBtnTreeNode', param);

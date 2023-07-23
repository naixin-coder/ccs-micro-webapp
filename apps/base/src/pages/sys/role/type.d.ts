export interface SysRoleMenuType {
  checkedIds: string[];
  halfCheckedIds: string[];
  nodes: API.MenuType[];
}

export interface SysRoleType {
  createTime: string;
  roleId: number;
  roleName: string;
  roleDesc: string;
  state: number;
}

export type SysRoleTypePartial = Partial<SysRoleType>;

export interface SysRoleUrlType {
  checked: boolean;
  createTime: Date;
  groupDesc: string;
  groupId: number;
  groupName: string;
  state: number;
}

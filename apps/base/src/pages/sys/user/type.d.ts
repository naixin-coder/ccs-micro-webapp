import { Moment } from 'moment';

export interface SysUserRole {
  checked: boolean;
  roleId: number;
  roleName: string;
}

interface SysUserRolesType {
  createTime: string;
  roleDesc: string;
  roleId: number;
  roleName: string;
  state: number;
}

export interface SysUserType {
  birthday: string;
  createTime: string;
  email: string;
  lastChgPwdTime: string;
  leagueName: string;
  loginCode: string;
  loginId: number;
  loginNum: number;
  mobile: string;
  orgCode: string;
  orgId: number;
  orgName: string;
  phone: string;
  roles: SysUserRolesType[];
  sex: number;
  source: '1' | '2';
  sourceTrans: string;
  state: number;
  stateName: string;
  workerName: string;
}

export type SysUserTypePartial = Partial<SysUserType>;

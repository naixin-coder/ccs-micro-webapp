export declare interface SysUrlType {
  urlId: number;
  urlName: string;
  urlPath: string;
  urlType: number;
  urlDesc: string;
  logFlag: number;
  state: number;
  createTime: Date;
}

export interface SysUrlGroupType {
  groupId: number;
  groupName: string;
  groupDesc: number;
  state: number;
  createTime: Date;
}

export type SysUrlTypePartial = Partial<SysUrlType>;

export type SysUrlGroupTypePartial = Partial<SysUrlGroupType>;

export interface SysUrlGroupCheckedType {
  checked: boolean;
  urlId: number;
  urlName: string;
  urlPath: string;
  key: string;
  disabled: boolean;
}

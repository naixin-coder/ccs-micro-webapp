export interface SysMenuType {
  menuCode: string;
  menuName: string;
  menuUrl: string;
  menuDesc: string;
  icon: string;
  sortId: number;
  state: number;
  menuType: 0 | 1 | 2;
  parentMenuCode: string;
  buttonUrlId: number | UrlAttrType;
  urlName: string;
  urlPath: string;
  children: SysMenuType[];
  key: string;
  title: string;
  leaf: boolean;
}

export type UrlAttrType = {
  urlId?: number;
  urlName?: string;
};

export type SysMenuTypePartial = Partial<SysMenuType>;

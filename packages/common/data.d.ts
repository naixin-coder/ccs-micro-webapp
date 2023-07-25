/**
 * 全局公共类型
 */
declare namespace API {
  /**
   * 当前用户数据类型
   */
  type CurrentUser = {
    orgName: string;
    email: string;
    treeNodes: MenuType[];
    userName: string;
    loginCode: string;
    urls?: string[];
    token: string;
    loginId: number;
    longinType: number;
    mobile: number;
    headImg: string;
    scope: string;
    workerName: string;
    orgs: any[];
    roles: any[];
    routes: MenuType[];
    authButton: Set<string>;
    authUrl: Set<string>;
  };

  type MenuParentType = {
    key: string;
    url: string;
    name: string;
  };

  type MenuType = {
    nodeId: string;
    nodeName: string;
    leaf: boolean;
    icon: string;
    nodeData: {
      menuCode: string;
      menuName: string;
      menuUrl: string;
      menuType: number;
      menuDesc: string;
      icon: string;
    };
    children?: MenuType[];
    topUrl?: string;
    parents?: MenuParentType[];
  };

  type PageQuery<T = Record<string, any>> = {
    pageNo?: number;
    pageSize?: number;
    query?: T;
  };

  /**
   * 接口数据类型
   */
  type HttpResult<T = any> = {
    code: number;
    success: boolean;
    data: T;
    msg: string;
  };

  /**
   * 分页数据类型
   */
  type HttpPageResult<T = any> = {
    code: number;
    success: boolean;
    data: {
      hasNext: boolean;
      pageNo: number;
      pageSize: number;
      result: T;
      totalNum: string;
    };
    msg: string;
  };

  /**
   * 静态值数据类型
   */
  type PageValue = {
    createTime: string;
    propCode: string;
    propId: number;
    sortId: number;
    state: number;
    valueCode: string;
    valueControl: string;
    valueDesc: string;
    valueId: number;
    valueName: string;
  };
}

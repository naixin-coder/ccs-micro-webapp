export type DeviceListProps = {
  label: string;
  value: string;
  num: number;
};

export type DeviceAbilityListProps = {
  label: string;
  value: string;
  num?: number;
  /**当前点击的一级菜单Id*/
  tapSuperiorsId: string;
  /**默认展开的二级菜单*/
  defalutJuniorList?: any;
  /**当前选中的一级菜单Id*/
  superiorsId: string;
  /**当前选中的二级菜单Id*/
  activeId: string;
  /**当前选中的二级菜单事件*/
  handleSelectDeviceEvent: (val: any, superiorsId: string) => void;
};

export type DeviceAbilityProps = {
  label: string;
  value: string;
};

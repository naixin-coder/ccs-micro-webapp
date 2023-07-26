import type React from 'react';

export type AMapContextProps = {
  /**首页设备列表--选择设备-下级-事件通知*/
  $selectDeviceEvent?: any;
  /**首页视频播放事件通知*/
  $videoPlayEvent?: any;
};

export type AmapChildrenProps = {
  children: ReactNode;
};

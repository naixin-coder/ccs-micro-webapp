import { FC, ReactNode } from 'react';
import React, { useState, useRef, createContext } from 'react';
import { useEventEmitter } from 'ahooks';
import { AMapContextProps, AmapChildrenProps } from './types';
import styles from '../../style.less';

// 定义一个 Provider 组件，用于将上下文对象传递给所有需要访问事件通知的组件
export const AMapContext = createContext<AMapContextProps>({});
const Provider: FC<AmapChildrenProps> = ({ children }) => {
  const $selectDeviceEvent = useEventEmitter();
  const $videoPlayEvent = useEventEmitter();

  return (
    <AMapContext.Provider
      value={{
        $selectDeviceEvent,
        $videoPlayEvent,
      }}
    >
      {children}
    </AMapContext.Provider>
  );
};

/**
 * 组件
 */

const AmapContent: FC<AmapChildrenProps> = ({ children }) => {
  return <div className={styles.main_container}>{children}</div>;
};

export default ({ children }: { children: ReactNode }) => {
  return (
    <Provider>
      <AmapContent>{children}</AmapContent>
    </Provider>
  );
};

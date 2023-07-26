import type { FC } from 'react';
import React from 'react';
import styles from './style.less';
import { Spin } from 'antd';

interface PropsType {
  tip?: string;
}
const Index: FC<PropsType> = ({ tip = '加载中' }) => {
  return (
    <div className={styles.spin}>
      <Spin tip={tip} />
    </div>
  );
};
export default Index;

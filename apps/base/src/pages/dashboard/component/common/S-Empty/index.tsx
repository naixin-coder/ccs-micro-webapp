import type { FC } from 'react';
import React from 'react';
import styles from './style.less';
import { Empty } from 'antd';

interface PropsType {
  description?: string;
  image?: any;
}
const Index: FC<PropsType> = ({
  image = Empty.PRESENTED_IMAGE_SIMPLE,
  description = '暂无数据',
}) => {
  return (
    <div className={styles.empty}>
      <Empty image={image} description={description} />
    </div>
  );
};
export default Index;

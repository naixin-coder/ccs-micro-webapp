import type { FC, ReactNode } from 'react';
import React from 'react';
import title_img from '@/assets/imgs/dashboard/base_card_img.svg';
import header_bottom from '@/assets/imgs/dashboard/base_card_title_bottom.svg';

import styles from './styles.less';

interface PropsType {
  children?: ReactNode;
  title?: string;
  isHaveline?: boolean;
}
const Index: FC<PropsType> = ({ title, children, isHaveline = true }) => {
  return (
    <div className={styles.base_card}>
      <div className={styles.header_content}>
        <div className={styles.title_img}>
          <img src={title_img} alt="" />
        </div>
        <div className={styles.title_text}>{title}</div>
      </div>
      {isHaveline && (
        <div className={styles.header_bottom}>
          <img src={header_bottom} alt="" />
        </div>
      )}
      <div className={styles.main_content}>{children}</div>
    </div>
  );
};
export default Index;

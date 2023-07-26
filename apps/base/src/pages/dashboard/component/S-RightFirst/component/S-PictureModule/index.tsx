import React, { FC } from 'react';
import { Image } from 'antd';
import styles from './style.less';
import { PictureModuleProps } from '../../types';

const Index: FC<PictureModuleProps> = ({ name, url, alarmInfo, time }) => {
  return (
    <div className={`${styles.picture_module}`}>
      <div className={styles.picture_module_img}>
        <Image
          onClick={(e) => {
            e.stopPropagation();
          }}
          width="100%"
          height="100%"
          src={url}
        />

        <div className={styles.tips}>
          <div className={styles.tips_dot} />
          <div>{alarmInfo}</div>
        </div>
      </div>
      <div className={styles.picture_text}>
        <div className={styles.picture_module_title}>{name ?? ''}</div>
        <div className={styles.picture_module_time}>{time ?? ''}</div>
      </div>
    </div>
  );
};

export default Index;

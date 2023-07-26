import React, { FC } from 'react';
import VideoPlay from '@/pages/dashboard/component/S-Center/component/S-VideoPlay';
import Algorithm from '@/pages/dashboard/component/S-Center/component/S-Algorithm';
import styles from '../../style.less';

const CenterContent: FC = () => {
  return (
    <div className={`${styles.center_container}`}>
      <div
        className="animate__animated animate__fadeInDown"
        style={{ height: '68%', transition: 'all 0.3' }}
      >
        <VideoPlay />
      </div>
      <div
        className="animate__animated animate__fadeInUp"
        style={{ height: '31.5%', transition: 'all 0.3' }}
      >
        <Algorithm />
      </div>
    </div>
  );
};

export default CenterContent;

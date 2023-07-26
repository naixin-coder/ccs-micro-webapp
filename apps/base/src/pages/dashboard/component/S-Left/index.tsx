import React, { FC } from 'react';
import DeviceList from '@/pages/dashboard/component/S-Left/component/S-DeviceList';
import AbilityIntroduction from '@/pages/dashboard/component/S-Left/component/S-AbilityIntroduction';
import styles from '../../style.less';

const LeftContent: FC = () => {
  return (
    <div className={`${styles.left_container} animate__animated animate__fadeInLeft `}>
      <div style={{ height: '68%', transition: 'all 0.3' }}>
        <DeviceList />
      </div>
      <div style={{ height: '31.5%', transition: 'all 0.3' }}>
        <AbilityIntroduction />
      </div>
    </div>
  );
};
export default LeftContent;

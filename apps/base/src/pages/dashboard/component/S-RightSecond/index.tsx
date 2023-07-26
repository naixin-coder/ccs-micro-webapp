import React, { FC } from 'react';
import EventStatistics from '@/pages/dashboard/component/S-RightSecond/component/S-EventStatistics';
import PeopleStatistics from '@/pages/dashboard/component/S-RightSecond/component/S-PeopleStatistics';
import styles from '../../style.less';

const Index: FC = () => {
  return (
    <>
      <div className={`${styles.right_second_container}  animate__animated animate__fadeInRight`}>
        <div style={{ height: '41%', transition: 'all 0.3' }}>
          <PeopleStatistics />
        </div>
        <div
          className={styles.right_second_container_event}
          style={{ height: '59%', transition: 'all 0.3' }}
        >
          <EventStatistics />
        </div>
      </div>
    </>
  );
};
export default Index;

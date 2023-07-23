import React, { FC } from 'react';
import VideoList from './component/S-PictureList';
import styles from '../../style.less';

const Index: FC = () => {
  return (
    <div className={`${styles.right_first_container}  animate__animated animate__fadeInDown`}>
      <VideoList />
    </div>
  );
};

export default Index;

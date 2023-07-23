import React, { FC, useContext, useState } from 'react';
import { AMapContext } from '@/pages/dashboard/component/S-AmapContent';
import title_bg_right from '@/assets/imgs/dashboard/video_play_title_bg_right.svg';
import title_bg_left from '@/assets/imgs/dashboard/video_play_title_bg_left.svg';
import SSpin from '@/pages/dashboard/component/common/S-Spin';
import SEmpty from '@/pages/dashboard/component/common/S-Empty';
import styles from './style.less';

const Index: FC = () => {
  const loading = false;
  const [playTitle, setPlayTitle] = useState<string>('');
  const { $selectDeviceEvent, $videoPlayEvent } = useContext(AMapContext);
  /** 监听设备-下级-选择事件 */
  $selectDeviceEvent.useSubscription((item: any) => {
    setPlayTitle(item.label ?? '');
  });
  /** 监听视频播放事件 */
  $videoPlayEvent.useSubscription((val: any) => {
    console.log(val, 'videoPlayEvent');
  });
  return (
    <div className={styles.video_play}>
      <div className={styles.video_play_title}>
        <div className={styles.title_bg}>
          <img src={title_bg_left} alt="" />
        </div>
        <div className={styles.title_text}>{playTitle}</div>
        <div className={styles.title_bg}>
          <img src={title_bg_right} alt="" />
        </div>
      </div>
      <div className={styles.video_play_content}>
        {loading && <SSpin />}
        {loading && <SEmpty />}
      </div>
    </div>
  );
};
export default Index;

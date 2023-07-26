import React, { FC, useContext, useEffect, useState } from 'react';
import { Tooltip } from 'antd';
import { LScrollBar } from 'lighting-design';
import { AMapContext } from '@/pages/dashboard/component/S-AmapContent';
import instructions_left_bg from '@/assets/imgs/dashboard/ability_introduction_left.svg';
import instructions_right_bg from '@/assets/imgs/dashboard/ability_introduction_right.svg';
import introduction_play from '@/assets/imgs/dashboard/ability_introduction_play.svg';
import { DeviceAbilityProps } from '../../types';
import styles from './style.less';

const scrollStyle: any = {
  '--lightd-scrollbar-bg-color': '#283b68',
  '--lightd-scrollbar-width': '0.12rem',
  '--lightd-scrollbar-border-radius': '0.06rem',
};
const Index: FC = () => {
  const { $selectDeviceEvent, $videoPlayEvent } = useContext(AMapContext);
  const [selectDevice, setSelectDevice] = useState<DeviceAbilityProps>();
  const [info, setInfo] = useState<Record<string, any>>({});

  /** 监听设备列表-下级-选择事件 */
  $selectDeviceEvent.useSubscription((val: DeviceAbilityProps) => {
    setSelectDevice(val);
    setInfo({
      title: '通信行业客服文本相似度计算',
      content: '通信行业客服文本计算的原子能力，可用于基于语义的文本相似度分析',
    });
  });

  /** 点击选择触发视频播放事件 */
  const handleClick = () => {
    $videoPlayEvent.emit({ ...selectDevice });
  };
  return (
    <div className={styles.ability_introduction}>
      {/* 第一行 */}
      <div className={styles.instructions}>
        <div className={styles.instructions_bg}>
          <img src={instructions_left_bg} alt="" />
        </div>
        <div className={styles.instructions_text}>能力介绍</div>
        <div className={styles.instructions_bg}>
          <img src={instructions_right_bg} alt="" />
        </div>
      </div>
      {/*第二行  */}
      <div className={styles.module_content}>
        <Tooltip overlayClassName="dashboard_tooltip" placement="top" title={info?.title ?? ''}>
          <div className={styles.module_content_title}>
            <span className={`${styles.content_title_pattern}`}>{info?.title ? '「' : ''} </span>
            <div className={styles.content_title_text}>{info?.title ?? ''}</div>
            <span className={styles.content_title_pattern}> {info?.title ? '」' : ''}</span>
          </div>
        </Tooltip>

        <div className={styles.module_content_text}>
          <LScrollBar style={scrollStyle} mode="hover" maxHeight="100%">
            {info?.content ?? ''}
          </LScrollBar>
        </div>
      </div>
      {/* 第三行 */}
      <div className={styles.play_button} onClick={handleClick}>
        <img src={introduction_play} alt="" />
      </div>
    </div>
  );
};
export default Index;

import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import { AMapContext } from '@/pages/dashboard/component/S-AmapContent';
import SSpin from '@/pages/dashboard/component/common/S-Spin';
import SEmpty from '@/pages/dashboard/component/common/S-Empty';
import BaseCard from '@/pages/dashboard/component/common/S-BaseCard';
import PictureModule from '../S-PictureModule';
import styles from './style.less';
import { PictureModuleProps } from '../../types';
import { Carousel, Empty, Spin } from 'antd';

const Index: FC = () => {
  const loading = false;
  const { $selectDeviceEvent, $videoPlayEvent } = useContext(AMapContext);
  const [carouselData, setCarouselData] = useState<Record<string, any>>([]);
  useEffect(() => {
    setCarouselData([
      [
        {
          name: '智慧厨房-口罩',
          url: 'https://img0.baidu.com/it/u=110134828,1455588995&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',
          alarmInfo: '未戴口罩',
          time: moment().format('YYYY/MM/DD HH:mm:ss'),
        },
        {
          name: '智慧厨房-口罩',
          url: 'https://img0.baidu.com/it/u=110134828,1455588995&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',
          alarmInfo: '未戴口罩',
          time: moment().format('YYYY/MM/DD HH:mm:ss'),
        },
        {
          name: '智慧厨房-口罩',
          url: 'https://img0.baidu.com/it/u=110134828,1455588995&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',
          alarmInfo: '未戴口罩',
          time: moment().format('YYYY/MM/DD HH:mm:ss'),
        },
        {
          name: '智慧厨房-口罩',
          url: 'https://img0.baidu.com/it/u=110134828,1455588995&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',
          alarmInfo: '未戴口罩',
          time: moment().format('YYYY/MM/DD HH:mm:ss'),
        },
      ],
      [
        {
          name: '智慧厨房-口罩',
          url: 'https://img0.baidu.com/it/u=110134828,1455588995&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',
          alarmInfo: '未戴口罩',
          time: moment().format('YYYY/MM/DD HH:mm:ss'),
        },
        {
          name: '智慧厨房-口罩',
          url: 'https://img0.baidu.com/it/u=110134828,1455588995&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',
          alarmInfo: '未戴口罩',
          time: moment().format('YYYY/MM/DD HH:mm:ss'),
        },
        {
          name: '智慧厨房-口罩',
          url: 'https://img0.baidu.com/it/u=110134828,1455588995&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',
          alarmInfo: '未戴口罩',
          time: moment().format('YYYY/MM/DD HH:mm:ss'),
        },
      ],
    ]);
  }, []);
  /** 监听设备列表-下级-选择事件 */
  $selectDeviceEvent.useSubscription((val: any) => {
    console.log(val);
  });
  /** 点击选择触发视频播放事件 */
  const handleClick = (item: any) => {
    $videoPlayEvent.emit({ ...item });
  };
  const listDom = useMemo(() => {
    return carouselData?.map((item: PictureModuleProps[], index: number) => {
      return (
        <div key={index} className={styles.video_list_content}>
          {item?.map((it: PictureModuleProps, i: number) => {
            return (
              <div
                key={i}
                className={`${styles.video_list_item}`}
                onClick={() => {
                  handleClick(it);
                }}
              >
                <PictureModule {...it} />
              </div>
            );
          })}
        </div>
      );
    });
  }, [carouselData]);
  return (
    <BaseCard title="视频统计">
      <div className={`${styles.video_list}`}>
        {loading && <SSpin />}
        {!loading && (
          <>
            {carouselData?.length ? (
              <Carousel dotPosition="bottom" className="animate__animated animate__fadeInDown">
                {listDom}
              </Carousel>
            ) : (
              <SEmpty />
            )}
          </>
        )}
      </div>
    </BaseCard>
  );
};

export default Index;

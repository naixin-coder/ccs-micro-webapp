import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
import BaseCard from '@/pages/dashboard/component/common/S-BaseCard';
import { AMapContext } from '@/pages/dashboard/component/S-AmapContent';
import SSpin from '@/pages/dashboard/component/common/S-Spin';
import SEmpty from '@/pages/dashboard/component/common/S-Empty';
import event_tatistics_img from '@/assets/imgs/dashboard/event_tatistics.svg';
import styles from './style.less';
import { Carousel } from 'antd';

const Index: FC = () => {
  const loading = false;
  const { $selectDeviceEvent } = useContext(AMapContext);
  const [carouselData, setCarouselData] = useState<Record<string, any>>([]);
  const transformNum = (val: number | string) => {
    return val === void 0 ? '0' : (+val).toLocaleString() ?? '0';
  };
  useEffect(() => {
    setCarouselData([
      [
        {
          name: '未戴口罩',
          number: '5',
        },
        {
          name: '抽烟检测',
          number: '34040012',
        },
        {
          name: '安全帽检测',
          number: '30',
        },
        {
          name: '垃圾检测',
          number: '32',
        },
        {
          name: '安全帽检测',
          number: '23',
        },
        {
          name: '安全帽检测',
          number: '23',
        },
      ],
      [
        {
          name: '未戴口罩',
          number: '5',
        },
        {
          name: '抽烟检测',
          number: '98780000',
        },
        {
          name: '安全帽检测',
          number: '30',
        },
        {
          name: '垃圾检测',
          number: '32',
        },
      ],
    ]);
  }, []);
  const listDom = useMemo(() => {
    return carouselData.map((items: { number: any; name: any }[], index: number) => {
      return (
        <div key={index} className={styles.event_statistics_content}>
          {items.map((item: { number: any; name: any }, itIndex: React.Key | null | undefined) => {
            return (
              <div key={itIndex} className={styles.event_statistics_item}>
                <div className={styles.item_img}>
                  <img src={event_tatistics_img} alt="" />
                </div>
                <div className={styles.item_number}>{transformNum(item?.number)}</div>
                <div className={styles.item_name}>{item?.name ?? ''}</div>
              </div>
            );
          })}
        </div>
      );
    });
  }, [loading, carouselData]);
  /** 监听设备列表-下级-选择事件 */
  $selectDeviceEvent.useSubscription((val: any) => {
    console.log(val);
  });
  return (
    <BaseCard title="事件统计">
      <div className={styles.event_statistics}>
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

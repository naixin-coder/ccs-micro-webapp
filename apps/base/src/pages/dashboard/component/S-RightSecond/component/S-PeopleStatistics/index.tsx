import React, { FC, useContext, useState } from 'react';
import { AMapContext } from '@/pages/dashboard/component/S-AmapContent';
import BaseCard from '@/pages/dashboard/component/common/S-BaseCard';
import SSpin from '@/pages/dashboard/component/common/S-Spin';
import SEmpty from '@/pages/dashboard/component/common/S-Empty';
import BarEcharts from './S-BarEcharts';
import styles from './style.less';

const Index: FC = () => {
  const loading = false;
  const { $selectDeviceEvent } = useContext(AMapContext);
  const [echartsData, setEchartsData] = useState<Record<string, any>>([]);
  /** 监听设备列表-下级-选择事件 */
  $selectDeviceEvent.useSubscription((val: any) => {
    console.log(val);
    setEchartsData([]);
  });
  return (
    <BaseCard title="人流统计">
      <div className={styles.people_statistics}>
        {loading && <SSpin />}
        {!loading && (!echartsData?.length ? <BarEcharts echartsData={echartsData} /> : <SEmpty />)}
      </div>
    </BaseCard>
  );
};
export default Index;

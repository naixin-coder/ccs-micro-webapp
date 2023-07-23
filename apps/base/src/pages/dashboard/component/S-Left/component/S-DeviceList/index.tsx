import React, { FC, useContext, useEffect, useState } from 'react';
import { AMapContext } from '@/pages/dashboard/component/S-AmapContent';
import SSpin from '@/pages/dashboard/component/common/S-Spin';
import SEmpty from '@/pages/dashboard/component/common/S-Empty';
import BaseCard from '@/pages/dashboard/component/common/S-BaseCard';
import DeviceAbility from '../S-DeviceAbility';
import { DeviceAbilityProps, DeviceListProps } from '../../types';
import styles from './styles.less';

const Index: FC = () => {
  const loading = false;
  const { $selectDeviceEvent } = useContext(AMapContext);
  const [listData, setListData] = useState<Record<string, any>>([]); /**一级菜单列表*/
  /**默认展开的二级菜单*/
  const [defalutJuniorList, setDefalutJuniorList] = useState<DeviceAbilityProps[]>([]);
  const [superiorsId, setSuperiorsId] = useState<string>(''); /**当前选中的一级菜单Id*/
  const [activeId, setActiveId] = useState<string>(''); /**当前选中的二级菜单Id*/
  const [tapSuperiorsId, setTapSuperiorsId] = useState<string>(''); /**当前点击的一级菜单Id*/

  /** 菜单选项失焦事件 */
  const handleBlur = () => {
    setTapSuperiorsId('');
  };

  /** 点击是否展开二级 */
  const handleUnfold = (item: DeviceListProps) => {
    setTapSuperiorsId(tapSuperiorsId === item?.value ? '' : item?.value);
  };

  /**发起当前选中的二级菜单事件通知*/
  const handleSelectDeviceEvent = (item: DeviceAbilityProps, superiorsId: string) => {
    setSuperiorsId(superiorsId);
    setActiveId(item.value);
    $selectDeviceEvent.emit({ ...item });
    handleBlur();
  };

  useEffect(() => {
    setListData([
      { label: '城市治理', value: '1' },
      { label: '明厨亮灶', value: '2' },
      { label: '智慧工地', value: '3' },
      { label: '智慧水库', value: '4' },
      { label: '智慧畜牧', value: '5' },
      { label: '智慧盐厂', value: '6' },
      { label: '智慧机房', value: '7' },
      { label: '智慧楼宇', value: '8' },
    ]);
    setSuperiorsId('1'); // 一级菜单Id的值:默认为第一个
    setActiveId('1-1');
    setDefalutJuniorList([
      { label: `口罩1`, value: '1-1' },
      { label: `-工作服`, value: '2-1' },
    ]);
    setTimeout(() => {
      $selectDeviceEvent.emit({ label: `口罩1`, value: '1-1' });
    }, 0);
  }, []);

  return (
    <BaseCard title="设备列表">
      <div className={styles.device_list}>
        {loading && <SSpin />}
        {!loading && (
          <>
            {listData.length ? (
              listData.map((item: any, index: number) => (
                <div
                  tabIndex={index}
                  onBlur={handleBlur}
                  key={item.value}
                  className={styles.device_list_item}
                  onClick={() => {
                    handleUnfold(item);
                  }}
                >
                  <DeviceAbility
                    num={index}
                    {...item}
                    defalutJuniorList={defalutJuniorList}
                    tapSuperiorsId={tapSuperiorsId}
                    superiorsId={superiorsId}
                    activeId={activeId}
                    handleSelectDeviceEvent={handleSelectDeviceEvent}
                  />
                </div>
              ))
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

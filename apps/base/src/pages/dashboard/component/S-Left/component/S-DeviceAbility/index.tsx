import React, { FC, useEffect, useMemo, useState } from 'react';
import { LScrollBar } from 'lighting-design';
import SSpin from '@/pages/dashboard/component/common/S-Spin';
import SEmpty from '@/pages/dashboard/component/common/S-Empty';
import device_ability_0 from '@/assets/imgs/dashboard/device_ability_1.svg';
import device_ability_1 from '@/assets/imgs/dashboard/device_ability_2.svg';
import device_ability_2 from '@/assets/imgs/dashboard/device_ability_3.svg';
import arrow_down from '@/assets/imgs/dashboard//arrow_down.svg';
import arrow_left from '@/assets/imgs/dashboard//arrow_left.svg';
import { DeviceAbilityListProps, DeviceAbilityProps } from '../../types';
import styles from './styles.less';

const scrollStyle: any = {
  '--lightd-scrollbar-bg-color': '#283b68',
  '--lightd-scrollbar-width': '0.12rem',
  '--lightd-scrollbar-border-radius': '0.06rem',
};
const Index: FC<DeviceAbilityListProps> = ({
  label,
  value,
  num = 0,
  handleSelectDeviceEvent,
  superiorsId,
  activeId,
  defalutJuniorList,
  tapSuperiorsId,
}) => {
  const loading = false;
  const [juniorList, setJuniorList] = useState<DeviceAbilityProps[]>([]);
  useMemo(() => {
    if (!tapSuperiorsId || tapSuperiorsId !== value) return;
    if (num > 0) {
      setJuniorList([
        { label: `${label}-口罩1`, value: `${value}1-1` },
        { label: `${label}-工作服`, value: `${value}2-1` },
        { label: `${label}-工作服`, value: `${value}3-1` },
        { label: `${label}-工作服`, value: `${value}4-1` },
        { label: `${label}-工作服`, value: `${value}5-1` },
        { label: `${label}-工作服`, value: `${value}6-1` },
        { label: `${label}-工作服工作服`, value: `${value}7-1` },
      ]);
    } else {
      setJuniorList([...defalutJuniorList]);
    }
  }, [tapSuperiorsId]);

  useEffect(() => {}, []);
  return (
    <div className={styles.device_ability}>
      <div
        className={`${styles.device_ability_superiors} ${
          tapSuperiorsId === value || superiorsId === value ? styles.unfold : ''
        }`}
      >
        <div className={styles.device_ability_title_left}>
          {num === 0 && <img src={device_ability_0} alt="" />}
          {num === 1 && <img src={device_ability_1} alt="" />}
          {num >= 2 && <img src={device_ability_2} alt="" />}
        </div>
        <div className={styles.device_ability_title}> {label}</div>
        <div className={styles.device_ability_button}>
          <img src={tapSuperiorsId === value ? arrow_down : arrow_left} alt="" />
        </div>
      </div>
      <div
        style={{ display: tapSuperiorsId === value ? 'block' : 'none' }}
        className={styles.device_ability_junior}
      >
        {loading && <SSpin />}
        {!loading && (
          <>
            <LScrollBar style={scrollStyle} mode="hover">
              {juniorList?.length ? (
                juniorList.map((it: DeviceAbilityProps) => (
                  <div
                    key={it.value}
                    className={`${styles.junior_list_item} ${
                      activeId === it?.value ? styles.active : ''
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectDeviceEvent(it, value);
                    }}
                  >
                    {it?.label ?? ''}
                  </div>
                ))
              ) : (
                <SEmpty />
              )}
            </LScrollBar>
          </>
        )}
      </div>
    </div>
  );
};
export default Index;

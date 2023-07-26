import React, { CSSProperties, FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import BaseCard from '@/pages/dashboard/component/common/S-BaseCard';
import SSpin from '@/pages/dashboard/component/common/S-Spin';
import SEmpty from '@/pages/dashboard/component/common/S-Empty';
import line_img from '@/assets/imgs/dashboard/base_card_title_bottom.svg';
import styles from './style.less';
import { Carousel } from 'antd';
import { AlgorithmProps, ArrowProps } from '../../types';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { CcsNumberRoll } from '@ccs/common';
import { throttle } from 'lodash-es';

const arrowSize = '0.3rem';
const arrow: CSSProperties = {
  color: '#199af5',
  fontSize: arrowSize,
  height: arrowSize,
  width: arrowSize,
  zIndex: 1,
  pointerEvents: 'auto',
};
const customArrowStyle = {
  leftArrow: { ...arrow, left: '-0.14rem' },
  rightArrow: { ...arrow, right: '-0.08rem' },
};

const CustomArrow = ({
  direction,
  currentSlide,
  slideCount,
  children,
  ...carouselProps
}: ArrowProps) => {
  return direction === 'left' ? (
    <LeftOutlined {...carouselProps} style={customArrowStyle.leftArrow} />
  ) : (
    <RightOutlined {...carouselProps} style={customArrowStyle.rightArrow} />
  );
};

const Index: FC = () => {
  const loading = false;
  const algorithmRef = useRef<Record<string, any>>({ num: 50000000, type: [] });
  const [totalNumberRoll, setTotalNumberRoll] = useState<number>(50000000);
  const [carouselData, setCarouselData] = useState<Record<string, any>>([]);
  useEffect(() => {
    setCarouselData([
      [
        {
          name: '安全帽检测',
        },
        {
          name: '车牌识别',
        },
        {
          name: '人脸识别',
        },
        {
          name: '口罩识别',
        },
        {
          name: '安全帽防护罩检测',
        },
        {
          name: '垃圾检测',
        },
        {
          name: '抽烟检测',
        },
        {
          name: '车辆违停',
        },
        {
          name: '打电话检测',
        },
      ],
      [
        {
          name: '车牌识别',
        },
      ],
    ]);
  }, []);
  const listDom = useMemo(() => {
    return carouselData?.map((items: AlgorithmProps[], index: number) => {
      return (
        <div key={index} className={styles.type_content}>
          {items?.map((item: AlgorithmProps, i: number) => {
            return (
              <div className={styles.type_item} key={i}>
                <div className={styles.type_item_round} />
                <div>{item.name ?? ''}</div>
              </div>
            );
          })}
        </div>
      );
    });
  }, [loading, carouselData]);

  const onResize = useCallback(
    throttle(() => setTotalNumberRoll(Number(algorithmRef.current?.num || 0)), 500, {
      leading: false,
      trailing: true,
    }),
    [],
  );
  const numberRollChange = useCallback(() => {
    setTotalNumberRoll(0);
    onResize();
  }, []);
  useEffect(() => {
    window.addEventListener('resize', numberRollChange);
    return () => {
      window.removeEventListener('resize', numberRollChange);
    };
  }, []);
  return (
    <div className={`${styles.algorithm}`}>
      <BaseCard title="算法总表" isHaveline={false}>
        <div className={styles.algorithm_content}>
          {/* 算法总量值 */}
          <div className={styles.algorithm_content_total}>
            <img src={line_img} alt="" />
            <div className={styles.total_number_box}>
              <CcsNumberRoll
                className={styles.total_num}
                speed={1500}
                symbol=","
                value={totalNumberRoll} // 必须为整型
                style={{ userSelect: 'none' }}
              />
              <div className={styles.total_name}>算法总量</div>
            </div>
          </div>

          {/* 算法能力类型*/}
          <div className={styles.algorithm_content_type}>
            {loading && <SSpin />}
            {!loading && (
              <>
                {carouselData.length ? (
                  <Carousel
                    // autoplaySpeed={4000}
                    // autoplay
                    dots={false}
                    arrows
                    nextArrow={<CustomArrow direction="right" />}
                    prevArrow={<CustomArrow direction="left" />}
                  >
                    {listDom}
                  </Carousel>
                ) : (
                  <SEmpty />
                )}
              </>
            )}
          </div>
        </div>
      </BaseCard>
    </div>
  );
};

export default Index;

import EChartsReact from 'echarts-for-react';
import type { FC } from 'react';
import React, { useMemo, useEffect } from 'react';
import { unitNumFn } from '@/utils/public';

interface PropsType {
  echartsData: Record<string, any>;
}
const white = '#ecdcdc';
const colorStopsObj: any = {
  今日进入: [
    {
      offset: 0,
      color: '#0DFFFF',
    },
    {
      offset: 0.3,
      color: 'rgba(13, 255, 255, 0.3)',
    },
    {
      offset: 0.8,
      color: 'rgba(13, 255, 255, 0.2)',
    },
    {
      offset: 1,
      color: 'transparent',
    },
  ],
  昨日进入: [
    {
      offset: 0,
      color: 'rgba(22, 255, 171,  1)',
    },
    {
      offset: 0.3,
      color: 'rgba(22, 255, 171,  0.3)',
    },
    {
      offset: 0.8,
      color: 'rgba(22, 255, 171,  0.2)',
    },
    {
      offset: 1,
      color: 'transparent',
    },
  ],
};
let obj = { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [], global: false };
const Index: FC<PropsType> = ({ echartsData }) => {
  const XData = ['今日进入', '昨日进入'];
  const YData = [unitNumFn(9007896), unitNumFn(5007896)];
  // const YData = [unitNumFn(900), unitNumFn(500)];
  const option = {
    grid: {
      top: '17%',
      right: '15%',
      left: '20%',
      bottom: '10%',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
      },
      backgroundColor: 'rgba(3, 7, 51, 0.65)',
      borderColor: 'rgba(0, 163, 255,0.35)',
      textStyle: {
        color: '#fff',
        fontSize: 14,
      },
      formatter: (params: any[]) => {
        let result = params[0].name;
        params.forEach((item) => {
          result += `${
            '<br/>' +
            '<span  style="display:inline-block;margin-right:5px;margin-top:5px;border-radius:10px;width:9px;height:9px;background-color:'
          }${item.color.colorStops[0].color}"></span>${item.seriesName}： ${item.value || 0} 万`;
        });
        return result;
      },
    },
    xAxis: [
      {
        data: XData,
        axisLabel: {
          color: white,
          // textStyle: {
          //   fontSize: 12,
          // },
        },
        axisLine: {
          lineStyle: {
            color: white,
            width: 0.8, // 设置x坐标线条的粗细
          },
        },
        axisTick: {
          show: false,
        },
      },
    ],
    yAxis: [
      {
        name: '单位：万',
        type: 'value',
        axisLabel: {
          color: white,
          textStyle: {
            fontSize: 12,
          },
        },
        axisLine: {
          lineStyle: {
            color: white,
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          lineStyle: {
            color: white,
            type: 'dashed', // 设置为虚线
            opacity: 0.4,
          },
        },
      },
    ],

    series: [
      {
        name: '人流统计',
        type: 'bar',
        data: YData,
        barWidth: '25%',
        itemStyle: {
          normal: {
            color: (params: { name: string | number }) => {
              obj = { ...obj, colorStops: colorStopsObj[params.name] };
              return obj;
            },
            barBorderRadius: [2, 2, 0, 0],
          },
        },
      },
    ],
  };

  useEffect(() => {
    if (!echartsData.length) return;
  }, [echartsData]);

  const dom = useMemo(() => {
    return <EChartsReact style={{ width: '100%', height: '100%' }} option={option} />;
  }, [echartsData]);

  return <div style={{ width: '100%', height: '100%' }}>{dom}</div>;
};

export default Index;

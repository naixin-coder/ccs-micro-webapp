import type { FC } from 'react';
import React from 'react';
import { RadioChangeEvent, Spin } from 'antd';
import { apiQueryPageValue } from '../../../services';
import { LFormItemRadio, LFormItemRadioProps } from 'lighting-design';
import { useRequest } from 'ahooks';

interface StaticRadioProps extends LFormItemRadioProps {
  propCode: string;
  onChange?: (valueId: string) => void;
}

/**
 * 静态值选择组件，适用查询条件，表单中使用，可赋初始值。 传入propCode
 * 数据缓存：每个类型的值只请求一次
 * @param StaticRadioProps
 * @returns
 */

const LFormItemStaticRadio: FC<StaticRadioProps> = ({ propCode, onChange, ...restProps }) => {
  // 请求数据，并缓存静态值
  const { runAsync } = useRequest<
    API.HttpPageResult<API.PageValue[]>,
    API.PageQuery<{ propCode: string; state: number }>[]
  >(apiQueryPageValue, {
    manual: true,
    cacheKey: `STATIC_${propCode}`,
    staleTime: 300000,
  });

  const handleChange = (e: RadioChangeEvent) => {
    if (onChange) onChange(e.target.value as string);
  };

  return (
    <LFormItemRadio
      request={async () => {
        const res = await runAsync({ query: { propCode, state: 1 }, pageNo: 1, pageSize: 999 });
        return res.data.result.map((item) => {
          return {
            label: item.valueName,
            value: +item.valueCode,
          };
        });
      }}
      {...restProps}
      radioProps={{
        onChange: handleChange,
        ...restProps?.radioProps,
      }}
    />
  );
};

export default LFormItemStaticRadio;

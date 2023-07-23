import { apiQueryPageValue } from '@/services/public';
import { useRequest } from 'ahooks';
import { Spin } from 'antd';
import { LFormItemSelect, LFormItemSelectProps } from 'lighting-design';
import type { FC } from 'react';

interface StaticSelectProps extends LFormItemSelectProps {
  propCode: string;
  allowClear?: boolean;
  onChange?: (valueId: number) => void;
}

/**
 * 静态值选择组件，适用查询条件，表单中使用，可赋初始值。 传入propCode
 * 数据缓存：每个类型的值只请求一次
 * @param StaticSelectProps
 * @returns
 */

const LFormItemStaticSelect: FC<StaticSelectProps> = ({
  propCode,
  onChange,
  allowClear = true,
  ...restProps
}) => {
  // 请求数据，并缓存静态值
  const { runAsync } = useRequest<
    API.HttpPageResult<API.PageValue[]>,
    API.PageQuery<{ propCode: string; state: number }>[]
  >(apiQueryPageValue, {
    manual: true,
    cacheKey: `STATIC_${propCode}`,
    staleTime: 300000,
  });

  const handleChange = (valueId: number) => {
    if (onChange) onChange(valueId);
  };

  return (
    <LFormItemSelect
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
      selectProps={{
        onChange: handleChange,
        showSearch: true,
        filterOption: (input: string, option: any) => {
          return option.label.indexOf(input) >= 0;
        },
        allowClear,
        ...restProps?.selectProps,
      }}
    />
  );
};

export default LFormItemStaticSelect;

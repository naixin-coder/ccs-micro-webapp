import React from 'react';
import { apiQueryPageUrl } from '../service';
import { LFormItemInput, LTable } from 'lighting-design';
import type { ColumnsType } from 'antd/lib/table';
import { Typography } from 'antd';

const { Text } = Typography;
interface SysMenuButtonType {
  urlId: number;
  urlName: string;
}

const columns: ColumnsType<any> = [
  { title: 'URL名称', dataIndex: 'urlName', width: 200 },
  {
    title: 'URL地址',
    dataIndex: 'urlPath',
    render: (value: string) => {
      return (
        <Text style={{ width: 360 }} ellipsis={{ tooltip: { title: value } }}>
          {value}
        </Text>
      );
    },
  },
];

const formItems = [
  <LFormItemInput key="0" name="urlName" label="名称" inputProps={{ size: 'small' }} />,
  <LFormItemInput key="1" name="urlPath" label="URL地址" inputProps={{ size: 'small' }} />,
];
const ButtonUrlSelect = (props: any) => {
  const { value, onChange, setOpen } = props;

  // 选中
  const onRowSelection = (_: React.Key[], selectedRows: SysMenuButtonType[]) => {
    if (onChange) {
      onChange({
        label: selectedRows[0].urlName,
        value: selectedRows[0].urlId,
      });
      setOpen(false);
    }
  };

  return (
    <LTable
      rowKey="urlId"
      size="small"
      columns={columns}
      rowSelection={{
        type: 'radio',
        selectedRowKeys: value ? [value] : [],
        onChange: onRowSelection,
      }}
      onRow={(record) => {
        return {
          style: { cursor: 'pointer' },
          onClick: () => {
            if (onChange) {
              onChange({
                label: record.urlName,
                value: record.urlId,
              });
              setOpen(false);
            }
          },
        };
      }}
      formItems={formItems}
      showToolbar={false}
      formCardProps={{
        size: 'small',
      }}
      tableCardProps={{
        bodyStyle: {
          padding: '0 24px',
        },
      }}
      queryFormProps={{
        isSpace: true,
        labelWidth: 80,
        submitter: {
          showReset: false,
          submitButtonProps: {
            size: 'small',
          },
        },
      }}
      pagination={{
        defaultPageSize: 5,
        showSizeChanger: false,
        showQuickJumper: false,
      }}
      request={async (params) => {
        const result = await apiQueryPageUrl({
          pageNo: params.current,
          pageSize: params.pageSize,
          query: {
            ...params.formValues,
          },
        });
        const { data, success } = result;
        return {
          total: data.totalNum,
          success,
          data: data.result,
        };
      }}
    />
  );
};

export default ButtonUrlSelect;

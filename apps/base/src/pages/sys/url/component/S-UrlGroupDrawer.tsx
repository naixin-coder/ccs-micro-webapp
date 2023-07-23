import { useRequest } from '@umijs/max';
import { Table, Transfer } from 'antd';
import type { LModalFormProps } from 'lighting-design';
import { LForm, LDrawerForm } from 'lighting-design';
import { difference } from 'lodash-es';
import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { apiCreateGroupUrl, apiQueryGroupUrl } from '../service';
import type { SysUrlGroupCheckedType, SysUrlGroupType } from '../type';

interface BasicModalProps extends LModalFormProps {
  record?: SysUrlGroupType;
  onReload: () => void;
  open: boolean;
}

interface ParamsType {
  groupId?: number;
}

const leftTableColumns = [
  {
    dataIndex: 'urlName',
    title: 'URL名称',
  },
  {
    dataIndex: 'urlPath',
    title: 'URL地址',
    ellipsis: true,
  },
];

const rightTableColumns = [
  {
    dataIndex: 'urlName',
    title: 'URL名称',
  },
  {
    dataIndex: 'urlPath',
    title: 'URL地址',
    ellipsis: true,
  },
];

const UrlGroupDrawer: FC<BasicModalProps> = ({ record, onReload, open, ...restProps }) => {
  const [form] = LForm.useForm();
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);

  const {
    run,
    data: dataSource,
    loading,
  } = useRequest<API.HttpResult<SysUrlGroupCheckedType[]>, ParamsType[], SysUrlGroupCheckedType[]>(
    apiQueryGroupUrl,
    {
      manual: true,
      formatResult: (res: API.HttpResult) => {
        const { data: resData } = res;
        // 生成选择keys 和添加key字段
        const initCheckedKeys: string[] = [];
        resData.forEach((e: any) => {
          e.key = e.urlId.toString();
          if (e.checked) initCheckedKeys.push(e.urlId.toString());
        });
        setCheckedKeys(initCheckedKeys);
        return resData;
      },
    },
  );

  // 获取关联数据
  useEffect(() => {
    if (open && record) {
      run({ groupId: record.groupId });
    }
  }, [open]);

  // 穿梭选择改变
  const onChange = (nextTargetKeys: string[]) => {
    setCheckedKeys([...nextTargetKeys]);
  };

  return (
    <LDrawerForm
      open={open}
      form={form}
      labelCol={{ span: 4 }}
      width="100%"
      title={`${record?.groupName}关联URL`}
      onFinish={async () => {
        const { success } = await apiCreateGroupUrl({
          groupId: record?.groupId,
          urlIds: checkedKeys,
        });
        return success;
      }}
      modalProps={{
        afterClose: () => form.resetFields(),
      }}
      {...restProps}
    >
      <Transfer
        titles={['URL列表', '已关联']}
        dataSource={dataSource}
        showSearch
        targetKeys={checkedKeys}
        rowKey={(records) => records.urlId.toString()}
        onChange={onChange}
        filterOption={(inputValue: any, item: SysUrlGroupCheckedType) =>
          item.urlName.indexOf(inputValue) !== -1 || item.urlPath.indexOf(inputValue) !== -1
        }
      >
        {({
          direction,
          filteredItems,
          onItemSelectAll,
          onItemSelect,
          selectedKeys: listSelectedKeys,
        }) => {
          const columns = direction === 'left' ? leftTableColumns : rightTableColumns;
          const rowSelection = {
            onSelectAll(selected: boolean, selectedRows: SysUrlGroupCheckedType[]) {
              const treeSelectedKeys = selectedRows.map(({ key }) => key);
              const diffKeys = selected
                ? difference(treeSelectedKeys, listSelectedKeys)
                : difference(listSelectedKeys, treeSelectedKeys);

              onItemSelectAll(diffKeys, selected);
            },
            onSelect({ key }: { key: string }, selected: boolean) {
              onItemSelect(key, selected);
            },
            selectedRowKeys: listSelectedKeys,
          };

          return (
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={filteredItems}
              rowKey="key"
              size="small"
              loading={loading}
              onRow={({ key }) => ({
                onClick: () => {
                  onItemSelect(key, !listSelectedKeys.includes(key));
                },
              })}
            />
          );
        }}
      </Transfer>
    </LDrawerForm>
  );
};

export default UrlGroupDrawer;

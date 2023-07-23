import AuthTable from '@/components/common/AuthTable';
import { apiQueryPageRole } from '@/pages/sys/role/service';
import type { ColumnsType } from 'antd/es/table';
import { TableRowSelection } from 'antd/es/table/interface';
import { LFormItemInput, LTableInstance } from 'lighting-design';
import React, { useRef } from 'react';

const UserSelectTable = (props: any) => {
  const tableRef = useRef<LTableInstance>();
  const columns: ColumnsType<any> = [
    {
      title: '角色名称',
      dataIndex: 'roleName',
      align: 'center',
    },
    {
      title: '角色描述',
      dataIndex: 'roleDesc',
      align: 'center',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      align: 'center',
    },
  ];

  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys: props.value,
    preserveSelectedRowKeys: true,
    onChange: (newKeys, selectedRowKeys) => {
      props.onChange({
        label: selectedRowKeys.map((row) => row.roleName),
        value: newKeys,
      });
    },
  };

  return (
    <AuthTable
      size="small"
      rowKey="roleId"
      rowSelection={rowSelection}
      columns={columns}
      tableRef={tableRef}
      formItems={[<LFormItemInput key="0" name="roleName" label="角色名称" />]}
      request={async (_, requestType) => {
        if (requestType === 'onReload') {
          const tableList = tableRef.current?.tableData || [];
          return {
            total: tableList.length,
            success: true,
            data: tableList,
          };
        }
        const { data, success } = await apiQueryPageRole({
          pageNo: 1,
          pageSize: 999,
          query: { state: 1 },
        });
        let total = +data.totalNum;
        for (let i = 0; i < data.result.length; i++) {
          // 删除公共权限展示
          if (data.result[i].roleId === 9999) {
            total = +data.totalNum - 1;
            delete data.result[i];
          }
        }
        return {
          total,
          success,
          data: data.result,
        };
      }}
      showToolbar={false}
      queryFormProps={{
        isSpace: true,
        size: 'small',
        submitter: {
          showReset: false,
        },
      }}
      pagination={{
        defaultPageSize: 6,
        showSizeChanger: false,
        showQuickJumper: false,
      }}
    />
  );
};

export default UserSelectTable;

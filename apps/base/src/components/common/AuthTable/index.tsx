import type { LTableProps, LTableRequestParams } from 'lighting-design';
import { LTable } from 'lighting-design';
import React, { useState } from 'react';
import { useModel } from '@umijs/max';
import { ConfigProvider, Typography } from 'antd';
import { AuditOutlined } from '@ant-design/icons';
const { Text } = Typography;

interface AuthTableProps extends LTableProps {
  /**
   * 权限标识
   */
  auth?: string;
  /** table 局部封装request格式 */
  table?: {
    rowKey?: string;
    /** request函数 */
    request: (params: any) => Promise<any>;
    /** 参数默认值 */
    requestParam?: Record<string, any>;
    /** 请求前格式化参数 */
    onSearchBefore?: (val: LTableRequestParams['formValues']) => LTableRequestParams['formValues'];
    /** 请求后格式化结果 */
    onSearchAfter?: (result: { success: boolean; data: Record<string, any>[]; total: number }) => {
      success: boolean;
      data: Record<string, any>[];
      total: number;
    };
  };
}

const AuthTable: React.FC<AuthTableProps> = ({ auth, table, ...resProps }) => {
  const { initialState } = useModel('@@initialState');

  const { currentUser } = initialState as { currentUser: API.CurrentUser };
  const [IsAuth] = useState<boolean>(() =>
    auth !== undefined ? !!(currentUser?.authButton && currentUser.authButton?.has(auth)) : true,
  );

  return (
    <>
      {IsAuth ? (
        <LTable
          tableLayout="auto"
          size="middle"
          rowKey={table?.rowKey || resProps.rowKey}
          request={async ({ pageSize, current, formValues }) => {
            let query: LTableRequestParams['formValues'] = {
              ...formValues,
              ...table?.requestParam,
            };
            if (table?.onSearchBefore) query = table.onSearchBefore(query);
            const {
              success,
              data: { result, totalNum },
            } = await table?.request({
              pageNo: current,
              pageSize,
              query,
            });
            if (table?.onSearchAfter) {
              return table?.onSearchAfter({
                total: totalNum,
                success,
                data: result,
              });
            }
            return {
              total: totalNum,
              success,
              data: result,
            };
          }}
          {...resProps}
          columns={resProps.columns?.map((item) => {
            if (item.ellipsis) {
              return {
                ...item,
                render: (value: any, record: any, index: number) => {
                  if (item.render) item.render(value, record, index);
                  return (
                    <Text
                      style={{ width: item.width || 200 }}
                      ellipsis={{ tooltip: { title: value } }}
                    >
                      {item?.render ? item.render(value, record, index) : value}
                    </Text>
                  );
                },
              };
            }
            return item;
          })}
        />
      ) : (
        <ConfigProvider
          renderEmpty={() => (
            <div style={{ textAlign: 'center' }}>
              <AuditOutlined style={{ fontSize: 26, margin: '16px 0' }} />
              <p>暂无权限</p>
            </div>
          )}
        >
          <LTable
            tableLayout="auto"
            size="middle"
            {...resProps}
            formItems={[]}
            request={async () => {
              return { total: 0, success: false, data: [] };
            }}
            toolbarActionConfig={{
              showReload: false,
              showColumnSetting: false,
              showDensity: false,
              showFullscreen: false,
            }}
          />
        </ConfigProvider>
      )}
    </>
  );
};

export default AuthTable;

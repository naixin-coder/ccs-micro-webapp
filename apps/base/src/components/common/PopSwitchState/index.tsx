import { useModel } from '@umijs/max';
import type { PopconfirmProps, SwitchProps } from 'antd';
import { Popconfirm, Switch, Tag } from 'antd';
import { FC, useState } from 'react';

interface PopStateType {
  checked: SwitchProps['checked'];
  disabled?: SwitchProps['disabled'];
  onConfirm: PopconfirmProps['onConfirm'];
  loading?: boolean;
  popconfirmProps?: PopconfirmProps;
  SwitchProps?: SwitchProps;
  valueName: string;
  checkedTitle?: string;
  unCheckedTitle?: string;
  /**
   * 权限标识
   */
  editAuth?: string;
}
const Index: FC<PopStateType> = ({
  popconfirmProps,
  valueName,
  SwitchProps,
  checked,
  loading,
  disabled = false,
  checkedTitle = '启用',
  unCheckedTitle = '禁用',
  onConfirm,
  editAuth,
}) => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState as { currentUser: API.CurrentUser };

  const [IsAuth] = useState<boolean>(() =>
    editAuth !== undefined
      ? !!(currentUser?.authButton && currentUser.authButton?.has(editAuth))
      : true,
  );
  return (
    <div>
      {IsAuth ? (
        disabled ? (
          <Switch
            unCheckedChildren={unCheckedTitle}
            checkedChildren={checkedTitle}
            disabled={disabled}
            loading={loading}
            {...SwitchProps}
            checked={checked}
          />
        ) : (
          <Popconfirm
            placement="topRight"
            okText="确定"
            cancelText="取消"
            title={
              <>
                您确定
                {checked ? (
                  <Tag color="red" style={{ marginLeft: 8 }}>
                    {unCheckedTitle}
                  </Tag>
                ) : (
                  <Tag color="success" style={{ marginLeft: 8 }}>
                    {checkedTitle}
                  </Tag>
                )}
                <Tag color="default">{valueName}</Tag>
                吗？
              </>
            }
            {...popconfirmProps}
            onConfirm={onConfirm}
          >
            <Switch
              unCheckedChildren={unCheckedTitle}
              checkedChildren={checkedTitle}
              disabled={disabled}
              loading={loading}
              {...SwitchProps}
              checked={checked}
            />
          </Popconfirm>
        )
      ) : checked ? (
        <Tag color="success">{checkedTitle}</Tag>
      ) : (
        <Tag color="error">{unCheckedTitle}</Tag>
      )}
    </div>
  );
};
export default Index;

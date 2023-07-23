import { USER_TOKEN } from '@/constants';
import {
  BookOutlined,
  CopyOutlined,
  LinkOutlined,
  LogoutOutlined,
  SafetyCertificateOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, message, Modal, Spin } from 'antd';
import type { ItemType } from 'antd/lib/menu/hooks/useItems';
import React, { useState } from 'react';
import { useModel, useDispatch } from '@umijs/max';
import HeaderDropdown from '../HeaderDropdown';
import copy from 'copy-to-clipboard';
import styles from './index.less';
import Password from '../Password';
import { isDev } from '@/layouts/BaseLayout';
import { useToken } from '@ant-design/pro-components';

const { confirm } = Modal;
export type GlobalHeaderRightProps = {
  menu?: boolean;
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({}) => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<any>();
  const { token } = useToken();

  const loading = (
    <span className={`${styles.right_action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) return loading;

  const { currentUser } = initialState;

  if (!currentUser || !currentUser.workerName) return loading;

  const menuItems: ItemType[] = [
    ...(isDev
      ? [
          {
            key: 'swagger',
            icon: <LinkOutlined />,
            label: (
              <a
                href="http://219.152.85.11:9999/api/doc.html#/home"
                target="_blank"
                rel="noreferrer"
              >
                <span>swagger文档</span>
              </a>
            ),
          },
          {
            key: 'lighting',
            icon: <BookOutlined />,
            label: (
              <a href="https://llq0802.github.io/lighting-design/" target="_blank" rel="noreferrer">
                <span>业务组件文档</span>
              </a>
            ),
          },
        ]
      : []),
    {
      key: 'copy',
      icon: <CopyOutlined />,
      label: (
        <div
          onClick={() => {
            copy(sessionStorage.getItem(USER_TOKEN) as string);
            message.success('复制成功');
          }}
        >
          复制Token
        </div>
      ),
    },
    {
      key: 'password',
      label: (
        <a
          onClick={() => {
            setOpen(true);
          }}
        >
          密码修改
        </a>
      ),
      icon: <SafetyCertificateOutlined />,
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: (
        <div
          onClick={() =>
            confirm({
              className: 'ia-modal',
              title: '确定信息',
              okText: '确定',
              cancelText: '取消',
              content: '确定注销当前登录状态？',
              onOk() {
                setInitialState((s) => ({ ...s, currentUser: undefined }));
                dispatch({ type: 'authModel/logout' });
              },
            })
          }
        >
          退出登录
        </div>
      ),
    },
  ];

  return (
    <div>
      <HeaderDropdown menu={{ items: menuItems }}>
        <span className={`${styles.right_action} ${styles.account}`}>
          <Avatar
            style={{ background: '#0C2B76', cursor: 'pointer', marginRight: '5px' }}
            icon={<UserOutlined />}
          />
          <span
            className={`${styles.userName} anticon`}
          >{`${currentUser.workerName}，欢迎您。`}</span>
        </span>
      </HeaderDropdown>
      <Password open={open} onOpenChange={setOpen} onChange={() => {}} />
    </div>
  );
};

export default AvatarDropdown;

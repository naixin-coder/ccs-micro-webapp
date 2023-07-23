import { Space } from 'antd';
import React from 'react';
import Avatar from './AvatarDropdown';
import Menu from './MenuDropdown';
import styles from './index.less';
import header_title from '@/assets/imgs/login/header/header_title.svg';
import { history, useLocation, useModel } from '@umijs/max';

const GlobalHeader: React.FC = () => {
  const location = useLocation();
  const { initialState } = useModel('@@initialState');
  if (!initialState || !initialState.settings) {
    return null;
  }

  return (
    <Space className={styles.header_content_box}>
      <div className={styles.main_content}>
        <div className={styles.header_left_content}>
          <img
            onClick={() => {
              if (location.pathname === '/dashboard') return;
              history.replace('/dashboard');
            }}
            title="首页"
            src={header_title}
            alt="首页"
          />
        </div>
        <div className={styles.header_right_content}>
          <Avatar />
          <Menu />
        </div>
      </div>
    </Space>
  );
};
export default GlobalHeader;

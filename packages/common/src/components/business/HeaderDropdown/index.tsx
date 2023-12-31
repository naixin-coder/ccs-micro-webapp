import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import classNames from 'classnames';
import React from 'react';
import styles from './index.less';
import { DropDownProps } from 'antd/es/dropdown';

export type HeaderDropdownProps = {
  overlayClassName?: string;
  menu: MenuProps | any;
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight' | 'bottomCenter';
} & Omit<DropDownProps, 'menu'>;

const HeaderDropdown: React.FC<HeaderDropdownProps> = ({ overlayClassName: cls, ...restProps }) => (
  <Dropdown overlayClassName={classNames(styles.container, cls)} {...restProps} />
);

export default HeaderDropdown;

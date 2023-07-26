import React from 'react';
import { ProLayoutProps } from '@ant-design/pro-components';
import { MicroLayout, isQiankun } from '@ccs/common';
import { useModel } from '@umijs/max';

const BasicLayout: React.FC<ProLayoutProps> = () => {
  return <MicroLayout pure={isQiankun()} />;
};

export default BasicLayout;

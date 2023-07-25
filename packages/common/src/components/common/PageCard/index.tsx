import React from 'react';
import { ProCard, ProCardProps } from '@ant-design/pro-components';

interface PageCardProps extends ProCardProps {}

const PageCard: React.FC<PageCardProps> = ({ children, ...resProps }) => {
  return (
    <ProCard
      style={{
        // height: 'calc(100vh - 194px)',
        height: 'calc(100vh - 160px)',
        overflowY: 'auto',
      }}
      {...resProps}
    >
      {children}
    </ProCard>
  );
};

export default PageCard;

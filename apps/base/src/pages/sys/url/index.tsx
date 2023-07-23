import PageCard from '@/components/common/PageCard';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import type { FC } from 'react';
import UrlCreate from './component/S-UrlCreate';
import UrlGroup from './component/S-UrlGroup';

const Url: FC = () => {
  return (
    <PageContainer>
      <PageCard>
        <UrlGroup />
        <br />
        <UrlCreate />
      </PageCard>
    </PageContainer>
  );
};

export default Url;

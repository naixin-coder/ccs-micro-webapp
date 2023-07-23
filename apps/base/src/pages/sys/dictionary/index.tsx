import { Col, Row } from 'antd';
import type { FC } from 'react';
import { createContext, useState } from 'react';
import type { DictionaryItemType } from './type';
import LabelList from './component/S-LabelList';
import ValueList from './component/S-ValueList';
import { PageContainer } from '@ant-design/pro-components';
import PageCard from '@/components/common/PageCard';

interface DicContextProps {
  record: DictionaryItemType | undefined;
  setRecord: (val: DictionaryItemType | undefined) => void;
}

export const DicContext = createContext<DicContextProps>({
  record: undefined,
  setRecord: () => {},
});

const Dictionary: FC = () => {
  const [record, setRecord] = useState<DictionaryItemType>();
  return (
    <PageContainer>
      <DicContext.Provider
        value={{
          record,
          setRecord,
        }}
      >
        <PageCard>
          <Row gutter={[12, 12]}>
            <Col span={12}>
              <LabelList />
            </Col>
            <Col span={12}>
              <ValueList />
            </Col>
          </Row>
        </PageCard>
      </DicContext.Provider>
    </PageContainer>
  );
};

export default Dictionary;

import React from 'react';
import AmapContent from './component/S-AmapContent';
import LeftContent from './component/S-Left';
import CenterContent from './component/S-Center';
import RightFirstContent from './component/S-RightFirst';
import RightSecondContent from './component/S-RightSecond';

const Dashboard: React.FC = () => {
  return (
    <AmapContent>
      <LeftContent />
      <CenterContent />
      <RightFirstContent />
      <RightSecondContent />
    </AmapContent>
  );
};

export default Dashboard;

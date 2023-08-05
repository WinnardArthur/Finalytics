import React from 'react';
import DashboardBox from './DashboardBox';

type Props = {}

const Row3 = (props: Props) => {
  return (
    <div>
      <DashboardBox gridArea="g">Dashboard</DashboardBox>
      <DashboardBox gridArea="h">Dashboard</DashboardBox>
      <DashboardBox gridArea="i">Dashboard</DashboardBox>
      <DashboardBox gridArea="j">Dashboard</DashboardBox>
    </div>
  );
}

export default Row3
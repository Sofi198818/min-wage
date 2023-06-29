import { Spin } from 'antd';
import React from 'react';
import { useAppSelector } from '../../hooks';
import { BranchTable } from './branchTable';

const BranchWrapper = () => {
  const loading = useAppSelector(state => state.organization.branChLoading);
  const branchData = useAppSelector(state => state.organization.branchTable);

  return (
    <div>
      <Spin spinning={loading}>
        <BranchTable branchData={branchData.data} />
      </Spin>
    </div>
  );
};

export default BranchWrapper;

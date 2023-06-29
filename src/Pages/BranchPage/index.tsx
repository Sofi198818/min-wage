import React from 'react';
import { Layout } from '../../components/layout/layout';
import { BranchFilter } from './branchFilter';
import { BranchTable } from './branchTable';
import BranchWrapper from './BranchWrapper';

export const BranchPage = () => {
  return (
    <>
      <div style={{ marginTop: 25, marginBottom: 35 }}>
        <BranchFilter />
      </div>
      <BranchWrapper />
    </>
  );
};

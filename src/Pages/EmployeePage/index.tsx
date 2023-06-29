import React, { useState } from 'react';
import { Layout } from '../../components/layout/layout';
import { EmployeeFilter } from './employeeFilter';
import { EmployeeTable } from './employeeTable';

export const EmployeePage = () => {


  return (
    <>
      <div style={{ marginTop: 25, marginBottom: 35 }}>
        <EmployeeFilter
        />
      </div>
      <EmployeeTable  />
    </>
  );
};

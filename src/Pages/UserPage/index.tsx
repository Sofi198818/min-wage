import React from 'react';
import { Layout } from '../../components/layout/layout';
import { User } from './user';
import { UserFilter } from './userFilter';
import { UserTable } from './userTable';

export const UserPage = () => {
  return (
    <>
      <div style={{ marginTop: 25, marginBottom: 35 }}>
        <UserFilter />
      </div>
      <UserTable />
    </>
  );
};

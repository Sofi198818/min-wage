import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import * as path from './paths';
import { LoginPage } from '../Pages/LoginPage';

import { MinimalWage } from '../components/minimalWage/MinimalWage';
import { PasswordChange } from '../components/passwordChange/PasswordChange';
import { LoginOne } from '../components/login/LoginOne';
import { PasswordRecovery } from '../components/login/PasswordRecovery';
import { BranchPage } from '../Pages/BranchPage';
import { EmployeePage } from '../Pages/EmployeePage';
import { SheetPage } from '../Pages/SheetPage';
import { Layout } from '../components/layout/layout';
import { Employee } from '../Pages/EmployeePage/employee';
import { UserPage } from '../Pages/UserPage';
import { Result } from '../components/result/result';
import { SheetDetails } from '../Pages/SheetPage/sheetDetails';

const routes = [
  // {
  //   path: path.HOME_PATH,
  //   redirect: path.LANDING_PAGE,
  // },
  // {
  //   path: path.LOGIN_PAGE,
  //   redirect: path.LANDING_PAGE,
  // },

  {
    path: path.LOGIN_PAGE,
    component: <LoginOne />,
    key: path.LOGIN_PAGE,
    auth: false,
  },

  // {
  //   path: path.HOME_PATH,
  //   redirect: path.BRANCH_PAGE,
  //   component: <BranchPage />,
  //   key: path.HOME_PATH,
  // },
  {
    path: path.HOME_PATH,
    // redirect: path.BRANCH_PAGE,
    component: <Layout />,
    key: path.HOME_PATH,
    children: [
      {
        path: path.RESULT,
        component: <Result />,
        key: path.RESULT,
      },
      {
        path: path.HOME_PATH,
        redirect: path.BRANCH_PAGE,
        component: <BranchPage />,
        key: path.BRANCH_PAGE,
      },
      {
        path: path.BRANCH_PAGE,
        component: <BranchPage />,
        key: path.BRANCH_PAGE,
      },
      {
        path: path.Employees,
        component: <EmployeePage />,
        key: path.Employees,
      },
      {
        path: path.ADD_NEW_EMPLOYEE,
        component: <Employee />,
        key: path.ADD_NEW_EMPLOYEE,
      },
      {
        path: path.ADD_NEW_USER,
        component: <UserPage />,
        key: path.ADD_NEW_USER,
        isAllowed: ['Manager'],
      },
      {
        path: path.Sheet,
        component: <SheetPage />,
        key: path.Sheet,
        auth: true,
      },
      {
        path: path.SHEET_DETAILS,
        component: <SheetDetails />,
        key: path.SHEET_DETAILS,
      },
    ],
  },

  {
    path: path.PASSWORDRECOVERY_PAGE,
    component: <PasswordRecovery />,
    key: path.PASSWORDRECOVERY_PAGE,
    auth: false,
  },

  {
    path: path.PASSWORDCHANGE_PAGE,
    component: <PasswordChange />,
    key: path.PASSWORDCHANGE_PAGE,
  },

  {
    path: path.BRANCH_PAGE,
    component: <BranchPage />,
    key: path.BRANCH_PAGE,
  },

  {
    path: path.MinimalWage,
    component: <MinimalWage />,
    key: path.MinimalWage,
    auth: true,
    children: [
      {
        path: path.Branches,
        // component: <Branches />,
        key: path.Branches,
        auth: true,
      },
    ],
  },
];

const checkAuth = r => {
  let token = localStorage.getItem('token');
  return r.auth && !token;
};

const renderNestedRoutes = (r, user) => {
  // if (r.isAllowed) {
  //   // return <Navigate replace to={'/'} /> ;
  //   let role = r.isAllowed[0];
  //   console.log('rolerolerole', role);
  //   // console.log('actionsactionsactions',user.permissions[role]);
  //   try {
  //     let currentUserRole = user.permissions[role];
  //     console.log('currentUserRole', currentUserRole);
  //     if (!currentUserRole) {
  //       return null;
  //     }
  //   } catch (error) {
  //     console.log('errornullerrornullerrornull');
  //     return (
  //       <Route
  //         // element={<Result />}

  //         element={<Result />}
  //         path={r.path}
  //         key={r.key}
  //       />
  //     );

  //     // return null;
  //   }

  //   // let actions = user.permissions[role].split('|')
  //   // if(!actions.find(r => r === 'View')){
  //   //   <Navigate replace to={'/'} />
  //   // }
  //   // console.log('renderNestedRoutes', role, user.permissions[role]);
  // }

  let component = r.component;
  let path = r.path;
  let key = r.key;

  if (r.isAllowed) {
    let role = r.isAllowed[0];
    try {
      let currentUserRole = user.permissions[role];
      if (!currentUserRole) {
        console.log('currentUserRole', currentUserRole);
        component = <Result status={403} />;
      }
    } catch (error) {
      console.log('errornullerrornullerrornull');
    }
  }

  return (
    <Route
      element={r.redirect ? <Navigate replace to={r.redirect} /> : component}
      // element={<Result />}
      // element={checkAuth(r) ? <LoginPage /> : r.component}
      path={path}
      key={key}
    >
      {r.children
        ? r.children.map(d => {
            return renderNestedRoutes(d, user);
          })
        : null}
    </Route>
  );
};

export const RouterList = ({ user }) => {
  console.log('12123user', user);
  return (
    <Routes>
      {routes.map(r => {
        return renderNestedRoutes(r, user);
      })}
    </Routes>
  );
};

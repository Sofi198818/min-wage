import React, { useEffect } from 'react';

import { LoginOne } from '../components/login/LoginOne';

export const LoginPage = () => {
  useEffect(() => {
    localStorage.removeItem('isClose');
    localStorage.removeItem('personalNumber');
    localStorage.removeItem('fullName');
  }, []);

  return (
    <>
      <div className="content-wrapper">
        {/* <div style={{ display: 'flex', flexDirection: 'column' }}>
          <strong> userName: caseuser </strong>
          <strong>password: Ncdc@123456 </strong>
        </div> */}
        <LoginOne />
      </div>
    </>
  );
};

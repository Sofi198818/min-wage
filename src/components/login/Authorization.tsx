import React, { useState } from 'react';
import { LoginOne } from './LoginOne';
import { PasswordRecovery } from './PasswordRecovery';

function Authorization() {
  // const [showLoginForm, setShowLoginForm] = useState(true);

  return (
    <div>
      {/* {showLoginForm ? (
        <LoginOne toggleForm={() => setShowLoginForm(!showLoginForm)} />
      ) : (
        <PasswordRecovery toggleForm={() => setShowLoginForm(!showLoginForm)} />
      )} */}
      <LoginOne />
    </div>
  );
}

export default Authorization;

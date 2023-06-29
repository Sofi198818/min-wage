import { Link } from 'react-router-dom';
import React, { useCallback, useState, useEffect } from 'react';

import './globalStyles.css';
import { Protected } from './Protected';
import { useSelector } from 'react-redux';

import { useAppDispatch, useAppSelector } from './hooks';
import { RouterList } from './router/Router';
import { Layout } from './components/layout/layout';
import { fillUserData } from './redux/slices/userSlice';
import { Watermark } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

function App() {
  dayjs.locale('ka'); // switch back to default English locale globally

  const user = useAppSelector(state => state.user.userData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let userFromLocalStorage = localStorage.getItem('userData');
    console.log('userFromLocalStorage', userFromLocalStorage);
    if (userFromLocalStorage) {
      let parsed = JSON.parse(userFromLocalStorage);
      console.log('parsedparsedparsed', parsed);
      dispatch(fillUserData(parsed));
    }
  }, []);

  console.log('useruseruser', user);
  return (
    <div className="App">
      <Protected user={user}>
        <div>
          {/* <Layout> */}
          <RouterList user={user} />
          {/* </Layout> */}
        </div>
      </Protected>
    </div>
  );
}
export default App;

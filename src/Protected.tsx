import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { USER_MENEGEMENT_URL } from './constants';
import { useAppDispatch, useAppSelector } from './hooks';
import { LoginPage } from './Pages/LoginPage';
import {
  fillOrganization,
  fillUserData,
  generateTokens,
} from './redux/slices/userSlice';
import { LOGIN_PAGE } from './router/paths';

type Props = {
  user: any;
  children: any;
};

export const Protected = (props: Props) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.user.loading);

  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  console.log('Protected token111', props, token);

  var url_string = window.location.href;
  var path = window.location.pathname;
  var url = new URL(url_string);

  var loginToken = url.searchParams.get('loginToken');
  var organizationId = url.searchParams.get('organizationId');
  console.log('sofiiil3334444n', url, loginToken, organizationId);

  useEffect(() => {
    if (!loginToken) {
      let tokenFromLocalStorage = localStorage.getItem('token');
      if (!tokenFromLocalStorage) {
        console.log('tokenFromLocalStorage', tokenFromLocalStorage);
        navigate(LOGIN_PAGE);
        return;
      }
      console.log(78878, tokenFromLocalStorage);
    }

    let userFromLocalStorage = localStorage.getItem('userData');
    console.log('userFromLocalStorage', userFromLocalStorage);
    if (userFromLocalStorage) {
      let parsed = JSON.parse(userFromLocalStorage);
      console.log('parsedparsedparsed', parsed);
      dispatch(fillUserData(parsed));
    }
  }, []);

  let formData = new FormData();
  formData.append('loginToken', loginToken || '');
  formData.append('isExt', 'false');

  if (loginToken) {
    dispatch(generateTokens({ loginToken: loginToken, isExt: false }));
  }

  let organizationFromLocalStorage = localStorage.getItem('organization');

  // if(organizationFromLocalStorage){
  //   let parsed = JSON.parse(organizationFromLocalStorage)
  //   console.log('parsedparsedparsed',parsed)
  //   dispatch(fillOrganization(parsed))
  // }

  if (loading) {
    return <>Loading ...</>;
  }

  return props.children;
};

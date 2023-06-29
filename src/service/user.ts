import { API_PREFIX } from '../constants';
import { Person } from '../types/Person';
import { User } from '../types/User';
import CallApi from './api';
import qs from 'qs'
//ავტორიზაცია sms
// sopoo
export const sendSmsApi = (data: any) =>
  CallApi({
    url: API_PREFIX + `/api/Auth/RequestRecovery?userName=${data.userName}`,
    method: 'get',
  });

//ავტორიზაცია, შესვლა
export const login = (data: any) =>
  CallApi({
    url: API_PREFIX + `/api/Auth`,
    method: 'post',
    data: data,
    headers: {
      'Content-Type': `multipart/form-data; `,
    },
  });

export const loginUser = (data: any) =>
  CallApi({
    url: API_PREFIX + `/api/Auth`,
    method: 'post',
    data: data,

  });

export const passwordRecovery = (userName: string) =>
  CallApi({
    url: API_PREFIX + `/api/Auth/RequestRecovery`,
    method: 'get',
    params: { userName: userName }
  });

export const confirmRecovery = (data: any) =>
  CallApi({
    url: API_PREFIX + `/api/Auth/ConfirmRecovery`,
    method: 'post',
    data: data
  });

export const generateTokens = (loginToken: string, isExt: boolean) =>
  CallApi({
    url: API_PREFIX + `/api/Auth/LogInWithToken`,
    method: 'post',
    data: { loginToken: loginToken, isExt: isExt },
  });


export const createUser = (data: User) =>
  CallApi({
    url: API_PREFIX + `/api/Users`,
    method: 'put',
    data: data,
  });

export const getUsers = (data: any) =>
  CallApi({
    url: API_PREFIX + `/api/Users`,
    method: 'get',
    params: data,
    paramsSerializer: (params: any) => qs.stringify(params),

  });

export const deleteUser = (data: any) =>
  CallApi({
    url: API_PREFIX + `/api/Users`,
    method: 'delete',
    data: data
  });

export const updateIsActiveStatus = (data: any) =>
  CallApi({
    url: API_PREFIX + `/api/Users/updateIsActiveStatus`,
    method: 'patch',
    data: data
  });


export const syncUser = (data: Person) =>
  CallApi({
    url: API_PREFIX + `/api/Users/GetUserInfo`,
    method: 'post',
    params: data
  });


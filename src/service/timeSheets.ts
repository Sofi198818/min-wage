import { API_PREFIX } from '../constants';
import { User } from '../types/User';
import CallApi from './api';

export const getTimeSheets = (params: any) =>
  CallApi({
    url: API_PREFIX + `/api/TimeSheets`,
    method: 'get',
    params: params,
  });

export const getByContractId = (params: any) =>
  CallApi({
    url: API_PREFIX + `/api/TimeSheets/getByContractId`,
    method: 'get',
    params: params,
  });

export const updateTimeSheetDetails = (data: any) =>
  CallApi({
    url: API_PREFIX + `/api/TimeSheets`,
    method: 'put',
    data: data,
  });

export const getTimeSheetDetailsById = (id: string) =>
  CallApi({
    url: API_PREFIX + `/api/TimeSheets/${id}`,
    method: 'get',
  });

export const addTimeSheetDetailsComment = (data: any) =>
  CallApi({
    url: API_PREFIX + `/api/TimeSheets/Comment`,
    method: 'post',
    data: data,
  });

export const downloadExport = (filter: any) =>
  CallApi({
    url: API_PREFIX + `/api/TimeSheets/report`,
    method: 'get',
    params: filter,
    responseType: 'blob',
  });
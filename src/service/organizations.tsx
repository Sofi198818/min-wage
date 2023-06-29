import { API_PREFIX } from '../constants';
import CallApi from './api';

export const getOganizations = (data: any) =>
  CallApi({
    url: API_PREFIX + `/api/Organizations`,
    method: 'get',
    params: data,
  });

export const getOrganizationsForSelect = () =>
  CallApi({
    url: API_PREFIX + `/api/Organizations/GetOrganizationsForSelect`,
    method: 'get',
  });

export const putOrganization = (data: any) =>
  CallApi({
    url: API_PREFIX + `/api/Organizations`,
    method: 'put',
    data: data,
    headers: {
      'Content-Type': `multipart/form-data; `,
    },
  });

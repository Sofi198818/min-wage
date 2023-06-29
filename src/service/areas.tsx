import { API_PREFIX } from '../constants';
import CallApi from './api';

export const getRegion = () =>
  CallApi({
    url: API_PREFIX + `/api/areas/regions`,
    method: 'get',
  });

export const getMunicipality = (id: string) =>
  CallApi({
    url: API_PREFIX + `/api/Areas/municipalities/${id}`,
    method: 'get',
  });

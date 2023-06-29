import { API_PREFIX } from '../constants';
import { Employee } from '../types/Employee';
import { Person } from '../types/Person';
import CallApi from './api';

export const syncPerson = (data: Person) =>
  CallApi({
    url: API_PREFIX + `/api/Employees/GetPersonInfo`,
    method: 'post',
    params: data,
  });

export const addEmployee = (data: any) =>
  CallApi({
    url: API_PREFIX + `/api/Employees`,
    method: 'post',
    data: data,
  });

export const updateEmployee = (data: any) =>
  CallApi({
    url: API_PREFIX + `/api/Employees`,
    method: 'put',
    data: data,
  });
export const getEmployees = (data: any) =>
  CallApi({
    url: API_PREFIX + `/api/Employees`,
    method: 'get',
    params: data,
  });

export const EmployeeDismissal = (data: any) =>
  CallApi({
    url: API_PREFIX + `/api/Employees`,
    method: 'patch',
    data: data,
  });

export const getDepartments = () =>
  CallApi({
    url: API_PREFIX + `/api/Departments`,
    method: 'get',
  });

export const addDoctorCertificates = (data: any) =>
  CallApi({
    url: API_PREFIX + `/api/Employees/GetDoctorCertificates`,
    method: 'post',
    params: data,
  });

// {
//   "personalId": "26001037053",
//   "firstName": "ავთანდილ",
//   "lastName": "ზენაიშვილი",
//   "birthYear": "1994",
//   "gender": 1,
//   "status": 1,
//   "organizationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//   "position": 1,
//   "contractStartDate": "2023-02-14T13:14:10.539Z",
//   "contractEndDate": "2023-02-14T13:14:10.539Z"
// }

export const putApiEmployee = (data: FormData) =>
  CallApi({
    url: API_PREFIX + `/api/Employees`,
    method: 'put',
    data: data,
    headers: {
      'Content-Type': `multipart/form-data; `,
    },
  });

export const downloadFile = (fileId: string) =>
  CallApi({
    url: API_PREFIX + `/api/Employees/Doc/${fileId}`,
    method: 'get',
    responseType: 'blob',
  });

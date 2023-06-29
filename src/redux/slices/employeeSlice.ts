import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';
import * as callApi from '../../service';
import { Person } from '../../types/Person';
import { accessObjWithoutKey, errorMessageAlert } from '../../utils';

export const syncPerson = createAsyncThunk(
  'syncPerson',
  async (data: Person, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await callApi.employee.syncPerson(data);
      console.log('responseresponseresponse', response);
      return response;
    } catch (err: any) {
      console.log('errerrerr', err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const postDoctorCertificates = createAsyncThunk(
  'postDoctorCertificates',
  async (data: any, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await callApi.employee.addDoctorCertificates(data);
      console.log('responseresponseresponse', response);
      return response;
    } catch (error: any) {
      console.log('errerrerr', error);
      let { Errors } = error.response.data;
      console.log('ErrorsErrors', Errors);
      let err = accessObjWithoutKey(Errors);
      console.log('errerrerrerrerr', err);
      errorMessageAlert(message, err);
      return rejectWithValue(error.response.data);
    }
  }
);

export const apiPutEmployee = createAsyncThunk(
  'apiPutEmployee',
  async (data: any, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await callApi.employee.putApiEmployee(data);
      console.log('responseresponseresponse', response);
      return response;
    } catch (err: any) {
      console.log('errerrerr', err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const getEmployees = createAsyncThunk(
  'getUsers',
  async (data: any, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await callApi.employee.getEmployees(data);
      console.log('responseresponseresponse', response);
      return response;
    } catch (err: any) {
      console.log('errerrerr', err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const getApiDepartments = createAsyncThunk(
  'getApiDepartments',
  async (_, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await callApi.employee.getDepartments();
      console.log('responseresponseresponse', response);
      return response;
    } catch (err: any) {
      console.log('errerrerr', err);
      return rejectWithValue(err.response.data);
    }
  }
);

const initialPerson: Person = {
  birthYear: '',
  personalId: '',
};

const initialErrors: Array<any> = [];

export const employeeSlice = createSlice({
  name: 'employeeSlice',
  initialState: {
    departments: [
      {
        assignmentDate: '',
        certificateNumber: '',
        speciality: '',
      },
    ],
    certificates: [],
    person: initialPerson,

    employees: {
      resources: {
        pageIndex: 1,
        pageSize: 10,
        totalCount: 10,
      },
      data: [],
    },

    filter: {
      position: null,
      firstName: null,
      lastName: null
    },
    pagination: {
      total: 1,
      current: 1,
      pageSize: 20,
      showSizeChanger: true,
      pageSizeOptions: ['10', '20', '50', '100'],
    },

    employeesLoading: false,
    employeesSuccess: false,

    employeesErrors: initialErrors,

    loading: false,
    success: false,
    errors: initialErrors,
  },
  reducers: {
    resetSertificate(state, action) {
      state.certificates = [];
    },
    fillFilter(state, action) {
      state.filter = action.payload;
    },
    fillPagination(state, action) {
      state.pagination = action.payload;
    }
  },

  extraReducers: builder => {
    builder.addCase(syncPerson.fulfilled, (state, action: any) => {
      state.person = action.payload;
      localStorage.setItem('organization', JSON.stringify(action.payload));
      state.loading = false;
      state.success = true;
    });

    builder.addCase(syncPerson.pending, (state, action) => {
      state.loading = true;
      state.success = false;
      state.errors = [];
    });

    builder.addCase(syncPerson.rejected, (state, action: any) => {
      state.success = false;
      state.errors = accessObjWithoutKey(action.payload.errors);
      state.loading = false;
    });

    // departments
    builder.addCase(getApiDepartments.fulfilled, (state, action: any) => {
      state.departments = action.payload;
      console.log('action.payload', action.payload);
      state.employeesLoading = false;
      state.employeesSuccess = true;

      // state.employeesErrors = [];
    });

    builder.addCase(apiPutEmployee.fulfilled, (state, action: any) => {
      // state.person = action.payload;
      localStorage.setItem('organization', JSON.stringify(action.payload));
      state.loading = false;
      state.success = true;
    });

    builder.addCase(apiPutEmployee.pending, (state, action) => {
      state.loading = true;
      state.success = false;
      state.errors = [];
    });

    builder.addCase(apiPutEmployee.rejected, (state, action: any) => {
      state.success = false;
      state.errors = accessObjWithoutKey(action.payload.errors);
      state.loading = false;
    });

    builder.addCase(getApiDepartments.pending, (state, action) => {
      state.employeesLoading = true;
      state.employeesSuccess = false;
      // state.employeesErrors = [];
    });

    builder.addCase(getApiDepartments.rejected, (state, action: any) => {
      state.employeesErrors = accessObjWithoutKey(action.payload.errors);
    });

    builder.addCase(postDoctorCertificates.fulfilled, (state, action: any) => {
      state.certificates = action.payload;

      state.loading = false;
      state.success = true;
    });

    builder.addCase(postDoctorCertificates.pending, (state, action) => {
      state.loading = true;
      state.success = false;
      state.errors = [];
    });

    builder.addCase(postDoctorCertificates.rejected, (state, action: any) => {
      state.success = false;
      state.errors = accessObjWithoutKey(action.payload.errors);
      state.loading = false;
    });

    // getuseslice
    builder.addCase(getEmployees.fulfilled, (state, action: any) => {
      state.employees = action.payload;
      state.employeesLoading = false;
      state.employeesSuccess = true;
      state.employeesErrors = [];
    });

    builder.addCase(getEmployees.pending, (state, action) => {
      state.employeesLoading = true;
      state.employeesSuccess = false;
      state.employeesErrors = [];
    });

    builder.addCase(getEmployees.rejected, (state, action: any) => {
      state.employeesErrors = accessObjWithoutKey(action.payload.errors);
    });
  },
});

export const { resetSertificate, fillFilter,fillPagination } = employeeSlice.actions;

// export const {  } = employeeSlice.actions;

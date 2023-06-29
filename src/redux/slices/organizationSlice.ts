import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import * as callApi from '../../service';

import { message } from 'antd';
import { accessObjWithoutKey } from '../../utils';

export const apiOrganizations = createAsyncThunk(
  'apiOrganizations',
  async (data: any, { rejectWithValue, dispatch, getState }) => {
    try {
      // cnsole.log(data, " axali esaa")
      // debugger
      const response = await callApi.organizations.getOganizations(data);
      console.log('try sendSms response', response);
      //   message.success('SMS გამოგზავნილია მითითულ ნომერზე');
      return response;
    } catch (err: any) {
      console.log('catch err1111', err.response);
      message.warning(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

export const putApiOrganizations = createAsyncThunk(
  'putApiOrganizations',
  async (data, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await callApi.organizations.putOrganization(data);
      console.log('try sendSms response', response);
      //   message.success('SMS გამოგზავნილია მითითულ ნომერზე');
      return response;
    } catch (err: any) {
      console.log('catch err1111', err.response);
      message.warning(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

export const getOrganizationsForSelect = createAsyncThunk(
  'getOrganizationsForSelect',
  async (_, { rejectWithValue, dispatch, getState }) => {
    try {
      // console.log(data, " axali esaa")
      // debugger
      const response = await callApi.organizations.getOrganizationsForSelect();
      //   message.success('SMS გამოგზავნილია მითითულ ნომერზე');
      return response;
    } catch (err: any) {
      console.log('catch err1111343', err.response);
      // message.error('err.response.data');
      return rejectWithValue(err.response.data);
    }
  }
);

const initialErrors: Array<any> = [];

export const organizationSlice = createSlice({
  name: 'organizationSlice',
  initialState: {
    branchTable: {
      resourcses: {
        pageIndex: 1,
        pageSize: 10,
        totalCount: 10,
      },

      data: [],
    },

    loginUserSuccess: false,

    loading: false,
    finished: false,
    error: initialErrors,
    success: false,
    personInfo: {},
    registrError: null,
    registrSuccess: false,
    branChLoading: false,
    putOrganizationObj: false,

    // GetSubjectInfoSuccess: null,

    sendSmsForPasRecoverySucces: false,
    ChangePasswordSuccess: false,

    //getOrganizationsForSelect
    organizationsForSelect: [],
    organizationsForSelectLoading: false,
    organizationsForSelectError: initialErrors,
    organizationsForSelectSucces: false,
  },
  reducers: {
    fillOrganizationForSelect(state, action) {
      state.organizationsForSelect = action.payload;
    },
    resetputOrg(state) {
      state.putOrganizationObj = false;
    },
    resetOrganizationsForSelectSucces(state) {
      state.organizationsForSelectSucces = false;
    },
  },

  extraReducers: builder => {
    //generateTokensgenerateTokensgenerateTokensgenerateTokens
    builder.addCase(apiOrganizations.fulfilled, (state, action: any) => {
      let { resources, data } = action.payload;
      data.forEach((element: any) => {
        element.key = element.id;
      });
      console.log('resourcses122, resourcses', action.payload);
      state.branchTable.resourcses = resources;
      state.branchTable.data = data;
      state.branChLoading = false;
      state.finished = true;
      state.loginUserSuccess = true;
    });

    builder.addCase(apiOrganizations.pending, (state, action: any) => {
      state.branChLoading = true;
      state.finished = false;
      state.success = false;
      state.error = [];
    });

    builder.addCase(apiOrganizations.rejected, (state, action: any) => {
      state.finished = true;
      state.success = false;
      state.error = action.payload?.errors;
      state.branChLoading = false;
    });

    builder.addCase(putApiOrganizations.fulfilled, (state, action: any) => {
      state.loading = false;
      state.success = true;
      state.putOrganizationObj = true;
    });

    builder.addCase(putApiOrganizations.pending, (state, action) => {
      state.loading = true;
      state.success = false;
      state.putOrganizationObj = false;
    });

    builder.addCase(putApiOrganizations.rejected, (state, action: any) => {
      state.success = false;
      state.putOrganizationObj = false;
      state.error = accessObjWithoutKey(action.payload.errors);
      state.loading = false;
    });

    //getOrganizationsForSelectgetOrganizationsForSelect
    builder.addCase(getOrganizationsForSelect.fulfilled, (state, action: any) => {
      state.organizationsForSelect = action.payload;
      state.organizationsForSelectLoading = false;
      console.log('34345223',true)
      state.organizationsForSelectSucces= true;
    });

    builder.addCase(getOrganizationsForSelect.pending, (state, action) => {
      state.organizationsForSelectLoading = true;

    });

    builder.addCase(getOrganizationsForSelect.rejected, (state, action: any) => {
      // state.success = false;
      console.log('action.payload.',action.payload)
      state.organizationsForSelectError = accessObjWithoutKey(action.payload.Errors);
      state.organizationsForSelectLoading = false;
      state.organizationsForSelectSucces = false;
    });
  },
});

export const { fillOrganizationForSelect, resetputOrg,resetOrganizationsForSelectSucces } = organizationSlice.actions;

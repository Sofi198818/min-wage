import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import * as callApi from '../../service';

import { message } from 'antd';

export const getRegionApi = createAsyncThunk(
  'getRegion',
  async (_, { rejectWithValue, dispatch, getState }) => {
    try {
      // console.log(data, " axali esaa")
      // debugger
      const response = await callApi.area.getRegion();
      //   message.success('SMS გამოგზავნილია მითითულ ნომერზე');
      return response;
    } catch (err: any) {
      console.log('catch err1111', err.response);
      message.warning(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

export const getMunicipalityApi = createAsyncThunk(
  'getMunicipalityApi',
  async (id: any, { rejectWithValue, dispatch, getState }) => {
    try {
      // console.log(data, " axali esaa")
      // debugger
      const response = await callApi.area.getMunicipality(id);
      //   message.success('SMS გამოგზავნილია მითითულ ნომერზე');
      return response;
    } catch (err: any) {
      console.log('catch err1111', err.response);
      message.warning(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

const initialErrors: Array<any> = [];

export const areaSlice = createSlice({
  name: 'organizationSlice',
  initialState: {
    regionList: [
      {
        id: '',
        geoName: '',
        parentID: '',
      },
    ],
    municipalityList: [],
    loginUserSuccess: false,

    loading: false,
    finished: false,
    error: null,
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
  },
  reducers: {
    fillOrganization(state, action) {
      // state.data = action.payload;
    },
  },

  extraReducers: builder => {
    //generateTokensgenerateTokensgenerateTokensgenerateTokens

    //getOrganizationsForSelectgetOrganizationsForSelect
    builder.addCase(getRegionApi.fulfilled, (state, action: any) => {
      state.regionList = action.payload;
      state.organizationsForSelectLoading = false;
    });

    builder.addCase(getRegionApi.pending, (state, action) => {
      state.organizationsForSelectLoading = true;
    });

    builder.addCase(getRegionApi.rejected, (state, action: any) => {
      // state.finished = true;
      // state.success = false;
      // state.error = action.payload?.errors;
      // state.loading = false;
    });

    builder.addCase(getMunicipalityApi.fulfilled, (state, action: any) => {
      state.municipalityList = action.payload;
      state.organizationsForSelectLoading = false;
    });

    builder.addCase(getMunicipalityApi.pending, (state, action) => {
      state.organizationsForSelectLoading = true;
    });

    builder.addCase(getMunicipalityApi.rejected, (state, action: any) => {
      // state.finished = true;
      // state.success = false;
      // state.error = action.payload?.errors;
      // state.loading = false;
    });
  },
});

export const { fillOrganization } = areaSlice.actions;

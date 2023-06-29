import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import * as callApi from '../../service';
// import { Identification } from '../../types/identification';
// import { IdentifiedPerson } from '../../types/IdentifiedPerson';
// import { fillPerson } from './PersonSlice';
import { message } from 'antd';
import { accessObjWithoutKey } from '../../utils';

export const initialState: any = {
  user: {
    id: '',
    loginName: '',
    password: '',
    personalID: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    email: '',
    telephone: '',
    address: '',
    isSuperAdmin: false,
    twoDimensionalAuth: false,
    passwordExpirationDate: '',
    LabUser: false,
  },

  attributes: null,
  permissions: null,
};

// sopooooo
export const sendSms = createAsyncThunk(
  'sendSms',
  async (data: any, { rejectWithValue, dispatch, getState }) => {
    try {
      // console.log(data, " axali esaa")
      // debugger
      const response = await callApi.users.sendSmsApi(data);
      console.log('try sendSms response', response);
      message.success('SMS გამოგზავნილია მითითულ ნომერზე');
      return response;
    } catch (err: any) {
      console.log('catch err1111', err.response);
      message.warning(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);
// sopooo
export const loginUser = createAsyncThunk(
  'loginUser',
  async (data: any, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await callApi.users.login(data);
      console.log('loginUser response', response);
      localStorage.setItem('token', response.token);
      return response;
    } catch (err: any) {
      console.log('catch err loginUser', err.response.data);
      for (let i = 0; i < err.response.data.Errors.length; i++) {
        message.error(err.response.data.Errors[i]?.ErrorMessage);
      }
      return rejectWithValue(err.response.data);
    }
  }
);

type Data = {
  loginToken: string;
  isExt: boolean;
};
export const generateTokens = createAsyncThunk(
  'generateTokens',
  async (data: Data, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await callApi.users.generateTokens(
        data.loginToken,
        data.isExt
      );
      console.log('responseresponseresponse', response);
      return response;
    } catch (err: any) {
      console.log('errerrerr', err);
      return rejectWithValue(err.response.data);
    }
  }
);


export const getUsers = createAsyncThunk(
  'getUsers',
  async (data: any, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await callApi.users.getUsers(data
      );
      console.log('responseresponseresponse', response);
      return response;
    } catch (err: any) {
      console.log('errerrerr', err);
      return rejectWithValue(err.response.data);
    }
  }
);


const initialErrors: Array<any> = []

export const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    passwordRecoveryObject:{
      loginName: '',
      securityCode: 0,
      newPassword: '',
      confirmPassword: ''
    },
    organization: {
      user: {
        firstName: '',
        lastName: '',
      }
    },

    currentOrganization: null,
    loginUserSuccess: false,
    userData: initialState,

    loading: false,
    finished: false,
    error: null,
    success: false,
    personInfo: {},
    registrError: null,
    registrSuccess: false,

    // GetSubjectInfoSuccess: null,
    subjectInfo: {
      DirectorsAndRepresentorsList: [],
      AccountList: [
        {
          accountNumber: '',
          owners: [
            {
              IdNumber: '',
              name: '',
            },
          ],
        },
      ],
    },
    sendSmsForPasRecoverySucces: false,
    ChangePasswordSuccess: false,


    systemUsers: {
      resources: {
        pageIndex: 1,
        pageSize: 10,
        totalCount: 10
      },
      data: []
    },
    systemUsersLoading: false,
    systemUsersSuccess: false,
    systemUsersErrors: initialErrors,
  },
  reducers: {
    fillPasswordRecoveryObject(state, action){
      state.passwordRecoveryObject = {...state.passwordRecoveryObject, ...action.payload};
    },
    fillOrganization(state, action) {
      state.organization = action.payload;
    },
    fillUserData(state, action) {
      console.log('vv action.payload', action.payload)
      state.userData = action.payload;
    },
    setUserType(state, action) {
      state.userData.user.LabUser = action.payload;
    },
    setCurrentOrganization(state, action) {
      state.currentOrganization = action.payload;
    },
  },

  extraReducers: builder => {
    //შესვლა
    builder.addCase(
      loginUser.fulfilled,
      (state, action: any) => {
        console.log('loginUser ...action.payload', action.payload);
        state.userData = action.payload;
        localStorage.setItem('userData', JSON.stringify(action.payload))
        state.loading = false;
        state.finished = true;
        state.loginUserSuccess = true;
      }
    );

    builder.addCase(loginUser.pending, (state, action) => {
      console.log('loginUser pending', action);
      state.loading = true;
      state.finished = false;
      state.success = false;
      state.error = null;
    });

    builder.addCase(loginUser.rejected, (state, action: any) => {
      console.log('loginUser rejected', action);
      state.finished = true;
      state.success = false;
      state.error = action.payload?.errors;
      state.loading = false;
    });

    //generateTokensgenerateTokensgenerateTokensgenerateTokens
    builder.addCase(
      generateTokens.fulfilled,
      (state, action: any) => {
        state.organization = action.payload;
        state.userData = action.payload;
        localStorage.setItem('organization', JSON.stringify(action.payload))
        localStorage.setItem('userData', JSON.stringify(action.payload))
        state.loading = false;
        state.finished = true;
        state.loginUserSuccess = true;
      }
    );

    builder.addCase(generateTokens.pending, (state, action) => {
      state.loading = true;
      state.finished = false;
      state.success = false;
      state.error = null;
    });

    builder.addCase(generateTokens.rejected, (state, action: any) => {
      state.finished = true;
      state.success = false;
      state.error = action.payload?.errors;
      state.loading = false;
    });

    //getUsersgetUsersgetUsersgetUsers
    builder.addCase(
      getUsers.fulfilled,
      (state, action: any) => {
        state.systemUsers = action.payload;
        state.systemUsersLoading = false;
        state.systemUsersSuccess = true;
        state.systemUsersErrors = [];
      }
    );

    builder.addCase(getUsers.pending, (state, action) => {
      state.systemUsersLoading = true;
      state.systemUsersSuccess = false;
      state.systemUsersErrors = [];
    });

    builder.addCase(getUsers.rejected, (state, action: any) => {
      state.systemUsersErrors =  accessObjWithoutKey(action.payload.errors);
    });
  },
});

export const { fillUserData, setUserType, fillOrganization,fillPasswordRecoveryObject,setCurrentOrganization } = userSlice.actions;

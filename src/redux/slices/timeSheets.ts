import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import * as callApi from '../../service';
import { Person } from '../../types/Person';
import { accessObjWithoutKey, getActiveMonthForSheet } from '../../utils';
import dayjs, { Dayjs } from 'dayjs';

export const getTimeSheets = createAsyncThunk(
  'getUsers',
  async (data: any, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await callApi.timeSheets.getTimeSheets(data);
      console.log('responseresponseresponse', response);
      return response;
    } catch (err: any) {
      console.log('errerrerr', err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateTimeSheetDetails = createAsyncThunk(
  'updateTimeSheetDetails',
  async (data: any, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await callApi.timeSheets.updateTimeSheetDetails(data);
      console.log('responseresponseresponse', response);
      return response;
    } catch (err: any) {
      console.log('errerrerr', err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const submitTimeSheetDetails = createAsyncThunk(
  'submitTimeSheetDetails',
  async (data: any, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await callApi.timeSheets.updateTimeSheetDetails(data);
      console.log('responseresponseresponse', response);
      return response;
    } catch (err: any) {
      console.log('errerrerr', err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const getTimeSheetDetailsById = createAsyncThunk(
  'getTimeSheetDetailsById',
  async (id: string, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await callApi.timeSheets.getTimeSheetDetailsById(id);
      console.log('responseresponseresponse', response);
      return response;
    } catch (err: any) {
      console.log('errerrerr', err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const addTimeSheetDetailsComment = createAsyncThunk(
  'addTimeSheetDetailsComment',
  async (data: any, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await callApi.timeSheets.addTimeSheetDetailsComment(data);
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
const initialSheetDetails: any = {
  firstName: '',
  lastName: '',
  personalId: '',
  contractId: '',
  cells: [],
  comments: [],
  totalHours: 0,
  totalDays: 0,
  overTime: 0,
  night: 0,
  holiday: 0,
  other: 0,
  salary: 0,
  year: 0,
};

export const timeSheets = createSlice({
  name: 'timeSheets',
  initialState: {
    person: initialPerson,

    timeSheetsFilter: {
      pageIndex: 1,
      pageSize: 10,
      totalCount: 10,
      year: dayjs().year(),
      month: getActiveMonthForSheet().month()+1,//dayjs().month() + 1,
    },
    timeSheets: {
      resources: {
        pageIndex: 1,
        pageSize: 10,
        totalCount: 10,
        lambdaCount: 0,
      },
      data: [],
    },
    sheetDetails: initialSheetDetails,

    timeSheetsLoading: false,
    timeSheetsSuccess: false,
    timeSheetsErrors: initialErrors,

    updateTimeSheetDetailsLoading: false,
    updateTimeSheetDetailsSuccess: false,
    updateTimeSheetDetailsErrors: initialErrors,

    submitTimeSheetDetailsLoading: false,
    submitTimeSheetDetailsSuccess: false,
    submitTimeSheetDetailsErrors: initialErrors,

    getTimeSheetDetailsByIdLoading: false,
    getTimeSheetDetailsByIdSuccess: false,
    getTimeSheetDetailsByIdErrors: initialErrors,

    addTimeSheetDetailsCommentLoading: false,
    addTimeSheetDetailsCommentSuccess: false,
    addTimeSheetDetailsCommentSuccessResult: null,
    addTimeSheetDetailsCommentErrors: initialErrors,

    loading: false,
    success: false,
    errors: initialErrors,

    activeMonth: dayjs().month(),
  },
  reducers: {
    fillActiveMonth: (state: any, action: any) => {
      console.log('action23',action.payload)
      state.activeMonth = action.payload;
    },
    fillTimeSheetsFilter: (state: any, action: any) => {
      state.timeSheetsFilter = action.payload;
    },
    fiilSheetDetails: (state: any, action: any) => {
      state.sheetDetails = action.payload;
    },
    resetUpdateTimeSheetDetailsErrors: (state: any, action: any) => {
      state.updateTimeSheetDetailsErrors = action.payload;
    },

    resetUpdateTimeSheetDetailsSuccess: (state: any, action: any) => {
      state.updateTimeSheetDetailsSuccess = action.payload;
    },
    resetSubmitTimeSheetDetailsErrors: (state: any, action: any) => {
      state.submitTimeSheetDetailsErrors = action.payload;
    },
    resetSubmitTimeSheetDetailsSuccess: (state: any, action: any) => {
      state.submitTimeSheetDetailsSuccess = action.payload;
    },
    reseAddTimeSheetDetailsCommentSuccess: (state: any, action: any) => {
      state.addTimeSheetDetailsCommentSuccess = action.payload;
    },
    resetTimeSheetDetailsById: (state: any) => {
      state.sheetDetails = initialSheetDetails;
    },
  },

  extraReducers: builder => {
    // getuseslice
    builder.addCase(getTimeSheets.fulfilled, (state, action: any) => {
      console.log('23action.payload;', action.payload);
      state.timeSheets = action.payload;
      state.timeSheetsLoading = false;
      state.timeSheetsSuccess = true;
      state.timeSheetsErrors = [];
    });

    builder.addCase(getTimeSheets.pending, (state, action) => {
      state.timeSheetsLoading = true;
      state.timeSheetsSuccess = false;
      state.timeSheetsErrors = [];
    });

    builder.addCase(getTimeSheets.rejected, (state, action: any) => {
      console.log('action.payload.errors', action.payload);
      state.timeSheetsErrors = accessObjWithoutKey(action.payload.Errors);
      state.timeSheetsLoading = false;
    });

    ///updateTimeSheetDetailsupdateTimeSheetDetailsupdateTimeSheetDetails
    builder.addCase(updateTimeSheetDetails.fulfilled, (state, action: any) => {
      state.addTimeSheetDetailsCommentSuccessResult = action.payload;
      state.updateTimeSheetDetailsLoading = false;
      state.updateTimeSheetDetailsSuccess = true;
      state.updateTimeSheetDetailsErrors = [];
    });

    builder.addCase(updateTimeSheetDetails.pending, (state, action) => {
      state.updateTimeSheetDetailsLoading = true;
      state.updateTimeSheetDetailsSuccess = false;
      state.updateTimeSheetDetailsErrors = [];
    });

    builder.addCase(updateTimeSheetDetails.rejected, (state, action: any) => {
      console.log('action.payload.errors', action.payload);
      state.updateTimeSheetDetailsErrors = accessObjWithoutKey(
        action.payload.Errors
      );
      state.updateTimeSheetDetailsLoading = false;
      state.updateTimeSheetDetailsSuccess = false;
    });

    ///submitTimeSheetDetailssubmitTimeSheetDetailssubmitTimeSheetDetails
    builder.addCase(submitTimeSheetDetails.fulfilled, (state, action: any) => {
      state.submitTimeSheetDetailsLoading = false;
      state.submitTimeSheetDetailsSuccess = true;
      state.submitTimeSheetDetailsErrors = [];
    });

    builder.addCase(submitTimeSheetDetails.pending, (state, action) => {
      state.submitTimeSheetDetailsLoading = true;
      state.submitTimeSheetDetailsSuccess = false;
      state.submitTimeSheetDetailsErrors = [];
    });

    builder.addCase(submitTimeSheetDetails.rejected, (state, action: any) => {
      console.log('action.payload.errors', action.payload);
      state.submitTimeSheetDetailsErrors = accessObjWithoutKey(
        action.payload.Errors
      );
      state.submitTimeSheetDetailsLoading = false;
      state.submitTimeSheetDetailsSuccess = false;
    });

    //getTimeSheetDetailsByIdgetTimeSheetDetailsById
    builder.addCase(getTimeSheetDetailsById.fulfilled, (state, action: any) => {
      state.sheetDetails = action.payload;
      state.getTimeSheetDetailsByIdLoading = false;
      state.getTimeSheetDetailsByIdSuccess = true;
      state.getTimeSheetDetailsByIdErrors = [];
    });

    builder.addCase(getTimeSheetDetailsById.pending, (state, action) => {
      state.getTimeSheetDetailsByIdLoading = true;
      state.getTimeSheetDetailsByIdSuccess = false;
      state.getTimeSheetDetailsByIdErrors = [];
    });

    builder.addCase(getTimeSheetDetailsById.rejected, (state, action: any) => {
      console.log('action.payload.errors', action.payload);
      state.getTimeSheetDetailsByIdErrors = accessObjWithoutKey(
        action.payload.Errors
      );
      state.getTimeSheetDetailsByIdLoading = false;
      state.getTimeSheetDetailsByIdSuccess = false;
    });

    //addTimeSheetDetailsCommentaddTimeSheetDetailsCommentaddTimeSheetDetailsComment
    builder.addCase(addTimeSheetDetailsComment.fulfilled, (state, action: any) => {
      state.addTimeSheetDetailsCommentLoading = false;
      state.addTimeSheetDetailsCommentSuccess = true;

      state.addTimeSheetDetailsCommentErrors = [];
    });

    builder.addCase(addTimeSheetDetailsComment.pending, (state, action) => {
      state.addTimeSheetDetailsCommentLoading = true;
      state.addTimeSheetDetailsCommentSuccess = false;
      state.addTimeSheetDetailsCommentErrors = [];
    });

    builder.addCase(addTimeSheetDetailsComment.rejected, (state, action: any) => {
      console.log('action.payload.errors', action.payload);
      state.addTimeSheetDetailsCommentErrors = accessObjWithoutKey(
        action.payload.Errors
      );
      state.addTimeSheetDetailsCommentLoading = false;
      state.addTimeSheetDetailsCommentSuccess = false;
    });
  },
});

export const {
  fillTimeSheetsFilter,
  fiilSheetDetails,
  resetUpdateTimeSheetDetailsErrors,
  resetSubmitTimeSheetDetailsErrors,
  resetUpdateTimeSheetDetailsSuccess,
  resetSubmitTimeSheetDetailsSuccess,
  reseAddTimeSheetDetailsCommentSuccess,
  resetTimeSheetDetailsById,
  fillActiveMonth } = timeSheets.actions;

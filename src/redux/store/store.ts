import { configureStore } from '@reduxjs/toolkit';
import { appSlice } from '../slices/appSlice';
import { userSlice } from '../slices/userSlice';
import { employeeSlice } from '../slices/employeeSlice';
import { organizationSlice } from '../slices/organizationSlice';
import { timeSheets } from '../slices/timeSheets';
import { areaSlice } from '../slices/areasSlice';

const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    user: userSlice.reducer,
    employee: employeeSlice.reducer,
    organization: organizationSlice.reducer,
    timeSheets: timeSheets.reducer,
    area: areaSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export type AppState = {
  collapsed: boolean;
  person: object;
};
const initialState: AppState = {
  collapsed: true,
  person: {},
};
export const appSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    toggleCollapsed: (state: any, { payload }: PayloadAction) => {
      state.collapsed = !state.collapsed;
    },
    addperson: (state: any, action: PayloadAction) => {
      state.person = action.payload;
    },
  },
});

export const { toggleCollapsed, addperson } = appSlice.actions;

export const appSelector = (state: any) => state.app;

import { Authorization } from '@/types/Login';
import { TableType } from '@/types/Table';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface UsersState {
  authorization: Authorization;
  tableData: TableType[];
  totalCount: number;
  nextPage: string;
  prevPage: string;
  currentPage: number;
}

const initialState: UsersState = {
  authorization: null,
  tableData: [],
  totalCount: 0,
  nextPage: '',
  prevPage: '',
  currentPage: 1,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setAuthorization(state, action: PayloadAction<Authorization>) {
      state.authorization = action.payload;
    },
    setTableData(state, action: PayloadAction<TableType[]>) {
      state.tableData = action.payload;
    },
    setTotalCount(state, action: PayloadAction<number>) {
      state.totalCount = action.payload;
    },
    setNextPage(state, action: PayloadAction<string>) {
      state.nextPage = action.payload;
    },
    setPrevPage(state, action: PayloadAction<string>) {
      state.prevPage = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});

export const {
  setAuthorization,
  setTableData,
  setTotalCount,
  setNextPage,
  setPrevPage,
  setCurrentPage,
} = usersSlice.actions;

export default usersSlice.reducer;

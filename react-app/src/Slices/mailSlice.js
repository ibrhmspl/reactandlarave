import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as mailService from "../Services/mailService";
const initialState = [];

export const getMail = createAsyncThunk(
    "getMail",
    async ({email}) => {
      const res = await mailService.mail({email});
      console.log(res);
      return res;
    }
  );

  const mailSlice = createSlice({
    name: "mail",
    initialState,
    extraReducers: {
      [getMail.fulfilled]: (state, action) => {
        console.log(action.payload);
        return [...action.payload];
      },
      
    },
  });
  const { reducer } = mailSlice;
  export default reducer;
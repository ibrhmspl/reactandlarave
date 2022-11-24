import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as subCategoriesService from "../Services/subCategoriesService";
const initialState = [];
export const createSubCategories = createAsyncThunk(
  "postSubCategories",
  async (item) => {
    const res = await subCategoriesService.postSubCategories(item);
    return res;
  }
);
export const getSubCategories = createAsyncThunk(
  "getSubCategories",
  async () => {
    const res = await subCategoriesService.subCategories();
    return res;
  }
);
export const updateSubCategories = createAsyncThunk(
  "putSubCategories",
  async ({categoryId,subCategoryId,name }) => {
    const res = await subCategoriesService.putSubCategories({categoryId,subCategoryId,name});
    return res;
  }
);
export const deleteSubCategories = createAsyncThunk(
  "deleteSubCategories",
  async (subCategoryId) => {
    await subCategoriesService.deleteSubCategories(subCategoryId);
    return { subCategoryId };
  }
);

const subCategoriesSlice = createSlice({
  name: "subCategories",
  initialState,
  extraReducers: {
    [createSubCategories.fulfilled]: (state, action) => {
      state.push(action.payload);
      console.log(action.payload);
      // return [...state,action.payload]
    },
    [getSubCategories.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [updateSubCategories.fulfilled]: (state, action) => {
      const index = state.findIndex((subCategoryId) => subCategoryId === action.payload);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [deleteSubCategories.fulfilled]: (state, action) => {
      let index = state.findIndex((subCategoryId) => subCategoryId === action.payload.id);
      state.splice(index, 1);
    },
  },
});
const { reducer } = subCategoriesSlice;
export default reducer;
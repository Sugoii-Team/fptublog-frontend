import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import adminApi from "../adminApi";
import StorageKey from "../../constant/storage-keys";


export const login = createAsyncThunk(
  /* URI */
  "admin/login",
  async (payload) => {
    /* Call api to register */
    const responeData = await adminApi.login(payload);
    /* Save data to local storage after data responsed */
    const jwt = responeData.headers.authorization;
    const newJwt = jwt.replace("Bearer ", "");
    localStorage.setItem(StorageKey.TOKEN, newJwt);
    localStorage.setItem(StorageKey.USER, JSON.stringify(responeData.data));
    return responeData;
  }
);
const adminSlice = createSlice({
  name: "admin",
  initialState: {
    current: JSON.parse(localStorage.getItem(StorageKey.USER)) || {},
    accessToken: localStorage.getItem(StorageKey.TOKEN) || {},
  },
  reducers: {
    logout(state) {
      //clear local storage
      localStorage.removeItem(StorageKey.USER);
      localStorage.removeItem(StorageKey.TOKEN);

      state.current = {};
      state.accessToken = {};
    },
  },
  extraReducers: {
    /*
    same to this
    'auth/register/fullfiled' : () => {}
    */

    //Add reducers for additional action types here, and handle loading state
    [login.fulfilled]: (state, action) => {
      /* console.log("Day la action ne : ", action); */
      const jwt = action.payload.headers.authorization;
      const newJwt = jwt.replace("Bearer ", "");
      state.current = action.payload.data;
      state.accessToken = newJwt;
    },
  },
});

const { actions, reducer } = adminSlice;
export const { logout } = actions;
export default reducer;


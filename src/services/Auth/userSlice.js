import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import StorageKey from "../../constant/storage-keys";
import userApi from "../userApi";

export const register = createAsyncThunk(
  /* URI */
  "user/register",
  async (payload) => {
    /* Call api to register */
    const responeData = await userApi.register(payload);
    /* Save data to local storage after data responsed */
    const jwt = responeData.headers.authorization;
    const newJwt = jwt.replace("Bearer ", "");
    localStorage.setItem(StorageKey.TOKEN, newJwt);
    localStorage.setItem(StorageKey.USER, JSON.stringify(responeData.data));
    /* return user data */
    return responeData;
  }
);

export const login = createAsyncThunk(
  /* URI */
  "user/login",
  async (payload) => {
    /* Call api to register */
    const responeData = await userApi.login(payload);
    /* Save data to local storage after data responsed */
    const jwt = responeData.headers.authorization;
    const newJwt = jwt.replace("Bearer ", "");
    localStorage.setItem(StorageKey.TOKEN, newJwt);
    localStorage.setItem(StorageKey.USER, JSON.stringify(responeData.data));
    /* return user data */
    return responeData;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    current: JSON.parse(localStorage.getItem(StorageKey.USER)) || {},
    accessToken: localStorage.getItem(StorageKey.TOKEN) || {},
  },
  reducers: {
    logout(state) {
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
    [register.fulfilled]: (state, action) => {
      state.current = action.payload.data;
    },
    [login.fulfilled]: (state, action) => {
      /* console.log("Day la action ne : ", action); */
      const jwt = action.payload.headers.authorization;
      const newJwt = jwt.replace("Bearer ", "");
      state.current = action.payload.data;
      state.accessToken = newJwt;
    },
  },
});

const { actions, reducer } = userSlice;
export const { logout } = actions;
export default reducer;

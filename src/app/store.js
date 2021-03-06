import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../services/Auth/userSlice";
import adminReducer from "../services/Auth/adminSlice"

//List of reducer in app
const rootReducer = {
  user: userReducer,
  admin: adminReducer,
};

//Create store with whole reducer contain reducers
const store = configureStore({
  reducer: rootReducer,
});

//export to create store for app
export default store;

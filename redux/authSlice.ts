import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const admin = JSON.parse(localStorage.getItem("admin"));

export const authSlice = createSlice({
  name: "Auth",
  initialState: {
    admin: admin ?? {},
  },
  reducers: {
    setToken: (state, data) => {
      console.log(data.payload);

      localStorage.setItem("admin", JSON.stringify(data?.payload));
      state.admin = data.payload;
      axios.defaults.headers.common["Authorization"] = data.payload.accessToken;
    },
  },
});
export const { setToken } = authSlice.actions;

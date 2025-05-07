import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginState: false,
  userEmail: null,
  userType: null,
  userName: null,
  userProfilePhoto: null,
  loading: null,
  isApproved: null,
  reapprovalStatus: null,
  reapprovalFields: [],
  reapprovalReason: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const payload = action.payload;

      state.loginState = true;
      state.userEmail = payload.userEmail || null;
      state.userType = payload.userType || null;
      state.userName = payload.userName || null;
      state.userProfilePhoto = payload.userProfilePhoto || null;
      state.isApproved = payload.isApproved || null;
      state.reapprovalStatus = payload.reapprovalStatus || null;
      state.reapprovalFields = payload.reapprovalFields || [];
      state.reapprovalReason = payload.reapprovalReason || "";
    },
  },
});

export const { login } = authSlice.actions;

export default authSlice.reducer;

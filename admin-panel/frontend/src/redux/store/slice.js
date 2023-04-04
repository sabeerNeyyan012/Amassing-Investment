import { createSlice } from "@reduxjs/toolkit";
import initialState from "./invexState";

export const slice = createSlice({
  name: "stockState",
  initialState,
  reducers:{
    authUser : (state,action) => {
      return {
        ...state,
        action,
      };
    },
    setAuthUser : (state,action) => {
      state.AuthDetails = action.payload;
    },
    fetchAllUserProfile : (state,action) => {
      return {
        ...state,
        action,
      };
    },
    setAllUserProfile : (state,action) => {
    state.userProfile = action.payload;
    },
    updateUserProfile : (state,action) => {
      return{
        ...state,
        action,
      };
    },
    addUserProfile : (state,action) => {
      return{
        ...state,
        action,
      };
    },
    fetchPolicyDetails : (state,action) => {
      return{
        ...state,
        action
      };
    },
    setPolicyDetails : (state,action) => {
      state.viewPolicy = action.payload;
    },
    updatePolicyDetails : (state,action) => {
      return {
        ...state,
        action,
      };
    },
    getUserAccessHandle : (state,action) => {
      return {
        ...state,
        action,
      };
    },
    setUserAccessHandle : (state,action) => {
      return {
        ...state,
        action,
      };
    },
    setSelectedPolicy : (state,action) => {
      state.selectedPolicy = action.payload;
    },
    fetchRecentUsers : (state,action) => {
      return {
        ...state,
        action
      }
    },
    setRecentUsersList : (state,action) => {
      state.recentUsers = action.payload;
    },
    fetchUserCourseCount : (state,action) => {
      return {
        ...state,
        action
      }
    },
    setUserCourseCount : (state,action) => {
      state.userCount = action.payload;
    },
    fetchPlanDetails : (state,action) => {
      return{
        ...state,
        action
      }
    },
    setPlanDetails : (state,action)=>{
      state.planDetails = action.payload
    }
  },
});

export const {
  authUser,
  setAuthUser,
  fetchAllUserProfile,
  setAllUserProfile,
  updateUserProfile,
  addUserProfile,
  fetchPolicyDetails,
  setPolicyDetails,
  updatePolicyDetails,
  getUserAccessHandle,
  fetchUserCourseCount,
  setUserCourseCount,
  setUserAccessHandle,
  fetchPlanDetails,
  setPlanDetails,
  setSelectedPolicy,
  fetchRecentUsers,
  setRecentUsersList
} = slice.actions;

export default slice.reducer;

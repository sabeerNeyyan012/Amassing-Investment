import { createSlice } from "@reduxjs/toolkit";
import initialState from "./invexState";

export const slice = createSlice({
  name: "stockState",
  initialState,
  reducers: {
    registerUser: (state, action) => {
      return {
        ...state,
        action,
      };
    },
    registerUserV2: (state, action) => {
      return {
        ...state,
        action,
      };
    },
    setRegisterUserV2: (state, action) => {
      state.registerUser = action.payload;
    },
    authUser: (state, action) => {
      return {
        ...state,
        action,
      };
    },
    setAuthUser: (state, action) => {
      state.AuthDetails = action.payload;
    },
    isLoggedIn: (state, action) => {
      return {
        ...state,
        action,
      };
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    fetchUserProfile: (state, action) => {
      return {
        ...state,
        action,
      };
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    updateUserProfile: (state, action) => {
      return {
        ...state,
        action,
      };
    },
    getPlanDetails: (state, action) => {
      return {
        ...state,
        action,
      };
    },
    setPlanDetails: (state, action) => {
      state.planDetails = action.payload;
    },
    getCouponDetails: (state, action) => {
      return {
        ...state,
        action,
      };
    },
    setCouponDetails: (state, action) => {
      state.couponDetails = action.payload;
    },
    fetchPolicyDetails: (state, action) => {
      return {
        ...state,
        action,
      };
    },
    setPolicyDetails: (state, action) => {
      state.viewPolicy = action.payload;
    },
    // fetchPolicyDetails: (state, action) => {
    //   return {
    //     ...state,
    //     action,
    //   };
    // },
    // setPolicyDetails: (state, action) => {
    //   state.viewPolicy = action.payload;
    // },
    fetchCourses: (state, action) => {
      return {
        ...state,
        action,
      };
    },
    setCourse: (state, action) => {
      state.courses = action.payload;
    },
    nameSearchs: (state, action) => {
      return {
        ...state,
        action,
      };
    },
    setNameSearch: (state, action) => {
      state.search = action.payload;
    },
    getChapterDetails: (state, action) => {
      return {
        ...state,
        action,
      };
    },
    setChapterDetails: (state, action) => {
      state.chapterDetails = action.payload;
    },
    getVideoDetails: (state, action) => {
      return {
        ...state,
        action,
      };
    },
    setVideoDetails: (state, action) => {
      state.videoDetails = action.payload;
    },
    getPortfolios: (state, action) => {
      return {
        ...state,
        action,
      };
    },
    setPortfolios: (state, action) => {
      state.getPortfolio = action.payload;
    },
    addPortfolios: (state, action) => {
      return {
        ...state,
        action,
      };
    },
    setAddPortfolios: (state, action) => {
      state.postPortfolio = action.payload;
    },
    deletePortfolios: (state, action) => {
      return {
        ...state,
        action,
      };
    },
    setDeletePortfolios: (state, action) => {
      state.deletePortfolio = action.payload;
    },
    editPortfolios: (state, action) => {
      return {
        ...state,
        action,
      };
    },
    setEditPortfolios: (state, action) => {
      state.editPortfolio = action.payload;
    },
    addSymbols: (state, action) => {
      return {
        ...state,
        action,
      };
    },
    setAddSymbols: (state, action) => {
      state.addSymbol = action.payload;
    },

    viewSymbols: (state, action) => {
      return {
        ...state,
        action,
      };
    },
    setViewSymbols: (state, action) => {
      state.viewSymbol = action.payload;
    },
    deleteSymbols: (state, action) => {
      return {
        ...state,
        action,
      };
    },
    setDeleteSymbols: (state, action) => {
      state.deleteSymbol = action.payload;
    },
  },
});

export const {
  registerUser,
  registerUserV2,
  authUser,
  setAuthUser,
  fetchUserProfile,
  setUserProfile,
  updateUserProfile,
  getPlanDetails,
  setPlanDetails,
  getCouponDetails,
  setCouponDetails,
  fetchPolicyDetails,
  setPolicyDetails,
  setRegisterUserV2,
  isLoggedIn,
  setIsLoggedIn,
  fetchCourses,
  setCourse,
  nameSearchs,
  setNameSearch,
  getPrivacyPolicy,
  setPrivacyPolicy,
  getChapterDetails,
  setChapterDetails,
  getVideoDetails,
  setVideoDetails,
  getPortfolios,
  setPortfolios,
  addPortfolios,
  setAddPortfolios,
  deletePortfolios,
  setDeletePortfolios,
  editPortfolios,
  setEditPortfolios,
  addSymbols,
  setAddSymbols,
  viewSymbols,
  setViewSymbols,
  deleteSymbols,
  setDeleteSymbols,
} = slice.actions;

export default slice.reducer;

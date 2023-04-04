import { put, takeEvery, all, call } from "redux-saga/effects";
import {
  authenticateUserService,
  fetchUserProfileService,
  getCouponCodeService,
  getSubscriptionPlanService,
  registerUserServiceV2,
  updateUserProfileService,
  getCourseService,
  getPrivacyPolicy,
  nameSearch,
  getPortfolioService,
  postPortfolioService,
  deletePortfolioService,
  editPortfolioService,
  viewSymbolService,
  addSymbolService,
  deleteSymbolService,
} from "../../component/api/V3/authService";
import { setToken } from "../../component/Common/CommonFunctions";
import { toastNotify } from "../../component/Common/Toast/Toast";
import {
  authUser,
  fetchUserProfile,
  getCouponDetails,
  getPlanDetails,
  registerUserV2,
  setRegisterUserV2,
  setUserProfile,
  updateUserProfile,
  fetchCourses,
  fetchPolicyDetails,
  nameSearchs,
  setCourse,
  setNameSearch,
  setPolicyDetails,
  setPortfolios,
  getPortfolios,
  setAddPortfolios,
  addPortfolios,
  setDeletePortfolios,
  deletePortfolios,
  setEditPortfolios,
  editPortfolios,
  setViewSymbols,
  viewSymbols,
  setAddSymbols,
  addSymbols,
  setDeleteSymbols,
  deleteSymbols,
  setPlanDetails,
  setCouponDetails,
} from "../store/slice";

function* registerUserSaga(props) {
  try {
    const response = yield call(registerUserServiceV2, props);
    yield put(setRegisterUserV2(response));
    toastNotify(response?.data?.message, "success");
  } catch (error) {
    toastNotify(error?.message, "error");
    return error;
  }
}

function* useAuthUserSaga(props) {
  try {
    const body = {
      email: props?.payload?.emailId,
      password: props?.payload?.password,
    };

    const response = yield call(authenticateUserService, body);
    if (response?.code === 404) {
      toastNotify("User not found", "error");
    }
    if (response?.data?.token) {
      yield call(setToken, response?.data?.token);
      toastNotify(response?.message, "success");
      window.location.reload();
    }
  } catch (error) {
    toastNotify(error?.message, "error");
    return;
  }
}

function* fetchPlanDetailsSaga(props) {
  try {
    const response = yield call(getSubscriptionPlanService, props);
    yield put(setPlanDetails(response?.data));
    toastNotify(response?.data?.message, "success");
  } catch (error) {
    toastNotify(error?.message, "error");
  }
}

function* fetchCouponDetailsSaga(props) {
  try {
    const response = yield call(getCouponCodeService, props);
    yield put(setCouponDetails(response?.data));
    toastNotify(response?.data?.message, "success");
  } catch (error) {
    toastNotify(error?.message, "error");
  }
}

function* getUserProfileSaga(props) {
  try {
    const response = yield call(fetchUserProfileService, props);
    yield put(setUserProfile(response));
    toastNotify(response?.data?.message, "success");
    return response;
  } catch (error) {
    toastNotify(error?.message, "error");
  }
}

function* updateUserProfileSaga(props) {
  try {
    const response = yield call(updateUserProfileService, props);
    yield put(updateUserProfile(response));
    toastNotify(response?.data?.message, "success");
  } catch (error) { }
}

function* getCoursesSaga(props) {
  try {
    const response = yield call(getCourseService, props);
    yield put(setCourse(response));
    toastNotify(response?.data?.message, "success");
    return response;
  } catch (error) {
    toastNotify(error?.message, "error");
    return error;
  }
}
function* postNameSearch(props) {
  try {
    const response = yield call(nameSearch, props);
    yield put(setNameSearch(response));
    toastNotify(response?.data?.message, "success");
    return response;
  } catch (error) {
    toastNotify(error?.message, "error");
    return error;
  }
}

function* fetchPolicyDetailsSaga(props) {
  try {
    const response = yield call(getPrivacyPolicy, props);
    yield put(setPolicyDetails(response));
    toastNotify(response?.data?.message, "success");
    return response;
  } catch (error) {
    toastNotify(error?.message, "error");
    return error;
  }
}

function* getPortfolioSaga(props) {
  try {
    const response = yield call(getPortfolioService, props);
    yield put(setPortfolios(response));
    toastNotify(response?.data?.message, "success");
    return response;
  } catch (error) {
    toastNotify(error?.message, "error");
    return error;
  }
}

function* postPortfolioSaga(props) {
  try {
    const response = yield call(postPortfolioService, props);
    yield put(setAddPortfolios(response));
    toastNotify(response?.message, "success");
    return response;
  } catch (error) {
    toastNotify(error?.message, "error");
    return error;
  }
}

function* deletePortfolioSaga(props) {
  try {
    const response = yield call(deletePortfolioService, props);
    yield put(setDeletePortfolios(response?.payload?.data));
    toastNotify(response?.message, "success");
    return response;
  } catch (error) {
    toastNotify(error?.message, "error");
    return error;
  }
}

function* editPortfolioSaga(props) {
  try {
    const response = yield call(editPortfolioService, props);
    yield put(setEditPortfolios(response));
    toastNotify(response?.message, "success");
    return response;
  } catch (error) {
    toastNotify(error?.message, "error");
    return error;
  }
}

function* getSymbolSaga(props) {
  try {
    const response = yield call(viewSymbolService, props);
    yield put(setViewSymbols(response?.data));
    toastNotify(response?.data?.message, "success");
    return response;
  } catch (error) {
    toastNotify(error?.message, "error");
    return error;
  }
}

function* postSymbolSaga(props, id) {
  try {
    const body = {
      symbol: props?.payload?.symbol,
      portfolioId: props?.payload?.ID,
    };
    const response = yield call(addSymbolService, body);

    yield put(setAddSymbols(response));
    toastNotify(response?.message, "success");
    return response;
  } catch (error) {
    toastNotify(error?.message, "error");
    return error;
  }
}

function* deleteSymbolSaga(props) {
  try {
    const body = {
      id: props?.payload,
    };
    const response = yield call(deleteSymbolService, body);
    yield put(setDeleteSymbols(response));
    toastNotify(response?.message, "success");
    return response;
  } catch (error) {
    toastNotify(error?.message, "error");
    return error;
  }
}

export default function* invexSaga() {
  yield all([
    yield takeEvery(registerUserV2.type, registerUserSaga),
    yield takeEvery(authUser.type, useAuthUserSaga),
    yield takeEvery(getPlanDetails.type, fetchPlanDetailsSaga),
    yield takeEvery(getCouponDetails.type, fetchCouponDetailsSaga),
    yield takeEvery(fetchUserProfile.type, getUserProfileSaga),
    yield takeEvery(updateUserProfile.type, updateUserProfileSaga),
    yield takeEvery(fetchCourses.type, getCoursesSaga),
    yield takeEvery(nameSearchs.type, postNameSearch),
    yield takeEvery(fetchPolicyDetails.type, fetchPolicyDetailsSaga),
    yield takeEvery(getPortfolios.type, getPortfolioSaga),
    yield takeEvery(addPortfolios.type, postPortfolioSaga),
    yield takeEvery(deletePortfolios.type, deletePortfolioSaga),
    yield takeEvery(editPortfolios.type, editPortfolioSaga),
    yield takeEvery(viewSymbols.type, getSymbolSaga),
    yield takeEvery(addSymbols.type, postSymbolSaga),
    yield takeEvery(deleteSymbols.type, deleteSymbolSaga),
  ]);
}

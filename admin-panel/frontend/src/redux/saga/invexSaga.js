import { put, takeEvery, all, call } from "redux-saga/effects";
import {  adminAuthService, fetchAllUsersService, fetchRecentUsersService, getAllPolicyDetailsService, planDetailsService, updatePolicyService, userAccessHandleService, userCourseCountService } from "../../common/api/V3/authService";
import { toastNotify } from "../../common/Toast/Toast";
import { setToken } from "../../helpers/AuthHelper";
import {  authUser, fetchAllUserProfile, fetchPlanDetails, fetchPolicyDetails, fetchRecentUsers, fetchUserCourseCount, getUserAccessHandle, setAllUserProfile, setPlanDetails, setPolicyDetails, setRecentUsersList, setUserAccessHandle, setUserCourseCount, updatePolicyDetails } from "../store/slice";

function* adminAuthSaga(props) {
    try {
        const body = {
            email: props?.payload?.email,
            password: props?.payload?.password,
        };

        const response = yield call(adminAuthService, body);

        yield call(setToken,response?.data?.token);
        toastNotify(response?.message, "success");
        window.location.replace("/");

    } catch (error) {
        if (!error?.response) {
            toastNotify('No Server Response', "error");
        } else if (error?.response?.status === 400) {
            toastNotify('Missing Username or Password', "error");
        } else if (error?.response?.status === 401) {
            toastNotify('Unauthorized', "error");
        } else {
            toastNotify('Login Failed', "error");
        }
    }
}

function* getAllUserSaga() {
    try {
        const response = yield call(fetchAllUsersService);
        yield put(setAllUserProfile(response));
    } catch (error) {
        toastNotify(error?.message, "error");
    }
}

function* getAllRecentUserSaga() {
    try {
        const response = yield call(fetchRecentUsersService);
        yield put(setRecentUsersList(response?.data));
    } catch (e) {
        toastNotify(e?.message, "error");
    }
}

function* userAccessHandleSaga() {
    try {
        const response = yield call(userAccessHandleService);
        yield put(setUserAccessHandle(response));
        toastNotify(response?.data?.message, "success");
    } catch (err) {
        if (!err?.response) {
            toastNotify('No Server Response', "error");
        } else if (err.response?.status === 400) {
            toastNotify('Missing Username or Password', "error");
        } else if (err.response?.status === 401) {
            toastNotify('Unauthorized', "error");
        } else {
            toastNotify('Login Failed', "error");
        }
    }
}


function* getAllPolicySaga() {
    try {
        const response = yield call(getAllPolicyDetailsService);
        yield put(setPolicyDetails(response?.data));
    } catch (e) {
        toastNotify(e?.message, "error");
    }
}

function* getUserCount() {
    try {
        const response = yield call(userCourseCountService);
        yield put(setUserCourseCount(response?.data));
    } catch (e) {
        toastNotify(e?.message, "error");
    }
}

function* updatePolicySaga(props) {
    try {
        const response = yield call(updatePolicyService, props);
        toastNotify(response?.message, "success");
        return response;
    } catch (err) {
        if (!err?.response) {
            toastNotify('No Server Response', "error");
        } else if (err.response?.status === 400) {
            toastNotify('Missing Username or Password', "error");
        } else if (err.response?.status === 401) {
            toastNotify('Unauthorized', "error");
        } else {
            toastNotify('Login Failed', "error");
        }
    }
}


function* getPlanDetails() {
    try {
        const response = yield call(planDetailsService);
        yield put(setPlanDetails(response?.data));
    } catch (e) {
        toastNotify(e?.message, "error");
    }
}

export default function* invexSaga() {
    yield all([
        yield takeEvery(authUser.type, adminAuthSaga),
        yield takeEvery(fetchAllUserProfile.type, getAllUserSaga),
        yield takeEvery(getUserAccessHandle.type, userAccessHandleSaga),
        yield takeEvery(fetchPolicyDetails.type, getAllPolicySaga),
        yield takeEvery(updatePolicyDetails.type, updatePolicySaga),
        yield takeEvery(fetchRecentUsers.type, getAllRecentUserSaga),
        yield takeEvery(fetchUserCourseCount.type, getUserCount),
        yield takeEvery(fetchPlanDetails.type, getPlanDetails),
    ]);
}

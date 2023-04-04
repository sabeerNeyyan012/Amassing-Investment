import { ServiceV3, ServiceV4 } from "../../../service/adminService";

export const adminAuthService = async (param) => {
    var { data } = await ServiceV3.post(`/api/v2/users/adminLogin`, param);
    return data;
};

export const fetchAllUsersService = async () => {
    var { data } = await ServiceV4.get(`/api/v2/users/userProfileAll`);
    return data;
};

export const fetchRecentUsersService = async () => {
    var { data } = await ServiceV4.get(`/api/v2/users/recentlyRegisteredUsers`);
    return data;
};

export const userAccessHandleService = async (param) => {
    const body = {
        status: param.value,
            role: "Admin"
    }
    var { data } = await ServiceV4.put(`/api/v2/users/updateStatus/${param.id}`, body);
    return data;
};

export const getAllPolicyDetailsService = async () => {
    var { data } = await ServiceV4.get(`/api/v2/policy/viewPolicy`);
    return data;
};
export const updatePolicyService = async (param) => {
    var { data } = await ServiceV4.patch(`/api/v2/policy/editPolicy`,param?.payload);
    return data;
};
export const userCourseCountService = async () => {
    var { data } = await ServiceV4.get(`/api/v2/users/countOfUser`);
    return data;
};

export const planDetailsService = async () => {
    var { data } = await ServiceV4.get(`/api/v2/users/getPlan`);
    return data;
};

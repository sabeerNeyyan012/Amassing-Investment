import { ServiceV4, ServiceV5 } from "../../../services/apiService";
import { getToken } from "../../Common/CommonFunctions";

const AuthHeader = getToken();

export const registerUserService = async (param) => {
  var { data } = await ServiceV5.post(
    `/api/v2/users/userRegistration`,
    param.payload
  );
  return data;
};

//register with payment
export const registerUserServiceV2 = async (param) => {
  var { data } = await ServiceV5.post(
    `/api/v2/users/stripeRegistration`,
    param.payload
  );
  return data;
};
//register with payment

export const authenticateUserService = async (param) => {
  var { data } = await ServiceV5.post(`/api/v2/users/userLogin`, param);
  return data;
};
export const fetchUserProfileService = async (param) => {
  var { data } = await ServiceV4.get(
    `/api/v2/users/viewProfile/${param.payload}`,
    AuthHeader
  );
  return data;
};
export const updateUserProfileService = async (param) => {
  var { data } = await ServiceV4.put(
    `/api/v2/users/editProfile/${param.payload.id}`,param.payload.values);
  return data;
};
export const getCouponCodeService = async (param) => {
  var { data } = await ServiceV4.get(
    `/api/v2/users/getCoupons`,
    { params: param },
    {
      headers: {
        Authorization: `Bearer ${AuthHeader}`,
      },
    }
  );
  return data;
};
export const getSubscriptionPlanService = async (param) => {
  var { data } = await ServiceV4.get(
    `/api/v2/users/getPlan`,
    { params: param },
    {
      headers: {
        Authorization: `Bearer ${AuthHeader}`,
      },
    }
  );
  return data;
};
export const getCourseService = async (param) => {
  var { data } = await ServiceV4.get(`/api/v2/users/listOfCourse`, {
    headers: {
      Authorization: `Bearer ${AuthHeader}`,
    },
  });

  return data;
};

export const nameSearch = async (param) => {
  const body = {
    courseName: param?.payload?.value,
  };

  var { data } = await ServiceV4.post(`/api/v2/users/search`, body, {
    headers: {
      Authorization: `Bearer ${AuthHeader}`,
    },
  });

  return data;
};

export const getPrivacyPolicy = async (param) => {
  var { data } = await ServiceV4.get(`/api/v2/policy/viewPolicy`, {
    headers: {
      Authorization: `Bearer ${AuthHeader}`,
    },
  });

  return data;
};

//Portfolio Services

export const getPortfolioService = async (param) => {
  var { data } = await ServiceV4.get(`/api/v2/portfolio/viewAllPortfolio`, {
    headers: {
      Authorization: `Bearer ${AuthHeader}`,
    },
  });

  return data;
};

export const postPortfolioService = async (param) => {
  var { data } = await ServiceV4.post(
    `/api/v2/portfolio/addPortfolio`,
    param.payload,
    {
      headers: {
        Authorization: `Bearer ${AuthHeader}`,
      },
    }
  );

  return data;
};

export const deletePortfolioService = async (id) => {
  var { data } = await ServiceV4.put(
    `/api/v2/portfolio/deletePortfolio`,
    { id: id?.payload },
    {
      headers: {
        Authorization: `Bearer ${AuthHeader}`,
      },
    }
  );

  return data;
};

export const editPortfolioService = async (id) => {
  var { data } = await ServiceV4.put(
    `/api/v2/portfolio/editPortfolio/${id?.payload?.id}`,
    id?.payload?.port,

    {
      headers: {
        Authorization: `Bearer ${AuthHeader}`,
      },
    }
  );
  return data;
};

//wachList Portfolio

export const addSymbolService = async (props, id) => {
  var { data } = await ServiceV4.post(`/api/v2/symbol/addSymbol`, props, {
    headers: {
      Authorization: `Bearer ${AuthHeader}`,
    },
  });

  return data;
};

export const viewSymbolService = async (id) => {
  var { data } = await ServiceV4.get(
    `/api/v2/symbol/viewSymbol/${id?.payload}`,
    {
      headers: {
        Authorization: `Bearer ${AuthHeader}`,
      },
    }
  );
  return data;
};

export const deleteSymbolService = async (props) => {
  const body = {
    id: props?.id,
  };
  var { data } = await ServiceV4.post(`/api/v2/symbol/deleteSymbol`, body, {
    headers: {
      Authorization: `Bearer ${AuthHeader}`,
    },
  });
  return data;
};

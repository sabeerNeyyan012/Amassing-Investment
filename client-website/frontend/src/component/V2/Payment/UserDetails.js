import React from "react";
import { useSelector } from "react-redux";
import style from "./AddPayMethod.module.scss";

const UserDetails = () => {
  const user = useSelector((state) => state?.reducer?.registerUser?.data);
  return (
    <div className={style.wrapper}>
      <div className={style.innerWrapper}>
        <div className={style.row}>
          <h6>Name :</h6>
          <span>
            {user?.firstName} {user?.lastName}
          </span>
          <hr />
          <h6>Email :</h6>
          <span>{user?.email}</span>
          <hr />
          <h6>Customer ID :</h6>
          <span>{user?.customer_id}</span>
          <hr />
          <h6>Plan ID :</h6>
          <span>{user?.plan_id}</span>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default UserDetails;

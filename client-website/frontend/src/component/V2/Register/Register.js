import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCouponDetails, getPlanDetails, registerUserV2 } from "../../../redux/store/slice";
import { MenuItem, Select, TextField } from "@mui/material";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useRef(null);
  const intialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmpassword: "",
    coupon_id: "",
    plan_id: "",
  };
  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dispatch(getPlanDetails());
    dispatch(getCouponDetails());
  }, []);

  const Data = useSelector(state => state?.reducer);
  const plan = Data?.planDetails;
  const coupan = Data?.couponDetails

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const user = useSelector((state) => state);

  const customer_id = user?.reducer?.registerUser?.data?.customer_id;

  useEffect(() => {
    if (customer_id != undefined) {
      navigate("/subscription");
    }
  }, [customer_id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
    const formData = formValues;
    dispatch(registerUserV2(formData));
  };

  const validate = (values) => {
    let errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const matches = /^[aA-zZ\s]+$/;
    const regPass =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,20}\S$/i;

    if (!values.firstName) {
      errors.firstName = "Firstname is required";
    } else if (!matches.test(values.firstName)) {
      errors.firstName = "Only alphabets are allowed for this field";
    }
    if (!values.lastName) {
      errors.lastName = "Lastname is required";
    } else if (!matches.test(values.lastName)) {
      errors.lastName = "Only alphabets are allowed for this field";
    }
    if (!values.email) {
      errors.email = "Email ID is required";
    } else if (!regex.test(values.email)) {
      errors.email = "Invalid email format";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (!regPass.test(values.password)) {
      errors.password =
        "Please valid password. One uppercase, one lowercase, one special character and no spaces";
    }
    if (!values.confirmpassword) {
      errors.confirmpassword = "Confirmpassword is required";
    } else if (values.confirmpassword !== values.password) {
      errors.confirmpassword = "Password does not match.";
    }
    return errors;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      // submitForm();
    }
  }, [formErrors]);

  return (
    <section className="register_section mb-5 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="register text-lg-center text-left">
              <a href="javascipt" className="d-block">
                <img
                  src={require("../../Common/Images/image.png").default}
                  alt="logo"
                  className="img-fluid mb-3"
                />
              </a>
              <span>Register to Login</span>
              <br />
              <form className="mt-5 text-start" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="mb-3 form-group col-md-6">
                    <TextField
                      label="First Name"
                      variant="standard"
                      type="text"
                      name="firstName"
                      className="form-control"
                      placeholder="Enter First Name"
                      id="exampleInputEmail1"
                      value={formValues.firstName}
                      onChange={handleChange}
                    />
                    {formErrors.firstName && (
                      <p className="down-color">{formErrors.firstName}</p>
                    )}
                  </div>
                  <div className="mb-3 form-group col-md-6">
                    <TextField
                      label="Last Name"
                      variant="standard"
                      type="text"
                      name="lastName"
                      className="form-control"
                      placeholder="Enter Last Name"
                      id="exampleInputEmail1"
                      value={formValues.lastName}
                      onChange={handleChange}
                    />
                    {formErrors.lastName && (
                      <p className="down-color">{formErrors.lastName}</p>
                    )}
                  </div>
                  <div className="mb-3 form-group col-md-12">
                    <TextField
                      label="Email"
                      variant="standard"
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter Email ID"
                      id="exampleInputEmail1"
                      value={formValues.email}
                      onChange={handleChange}
                    />
                    {formErrors.email && (
                      <p className="down-color">{formErrors.email}</p>
                    )}
                  </div>
                  <div className="mb-3 form-group col-md-6">
                    <TextField
                      label="Password"
                      variant="standard"
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Enter Password"
                      id="exampleInputEmail1"
                      value={formValues.password}
                      onChange={handleChange}
                    />
                    {formErrors.password && (
                      <p className="down-color">{formErrors.password}</p>
                    )}
                  </div>
                  <div className="mb-3 form-group col-md-6">
                    <TextField
                      label="Confirmpassword"
                      variant="standard"
                      type="password"
                      name="confirmpassword"
                      className="form-control"
                      placeholder="Enter Confirm Password"
                      id="exampleInputEmail1"
                      value={formValues.confirmpassword}
                      onChange={handleChange}
                    />
                    {formErrors.confirmpassword && (
                      <p className="down-color">{formErrors.confirmpassword}</p>
                    )}
                  </div>

                  <div className="mb-3 form-group col-md-6">
                    <label htmlFor="plancode" className="form-label">
                      Choose your Coupan
                    </label>
                    <select
                      name="coupon_id"
                      className="form-control"
                      id="exampleInputEmail1"
                      value={formValues.coupon_id}
                      onChange={handleChange}>
                      <option value="">--Select Coupan--</option>
                      {coupan?.map((coups) => (
                        <option value={coups.id}>{coups.name}</option>
                      ))}
                    </select>

                    {/* <Dropdown value={plan_id} options={plan} onChange={handleChange} placeholder="Select a PLan" /> */}
                  </div>
                  {/* <div className="mb-3 form-group col-md-6">
                    <TextField
                      label="Coupon Code"
                      variant="standard"
                      type="text"
                      name="coupon_id"
                      className="form-control"
                      id="exampleInputEmail1"
                      value={formValues.coupon_id}
                      onChange={handleChange}
                    />
                  </div> */}

                  <div className="mb-3 form-group col-md-6">
                    <label htmlFor="plancode" className="form-label">
                      Choose your Plan
                    </label>
                    <select
                      name="plan_id"
                      className="form-control"
                      id="exampleInputEmail1"
                      value={formValues.plan_id}
                      onChange={handleChange}>
                      <option value="">--Select Plan--</option>
                      {plan?.map((coups) => (
                        <option value={coups.id}>{coups.amount.toString().substring(0, coups.amount.toString().length - 2)}</option>
                      ))}
                    </select>

                    {/* <Dropdown value={plan_id} options={plan} onChange={handleChange} placeholder="Select a PLan" /> */}
                  </div>

                </div>
                <div className="text-center donthveac">
                  <button
                    ref={toast}
                    type="submit"
                    className="btn btn-primary w-100 mb-3"
                  >
                    SignUp
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;

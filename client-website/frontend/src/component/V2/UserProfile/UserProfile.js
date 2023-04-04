import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProfile,
  setUserProfile,
  updateUserProfile,
} from "../../../redux/store/slice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { getToken } from "../../Common/CommonFunctions";
import { TextField } from "@mui/material";

function UserProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state?.reducer?.userProfile?.data);
  const intialValues = {
    firstName: "",
    lastName: "",
    mobile: "",
    addressLine1: "",
    addressLine2: "",
    pincode: "",
    city: "",
    state: "",
    country: "",
    dob: "",
  };
  const [formData, setFormData] = useState(intialValues);

  const Token = getToken();
  var decodedToken = jwt_decode(Token);
  const id = decodedToken?.data?.id

  const notify = () =>
    toast.success("User Login Successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const notify2 = () =>
    toast.error("Server Error...", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  useEffect(() => {
    dispatch(fetchUserProfile(id));
  },[]);
  useEffect(() => {
    setFormData(user)
  },[user])
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        mobile: "",
        addressLine1: "",
        addressLine2: "",
        pincode: "",
        city: "",
        state: "",
        country: "",
        dob: "",
      }}
      onSubmit={(values, { setSubmitting }) => {
        dispatch(updateUserProfile({id, values}));
        setSubmitting(false);
      }}
      // eslint-disable-next-line no-undef
      validationSchema={Yup.object().shape({
        firstName: Yup.string()
          .required("Please Enter First Name")
          .matches(
            /^[aA-zZ\s]+$/,
            "Only alphabets are allowed for this field "
          ),
        lastName: Yup.string()
          .required("Please Enter Last Name")
          .matches(
            /^[aA-zZ\s]+$/,
            "Only alphabets are allowed for this field "
          ),
        mobile: Yup.string()
          .required("Please Enter Mobile Number")
          .matches(
            /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
            "Phone number is not valid"
          )
          .min(10, "Must be exactly 10  digits")
          .max(10, "Must be exactly 10 digits"),
        addressLine1: Yup.string().required("Please Enter AddressLine1"),
        addressLine2: Yup.string().required("Please Enter AddressLine2"),
        pincode: Yup.string()
          .required("Please Enter Pincode")
          .matches(/^[0-9]+$/, "Must be only digits")
          .min(6, "Must be exactly 6 digits")
          .max(6, "Must be exactly 6 digits"),
        city: Yup.string().required("Please Enter City"),
        state: Yup.string().required("Please Enter State"),
        country: Yup.string().required("Please Enter Country"),
        dob: Yup.string().required("Please Enter Dob"),
      })}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;

        return (
          <section className="profile_section mb-5 mt-5">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="profile_form text-lg-center text-left">
                    <h2 style={{ textDecoration: "underline" }}>PROFILE</h2>
                    <br />
                    <div>
                      <div className="surface-card border-round shadow-2">
                        <form
                          onSubmit={handleSubmit}
                          className="mt-2 text-start"
                        >
                          <div class="mb-3 form-group">
                            <div className="row">
                              <div className="mb-3 form-group col-md-6">
                                <TextField
                                  id="firstName"
                                  name="firstName"
                                  label="FirstName"
                                  variant="standard"
                                  className="form-control"
                                  value={values.firstName || formData?.firstName}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                {errors.firstName && touched.firstName && (
                                  <div
                                    className="input-feedback"
                                    style={{ color: "red" }}
                                  >
                                    {errors.firstName}
                                  </div>
                                )}
                              </div>
                              <div className="mb-3 form-group col-md-6">
                                <TextField
                                  id="lastName"
                                  name="lastName"
                                  label="LastName"
                                  variant="standard"
                                  className="form-control"
                                  value={values.lastName || formData?.lastName}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                {errors.lastName && touched.lastName && (
                                  <div
                                    className="input-feedback"
                                    style={{ color: "red" }}
                                  >
                                    {errors.lastName}
                                  </div>
                                )}
                              </div>
                              <div className="row">
                                <div className="mb-3 form-group col-md-6">
                                  <TextField
                                    id="mobile"
                                    name="mobile"
                                    label="Mobile"
                                    variant="standard"
                                    className="form-control"
                                    value={values.mobile || formData?.mobile}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                  {errors.mobile && touched.mobile && (
                                    <div
                                      className="input-feedback"
                                      style={{ color: "red" }}
                                    >
                                      {errors.mobile}
                                    </div>
                                  )}
                                </div>

                                <div className="mb-3 form-group col-md-6">
                                  <TextField
                                    variant="standard"
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    className="form-control"
                                    id="dob"
                                    name="dob"
                                    disableFuture
                                    type="date"
                                    openTo="year"
                                    format="YYYY/MM/DD"
                                    label="Date of birth"
                                    value={values.dob || formData?.dob}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                  {errors.dob && touched.dob && (
                                    <div
                                      className="input-feedback"
                                      style={{ color: "red" }}
                                    >
                                      {errors.dob}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="mb-3 form-group col-md-6">
                              <TextField
                                id="addressLine1"
                                name="addressLine1"
                                label="addressLine1"
                                variant="standard"
                                className="form-control"
                                value={
                                  values.addressLine1 || formData?.addressLine1
                                }
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {errors.addressLine1 && touched.addressLine1 && (
                                <div
                                  className="input-feedback"
                                  style={{ color: "red" }}
                                >
                                  {errors.addressLine1}
                                </div>
                              )}
                            </div>
                            <div className="mb-3 form-group col-md-6">
                              <TextField
                                variant="standard"
                                className="form-control"
                                id="addressLine2"
                                name="addressLine2"
                                label="addressLine2"
                                value={
                                  values.addressLine2 || formData?.addressLine2
                                }
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {errors.addressLine2 && touched.addressLine2 && (
                                <div
                                  className="input-feedback"
                                  style={{ color: "red" }}
                                >
                                  {errors.addressLine2}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="row">
                            <div className="mb-3 form-group col-md-6">
                              <TextField
                                id="pincode"
                                name="pincode"
                                label="pincode"
                                variant="standard"
                                className="form-control"
                                value={values.pincode || formData?.pincode}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {errors.pincode && touched.pincode && (
                                <div
                                  className="input-feedback"
                                  style={{ color: "red" }}
                                >
                                  {errors.pincode}
                                </div>
                              )}
                            </div>
                            <div className="mb-3 form-group col-md-6">
                              <TextField
                                id="city"
                                name="city"
                                label="city"
                                variant="standard"
                                className="form-control"
                                value={values.city || formData?.city}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {errors.city && touched.city && (
                                <div
                                  className="input-feedback"
                                  style={{ color: "red" }}
                                >
                                  {errors.city}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="row">
                            <div className="mb-3 form-group col-md-6">
                              <TextField
                                variant="standard"
                                className="form-control"
                                id="country"
                                name="country"
                                label="country"
                                value={values.country || formData?.country}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {errors.country && touched.country && (
                                <div
                                  className="input-feedback"
                                  style={{ color: "red" }}
                                >
                                  {errors.country}
                                </div>
                              )}
                            </div>
                            <div className="mb-3 form-group col-md-6">
                              <TextField
                                id="state"
                                name="state"
                                label="state"
                                variant="standard"
                                className="form-control"
                                value={values.state || formData?.state}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {errors.state && touched.state && (
                                <div
                                  className="input-feedback"
                                  style={{ color: "red" }}
                                >
                                  {errors.state}
                                </div>
                              )}
                            </div>
                          </div>
                          <Button
                            disabled={isSubmitting}
                            type="submit"
                            label="Submit"
                            style={{ backgroundColor: "black", border: "none" }}
                          />
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      }}
    </Formik>
  );
}

export default UserProfile;

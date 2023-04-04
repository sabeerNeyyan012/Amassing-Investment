import { TextField } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import InvexRoutes from "../../../InvexRoutes";
import { authUser } from "../../../redux/store/slice";
import { getToken } from "../../Common/CommonFunctions";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ emailId: "", password: "" });

  const token = getToken();

  useEffect(() => {
    if (token !== undefined) {
      navigate(InvexRoutes.Home.path);
    }
  }, []);

  const setEmailError = (message) => {
    setError({ ...error, emailId: message });
  };

  const setPasswordError = (message) => {
    setError({ ...error, password: message });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (emailId && password) {
      const emailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (emailId !== "" && password !== "") {
        const values = {
          emailId: emailId,
          password: password,
        };
        dispatch(authUser(values));
        setEmailError("");
        setPasswordError("");
        // navigate(InvexRoutes.Home.path);
      } else if (!emailRegx.test(emailId)) {
        setEmailError("Please Enter Proper Email!");
      }
    } else if (!emailId) {
      setEmailError("Please Enter Email");
    } else if (!password) {
      setPasswordError("Please Enter Password");
    }
  };

  return (
    <section className="login_section">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="login_form text-lg-center text-left">
              <a href="javascipt:void(0);" className="d-block">
                <img
                  src={require("../../Common/Images/image.png").default}
                  alt="logo"
                  className="img-fluid mb-2"
                />
              </a>
              <span>Login to Dashboard</span>
              <form
                className="mt-3 text-start"
                onSubmit={(e) => handleLogin(e)}
              >
                <div>
                  <div className="mb-3 form-group">
                    <TextField
                      label="Email"
                      variant="standard"
                      type="email"
                      className="form-control"
                      // placeholder="Enter Email"
                      id="exampleInputEmail1"
                      required
                      value={emailId}
                      onChange={(e) => setEmailId(e.target.value)}
                    />
                    {error && error.emailId && (
                      <p className="down-color">{error.emailId}</p>
                    )}
                  </div>
                  <div className="mb-5 form-group">
                    <TextField
                      label="Password"
                      variant="standard"
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      // placeholder="Enter password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && error.emailId && (
                      <p className="down-color">{error.emailId}</p>
                    )}
                    {error && error.password && (
                      <p className="down-color">{error.password}</p>
                    )}
                  </div>
                </div>

                <div className="text-center donthveac">
                  <button className="btn btn-primary w-100 mb-3">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

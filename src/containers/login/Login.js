import { Spin } from "antd";
import action from "../../store/Actions";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
// import { authenticateUser } from "./userManagement";
import { useDispatch, useSelector } from "react-redux";
import { getAuthUserDetails } from "../../utils/Helpers";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [loginError, setLoginError] = useState(null);
  const loginStatus = useSelector(
    (state) => state.rootReducer.login.successData.loginStatus
  );
  const loginFailure = useSelector(
    (state) => state.rootReducer.login.successData.loginMessage
  );
  const loginLoading = useSelector((state) => state.rootReducer.login.loading);
  useEffect(() => {
    if (typeof getAuthUserDetails().id !== "undefined") {
      navigate(`/${getAuthUserDetails().username}`);
    }
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    // Handle navigation after successful login
    if (
      loginStatus === true &&
      typeof getAuthUserDetails().id !== "undefined"
    ) {
      navigate(`/${getAuthUserDetails().username}`);
    }
    // eslint-disable-next-line
  }, [getAuthUserDetails(), loginStatus, loginFailure]);

  const validateForm = () => {
    const errors = {};

    if (!username) {
      errors.username = "Username is required";
    }
    // else if (!/\S+@\S+\.\S+/.test(username)) {
    //   errors.username = "Username is invalid";
    // }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError(null);

    if (validateForm()) {
      dispatch(
        action.submitLoginAction({ username: username, password: password })
      );
    }
  };

  return (
    <div className="container">
      <Spin spinning={loginLoading}>
        <div className="form-container">
          <div className="form-toggle">
            <button className="active">Login</button>
            <button onClick={() => navigate("/signup")}>Sign Up</button>
          </div>
          <form onSubmit={handleSubmit} className="form">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              required
              name="username"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {formErrors.username && (
              <p style={{ color: "red" }}>{formErrors.username}</p>
            )}
            <br />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              required
              name="password"
              type="password"
              placeholder="************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {formErrors.password && (
              <p style={{ color: "red" }}>{formErrors.password}</p>
            )}
            {loginError && <p style={{ color: "red" }}>{loginError}</p>}
            <button type="submit">Login</button>
          </form>
        </div>
      </Spin>
    </div>
  );
}

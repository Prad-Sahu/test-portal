import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { registerUser } from "../../hooks/userManagement";
import { getAuthUserDetails } from "../../utils/Helpers";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  useEffect(() => {
    if (typeof getAuthUserDetails().id !== "undefined") {
      navigate(`/${getAuthUserDetails().username}`);
    }
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated === "true") {
      navigate("/dashboard");
    }
  }, [navigate]);

  useEffect(() => {
    // Handle navigation after successful registration
    if (registrationSuccess) {
      navigate("/dashboard");
    }
  }, [registrationSuccess, navigate]);

  const validateForm = () => {
    const errors = {};

    if (!name) {
      errors.name = "Name is required";
    } else if (name.length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (validateForm()) {
      const newUser = {
        name,
        email,
        password,
      };

      const registrationResult = registerUser(newUser);

      if (registrationResult.success) {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userName", name);
        setRegistrationSuccess(true);
      } else {
        setFormErrors((prev) => ({
          ...prev,
          email: registrationResult.message,
        }));
      }
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <Spin spinning={loading}>
        <div className="form-container">
          <div className="form-toggle">
            <button onClick={() => navigate("/login")}>Login</button>
            <button className="active">Sign Up</button>
          </div>
          <form onSubmit={handleSignup} className="form">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Abc Xyz"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {formErrors.name && (
              <p style={{ color: "red" }}>{formErrors.name}</p>
            )}

            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="abc@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {formErrors.email && (
              <p style={{ color: "red" }}>{formErrors.email}</p>
            )}

            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {formErrors.password && (
              <p style={{ color: "red" }}>{formErrors.password}</p>
            )}

            <button type="submit">Signup</button>
          </form>
        </div>
      </Spin>
    </div>
  );
}

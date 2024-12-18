import React, { useCallback } from "react";
import { Layout, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import action from "../../store/Actions";

const { Header: AntHeader } = Layout;

const Header = ({ userName }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user_auth_details");
    dispatch(action.logout());
    navigate("/login");
    // eslint-disable-next-line
  }, []);

  return (
    <AntHeader className="header">
      <div className="username">{userName}</div>
      <Button
        type="primary"
        icon={<LogoutOutlined />}
        className="logout-button"
        onClick={handleLogout}
        danger
      >
        Logout
      </Button>
    </AntHeader>
  );
};

export default Header;

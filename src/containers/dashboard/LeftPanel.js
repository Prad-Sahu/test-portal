import React from "react";
import { Avatar, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

const LeftPanel = ({ userName, users, onMyPosts, onAccountSettings }) => {
  const user = users?.filter((user) => user.id === userName.id);
  return (
    <div className="left-panel">
      <div className="card-container">
        <span>
          <Avatar
            size={69}
            icon={<UserOutlined />}
            src={user[0]?.image}
            alt="avatar"
            className="user-profile-image"
          />
        </span>
        <div className="title-container">
          <h2>{user[0]?.firstName + " " + user[0]?.lastName}</h2>
          <b>
            {user[0]?.company?.title} at {user[0]?.company?.name}
          </b>
        </div>
      </div>
      <div className="button-container">
        <Button className="left-panel-button" onClick={onMyPosts}>
          <b>My Posts</b>
        </Button>
        <Button className="left-panel-button" onClick={onAccountSettings}>
          <b>Account Settings</b>
        </Button>
      </div>
    </div>
  );
};

export default LeftPanel;

import React from "react";
import { Avatar, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

const LeftPanel = ({ userName, users, onMyPosts, onAccountSettings }) => {
  const user = users?.filter((user) => user.id === userName.id);
  console.log("user: ", user);
  return (
    <div className="left-panel">
      <div className="card-container">
        <span>
          <Avatar
            size={69}
            icon={<UserOutlined />}
            src={user[0]?.image}
            className="user-profile-image"
          />
        </span>
        <div className="title-container">
          <h2>{user[0]?.firstName + " " + user[0]?.lastName}</h2>
          <h4>
            {user[0]?.company?.title} at {user[0]?.company?.name}
          </h4>
        </div>
      </div>
      <div className="button-container">
        <Button className="left-panel-button" onClick={onMyPosts}>
          My Posts
        </Button>
        <Button className="left-panel-button" onClick={onAccountSettings}>
          Account Settings
        </Button>
      </div>
    </div>
  );
};

export default LeftPanel;

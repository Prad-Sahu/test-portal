import React, { useState, useCallback } from "react";
import { Input, Row, Col, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { getAuthUserDetails } from "../../utils/Helpers";

const { Search } = Input;

const RightPanel = ({ users, onUserSearch, onViewUserProfile }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleUserSearch = useCallback(
    (value) => {
      setSearchTerm(value);
      onUserSearch(value);
    },
    [onUserSearch]
  );

  const filteredUsers = users?.filter((user) =>
    user?.firstName?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  return (
    <div className="right-panel">
      <Search
        placeholder="Search users"
        allowClear
        onSearch={handleUserSearch}
        style={{ marginBottom: 16 }}
      />
      <Row gutter={[16, 16]}>
        {filteredUsers?.map(
          (user) =>
            user.id !== getAuthUserDetails().id && (
              <Col key={user?.id} xs={24} sm={12} md={8}>
                <div
                  onClick={() => onViewUserProfile(user?.id)}
                  className="user-connection"
                  style={{
                    border: "1px solid #f0f0f0",
                    borderRadius: "8px",
                    padding: "16px",
                    textAlign: "center",
                    cursor: "pointer",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      backgroundColor: user?.eyeColor || "transparent",
                    }}
                  />
                  <Avatar
                    size={64}
                    icon={<UserOutlined />}
                    className="user-avatar"
                    src={<img src={user?.image} alt="avatar" />}
                  />
                  <div style={{ marginTop: 8 }}>
                    <strong>{user?.firstName + " " + user?.lastName}</strong>
                  </div>
                </div>
              </Col>
            )
        )}
      </Row>
    </div>
  );
};

export default RightPanel;

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Spin, List, Radio, Input } from "antd";
import {
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";
import { getAuthUserDetails } from "../../utils/Helpers";

const { Search } = Input;

const MiddlePanel = () => {
  const [sortBy, setSortBy] = useState("latest");
  const [searchTerm, setSearchTerm] = useState("");
  const posts = useSelector(
    (state) => state.rootReducer.posts.successData.posts
  );
  const postsLoading = useSelector((state) => state.rootReducer.posts.loading);

  const handlePostSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
  };

  const handlePostSearch = (value) => {
    setSearchTerm(value);
  };

  const filteredPosts = posts?.filter((post) =>
    post?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const sortedPosts = filteredPosts?.sort((a, b) => {
    if (sortBy === "aToZ") {
      return a?.title.localeCompare(b?.title);
    } else if (sortBy === "zToA") {
      return b?.title.localeCompare(a?.title);
    }
    return 0;
  });

  return (
    <div className="middle-panel">
      <Spin spinning={postsLoading}>
        <div
          style={{
            marginBottom: 16,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Search
            placeholder="Search posts"
            allowClear
            onSearch={handlePostSearch}
            style={{ maxWidth: "80%" }}
          />
          <Radio.Group value={sortBy} onChange={handlePostSortChange}>
            <Radio.Button value="aToZ">
              <SortAscendingOutlined />
            </Radio.Button>
            <Radio.Button value="zToA">
              <SortDescendingOutlined />
            </Radio.Button>
          </Radio.Group>
        </div>
        <List
          dataSource={sortedPosts}
          renderItem={(post) =>
            post?.userId !== getAuthUserDetails()?.id && (
              <List.Item
              // actions={[
              //   <Button
              //     type="link"
              //     icon={<EditOutlined />}
              //     onClick={() => console.log("Edit clicked")}
              //   >
              //     Edit
              //   </Button>,
              // ]}
              >
                <span className="post-container">
                  <h2>{post?.title}</h2>
                  <p>{post?.body}</p>
                </span>
              </List.Item>
            )
          }
          loading={postsLoading}
        />
      </Spin>
    </div>
  );
};

export default MiddlePanel;

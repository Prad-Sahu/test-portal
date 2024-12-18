import React, { useEffect, useState } from "react";
import { Button, Form, Input, Layout, List, Modal, Spin, Radio } from "antd";
import { EditOutlined } from "@ant-design/icons";
import Header from "../../components/Header/Header";
import LeftPanel from "./LeftPanel";
import MiddlePanel from "./MiddlePanel";
import RightPanel from "./RightPanel";
import { useNavigate, useParams } from "react-router-dom";
import action from "../../store/Actions";
import { useDispatch, useSelector } from "react-redux";
import { getAuthUserDetails } from "../../utils/Helpers";

const { Content, Sider } = Layout;

const Dashboard = () => {
  const { username } = useParams(); // Access the username from the URL
  const dispatch = useDispatch(); //Initialize the dispatch function
  const navigate = useNavigate(); //Initialize the navigate function
  const userName = getAuthUserDetails();
  const posts = useSelector(
    (state) => state.rootReducer.posts.successData.posts
  );
  const postUpdate = useSelector(
    (state) => state.rootReducer.updatePost.successData.postUpdateStatus
  );
  const postsLoading = useSelector((state) => state.rootReducer.posts.loading);
  const users = useSelector(
    (state) => state.rootReducer.users.successData.users
  );
  const userUpdate = useSelector(
    (state) => state.rootReducer.updatePost.successData.userUpdateStatus
  );
  const usersLoading = useSelector((state) => state.rootReducer.users.loading);

  const [isMyPostsOpen, setIsMyPostsOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAccountSettingsOpen, setIsAccountSettingsOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState({
    id: 0,
    title: "",
    body: "",
  });
  const [currentUser, setCurrentUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    image: "",
  });

  useEffect(() => {
    if (typeof getAuthUserDetails().id === "undefined") {
      navigate("/login");
      return;
    }
    dispatch(action.getPostsAction({})); // Fetch posts
    dispatch(action.getUsersAction({})); // Fetch users
  }, [postUpdate, userUpdate, dispatch, navigate]);

  const showMyPosts = () => {
    setIsMyPostsOpen(true);
  };

  const handleMyPostsCancel = () => {
    setIsMyPostsOpen(false);
  };

  const handleEditCancel = () => {
    setIsEditModalOpen(false);
  };

  const handleAccountSettingsCancel = () => {
    setIsAccountSettingsOpen(false);
  };

  const showEditPosts = (post) => {
    setCurrentPost(post);
    setIsEditModalOpen(true);
  };

  const showAccountSettings = () => {
    setCurrentUser(userName);
    setIsAccountSettingsOpen(true);
  };

  const handleEditSubmit = (values) => {
    dispatch(action.updatePostAction({ id: currentPost.id, data: values }));
    setIsEditModalOpen(false);
  };

  const handleAccountSettingsSubmit = (values) => {
    dispatch(action.updateUserAction({ id: userName.id, data: values })); // Assuming you have an action to update the user
    setIsAccountSettingsOpen(false);
  };

  return (
    <Layout className="dashboard-layout">
      <Header userName={username} />
      <Layout className="dashboard-layout">
        <Modal
          title="My Posts"
          open={isMyPostsOpen}
          onCancel={handleMyPostsCancel}
          width={"51vw"}
          footer={null}
        >
          <List
            dataSource={posts}
            renderItem={(post) =>
              post?.userId === getAuthUserDetails()?.id && (
                <List.Item>
                  <span>
                    <h2>
                      {post?.title}
                      <Button
                        type="link"
                        className="edit-button"
                        icon={<EditOutlined />}
                        onClick={() => showEditPosts(post)}
                      >
                        Edit
                      </Button>
                    </h2>
                    <p>{post?.body}</p>
                  </span>
                </List.Item>
              )
            }
            loading={postsLoading}
          />
        </Modal>

        <Modal
          title="Edit Post"
          open={isEditModalOpen}
          onCancel={handleEditCancel}
          footer={null}
        >
          <Form initialValues={currentPost} onFinish={handleEditSubmit}>
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: "Please input the title!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="body"
              label="Body"
              rules={[{ required: true, message: "Please input the body!" }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title="Account Settings"
          open={isAccountSettingsOpen}
          onCancel={handleAccountSettingsCancel}
          footer={null}
        >
          <Form
            initialValues={currentUser}
            onFinish={handleAccountSettingsSubmit}
          >
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[
                { required: true, message: "Please input your first name!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[
                { required: true, message: "Please input your last name!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please input a valid email!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="gender"
              label="Gender"
              rules={[
                { required: true, message: "Please select your gender!" },
              ]}
            >
              <Radio.Group>
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
                <Radio value="other">Other</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="image"
              label="Profile Image URL"
              rules={[
                {
                  required: true,
                  message: "Please input your profile image URL!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        <Sider width={"18vw"} className="left-panel">
          <LeftPanel
            userName={userName}
            users={users}
            onMyPosts={showMyPosts}
            onAccountSettings={showAccountSettings}
          />
        </Sider>
        <Content className="middle-panel">
          <Spin spinning={postsLoading}>
            <MiddlePanel posts={posts} />
          </Spin>
        </Content>
        <Sider width={"25vw"} className="right-panel">
          <Spin spinning={usersLoading}>
            <RightPanel
              users={users}
              onUserSearch={(searchTerm) => {
                // Handle user search
              }}
              onViewUserProfile={(userId) => {
                // Navigate to user profile page
              }}
            />
          </Spin>
        </Sider>
      </Layout>
    </Layout>
  );
};

export default Dashboard;

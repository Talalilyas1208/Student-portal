import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
  UserOutlined,
  LogoutOutlined,
  BookOutlined
} from "@ant-design/icons";
import { Layout, Button, Row, Col, Space, Badge, Dropdown, Avatar, theme, message } from "antd";
import { useNavigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./redux/slices/authSlice";
import { fetchAllPortalData } from "./redux/slices/portalSlice";
import { setSearchQuery } from "./redux/slices/uiSlice";
import Sidebar from "./Sidebar";
import { SPsearch } from "./Components";

const { Header, Content } = Layout;

export default function Studentdashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { announcements } = useSelector((state) => state.portal);

  const {
    token: { colorBgContainer }
  } = theme.useToken();

  useEffect(() => {
    dispatch(fetchAllPortalData());
  }, [dispatch]);

  const handleSearch = (val) => {
    dispatch(setSearchQuery(val));
  };

  const handleSignOut = () => {
    dispatch(logout());
    message.success("Logged out successfully");
    navigate("/");
  };

  const userMenuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "My Profile",
      onClick: () => navigate("/studentdashboard/myprogress")
    },
    {
      key: "courses",
      icon: <BookOutlined />,
      label: "My Courses",
      onClick: () => navigate("/studentdashboard/mycourse")
    },
    {
      type: "divider"
    },
    {
      key: "logout",
      icon: <LogoutOutlined style={{ color: "#ff4d4f" }} />,
      label: <span style={{ color: "#ff4d4f" }}>Logout</span>,
      onClick: handleSignOut
    }
  ];

  return (
    <Layout style={{ minHeight: "100vh", background: "#f0f2f5" }}>
      <Sidebar collapsed={collapsed} onCollapse={setCollapsed} />
      <Layout>
        <Header
          style={{
            background: colorBgContainer,
            padding: "0 24px",
            position: "sticky",
            top: 0,
            zIndex: 9,
            display: "flex",
            alignItems: "center",
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            height: "64px"
          }}
        >
          <Row justify="space-between" align="middle" style={{ width: "100%" }}>
            <Col>
              <Space size={16}>
                <Button
                  type="text"
                  icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                  onClick={() => setCollapsed(!collapsed)}
                  style={{ fontSize: "16px" }}
                />
                <SPsearch onSearch={handleSearch} />
              </Space>
            </Col>

            <Col>
              <Space size={18} align="middle">
                <Badge count={announcements?.length || 3} size="small">
                  <Button
                    type="text"
                    shape="circle"
                    icon={<BellOutlined style={{ fontSize: "17px" }} />}
                    onClick={() => message.info(`You have ${announcements?.length || 0} active campus notices`)}
                  />
                </Badge>

                <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
                  <Space style={{ cursor: "pointer" }}>
                    <Avatar
                      style={{ backgroundColor: "#1677ff", cursor: "pointer" }}
                      icon={<UserOutlined />}
                    >
                      {user?.name?.[0] || "S"}
                    </Avatar>
                    <span style={{ fontWeight: 600, fontSize: "13px", color: "#262626" }}>
                      {user?.name || "Talal Ilyas"}
                    </span>
                  </Space>
                </Dropdown>
              </Space>
            </Col>
          </Row>
        </Header>

        <Content style={{ padding: "20px 24px", minHeight: 280 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

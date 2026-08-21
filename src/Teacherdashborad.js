import React, { useState } from "react";
import {
  BookOutlined,
  TeamOutlined,
  DashboardOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  BellOutlined
} from "@ant-design/icons";
import { Layout, Menu, Button, Row, Col, Space, Badge, Dropdown, Avatar, theme, message } from "antd";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./redux/slices/authSlice";
import SPHeader from "./Components/SPHeader";

const { Header, Content, Sider } = Layout;

export default function Teacherdashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user, role } = useSelector((state) => state.auth);

  const {
    token: { colorBgContainer }
  } = theme.useToken();

  const handleSignOut = () => {
    dispatch(logout());
    message.success("Logged out successfully");
    navigate("/");
  };

  const menuItems = [
    {
      key: "overview",
      icon: <DashboardOutlined />,
      label: "Faculty Overview",
      onClick: () => navigate("/teacherdashboard")
    },
    {
      key: "courses",
      icon: <BookOutlined />,
      label: "Assigned Courses",
      onClick: () => navigate("/teacherdashboard")
    },
    {
      key: "students",
      icon: <TeamOutlined />,
      label: "Student Grading & Performance",
      onClick: () => navigate("/teacherdashboard")
    },
    {
      type: "divider"
    },
    {
      key: "signout",
      icon: <LogoutOutlined style={{ color: "#ff4d4f" }} />,
      label: <span style={{ color: "#ff4d4f" }}>Sign Out</span>,
      onClick: handleSignOut
    }
  ];

  return (
    <Layout style={{ minHeight: "100vh", background: "#f0f2f5" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={260}
        theme="light"
        style={{
          boxShadow: "2px 0 8px rgba(0,0,0,0.05)",
          zIndex: 10,
          height: "100vh",
          position: "sticky",
          top: 0,
          left: 0
        }}
        breakpoint="lg"
      >
        <SPHeader
          collapsed={collapsed}
          profile={user}
          role="lecturer"
          loading={false}
        />
        <div style={{ padding: "12px 8px" }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["overview"]}
            items={menuItems}
            style={{ borderRight: 0, fontWeight: 500 }}
          />
        </div>
      </Sider>

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
                <span style={{ fontWeight: 600, fontSize: "16px", color: "#722ed1" }}>
                  Lecturer Academic Management System
                </span>
              </Space>
            </Col>

            <Col>
              <Space size={18} align="middle">
                <Badge count={2} size="small">
                  <Button
                    type="text"
                    shape="circle"
                    icon={<BellOutlined style={{ fontSize: "17px" }} />}
                    onClick={() => message.info("2 Pending grade approvals")}
                  />
                </Badge>

                <Dropdown
                  menu={{
                    items: [
                      {
                        key: "logout",
                        icon: <LogoutOutlined style={{ color: "#ff4d4f" }} />,
                        label: <span style={{ color: "#ff4d4f" }}>Logout</span>,
                        onClick: handleSignOut
                      }
                    ]
                  }}
                  placement="bottomRight"
                  arrow
                >
                  <Space style={{ cursor: "pointer" }}>
                    <Avatar style={{ backgroundColor: "#722ed1" }} icon={<UserOutlined />}>
                      {user?.name?.[0] || "P"}
                    </Avatar>
                    <span style={{ fontWeight: 600, fontSize: "13px", color: "#262626" }}>
                      {user?.name || "Prof. Dr. Maryam"}
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

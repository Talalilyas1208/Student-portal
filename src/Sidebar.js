import React from "react";
import {
  ReadOutlined,
  AppstoreOutlined,
  CalendarOutlined,
  ScheduleOutlined,
  FileDoneOutlined,
  LogoutOutlined,
  DashboardOutlined,
  BookOutlined
} from "@ant-design/icons";
import { Layout, Menu, Divider } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./redux/slices/authSlice";
import SPHeader from "./Components/SPHeader";

const { Sider } = Layout;

export default function Sidebar({ collapsed, onCollapse }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, role } = useSelector((state) => state.auth);

  const handleSignOut = () => {
    dispatch(logout());
    navigate("/");
  };

  // Determine current active key from pathname
  const pathParts = location.pathname.split("/").filter(Boolean);
  const currentSubPath = pathParts[1] || "dashboard";

  const menuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard Overview",
      onClick: () => navigate("/studentdashboard")
    },
    {
      key: "coursecatalogue",
      icon: <ReadOutlined />,
      label: "Course Catalogue",
      onClick: () => navigate("/studentdashboard/coursecatalogue")
    },
    {
      key: "mycourse",
      icon: <BookOutlined />,
      label: "My Enrolled Courses",
      onClick: () => navigate("/studentdashboard/mycourse")
    },
    {
      key: "academiccalendar",
      icon: <CalendarOutlined />,
      label: "Academic Calendar",
      onClick: () => navigate("/studentdashboard/academiccalendar")
    },
    {
      key: "myprogress",
      icon: <AppstoreOutlined />,
      label: "My Progress",
      onClick: () => navigate("/studentdashboard/myprogress")
    },
    {
      key: "resultcard",
      icon: <FileDoneOutlined />,
      label: "Results & Grade Cards",
      onClick: () => navigate("/studentdashboard/resultcard")
    },
    {
      key: "studycard",
      icon: <ScheduleOutlined />,
      label: "Study Cards & Topics",
      onClick: () => navigate("/studentdashboard/studycard")
    },
    {
      type: "divider"
    },
    {
      key: "signout",
      icon: <LogoutOutlined style={{ color: "#ff4d4f" }} />,
      label: <span style={{ color: "#ff4d4f", fontWeight: 500 }}>Sign Out</span>,
      onClick: handleSignOut
    }
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      width={260}
      theme="light"
      style={{
        boxShadow: "2px 0 8px rgba(0,0,0,0.05)",
        zIndex: 10,
        height: "100vh",
        position: "sticky",
        top: 0,
        left: 0,
        display: "flex",
        flexDirection: "column"
      }}
      breakpoint="lg"
    >
      <SPHeader
        collapsed={collapsed}
        profile={user}
        role={role}
        loading={false}
      />
      <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden", padding: "12px 8px" }}>
        <Menu
          mode="inline"
          selectedKeys={[currentSubPath]}
          items={menuItems}
          style={{ borderRight: 0, fontWeight: 500 }}
        />
      </div>
    </Sider>
  );
}

import React, { useState } from "react";
import { Row, Col, Typography, Card, Button, Divider, Space, Tag, message } from "antd";
import { GoogleOutlined, LoginOutlined, SafetyCertificateOutlined, UserOutlined, TeamOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setRole, loginUser } from "./redux/slices/authSlice";
import { SPlogoheader, SPRoleSelector } from "./Components";

const { Title, Text, Paragraph } = Typography;

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.role);
  const [selectedRole, setSelectedRole] = useState(role || "student");

  const handleRoleChange = (newRole) => {
    setSelectedRole(newRole);
    dispatch(setRole(newRole));
  };

  const handleGoogleLogin = async () => {
    message.loading({ content: "Signing in with Google Account...", key: "googleLogin" });
    const result = await dispatch(
      loginUser({
        username: selectedRole === "lecturer" ? "dr.maryam" : "talal.ilyas",
        password: "google-auth-pass",
        role: selectedRole
      })
    );
    if (loginUser.fulfilled.match(result)) {
      message.success({ content: `Welcome back to ${selectedRole === "lecturer" ? "Teacher" : "Student"} Portal!`, key: "googleLogin" });
      navigate(selectedRole === "lecturer" ? "/teacherdashboard" : "/studentdashboard");
    }
  };

  const handleGoToCredentialLogin = () => {
    navigate(selectedRole === "lecturer" ? "/Lecturerlogin" : "/studentlogin");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #001529 0%, #003a8c 50%, #0958d9 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px"
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: "480px",
          borderRadius: "16px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
          border: "none",
          overflow: "hidden"
        }}
        bodyStyle={{ padding: "32px 28px" }}
      >
        <SPlogoheader
          title="University of Sargodha"
          subtitle="Smart Unified Academic & Performance Portal"
        />

        <Divider style={{ margin: "16px 0" }} />

        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <Text strong style={{ fontSize: "14px", color: "#595959" }}>
            Select Your Portal Type:
          </Text>
          <SPRoleSelector role={selectedRole} onChange={handleRoleChange} />
        </div>

        <Space direction="vertical" size={14} style={{ width: "100%" }}>
          <Button
            type="primary"
            size="large"
            block
            icon={<LoginOutlined />}
            onClick={handleGoToCredentialLogin}
            style={{
              height: "46px",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "15px",
              backgroundColor: selectedRole === "lecturer" ? "#722ed1" : "#1677ff"
            }}
          >
            Sign In with {selectedRole === "lecturer" ? "Faculty" : "Student"} ID
          </Button>

          <Button
            size="large"
            block
            icon={<GoogleOutlined style={{ color: "#ea4335", fontSize: "18px" }} />}
            onClick={handleGoogleLogin}
            style={{
              height: "46px",
              borderRadius: "8px",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px"
            }}
          >
            Continue with Google Single Sign-On
          </Button>
        </Space>

        <Divider plain style={{ margin: "24px 0 16px" }}>
          <Text type="secondary" style={{ fontSize: "12px" }}>
            <SafetyCertificateOutlined style={{ marginRight: 4, color: "#52c41a" }} />
            Encrypted & Secure Campus Session
          </Text>
        </Divider>

        <div
          style={{
            backgroundColor: "#f5f5f5",
            padding: "12px 16px",
            borderRadius: "8px",
            textAlign: "center"
          }}
        >
          <Text type="secondary" style={{ fontSize: "12px", display: "block", marginBottom: 4 }}>
            Quick Demo Login Tip:
          </Text>
          <Space wrap size={[4, 4]} style={{ justifyContent: "center" }}>
            <Tag color="blue" icon={<UserOutlined />}>Student: any ID (e.g. 1234)</Tag>
            <Tag color="purple" icon={<TeamOutlined />}>Faculty: any ID (e.g. admin)</Tag>
          </Space>
        </div>
      </Card>
    </div>
  );
}

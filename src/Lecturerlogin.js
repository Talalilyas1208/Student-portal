import React from "react";
import { Card, Form, message, Button, Divider } from "antd";
import { TeamOutlined, LockOutlined, ArrowLeftOutlined, LoginOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./redux/slices/authSlice";
import { SPlogoheader, SPFormInput, SPButton } from "./Components";

export default function LecturerLogin() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (values) => {
    const { username, password } = values;
    const result = await dispatch(
      loginUser({
        username,
        password,
        role: "lecturer"
      })
    );

    if (loginUser.fulfilled.match(result)) {
      message.success("Faculty Login successful! Welcome Professor.");
      navigate("/teacherdashboard");
    } else {
      message.error(`Login failed: ${result.payload || error || "Invalid credentials"}`);
    }
  };

  const fillDemoCredentials = () => {
    form.setFieldsValue({
      username: "kminchelle",
      password: "0lelplR"
    });
    message.info("Faculty demo credentials filled!");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #120338 0%, #391085 50%, #722ed1 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px"
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: "440px",
          borderRadius: "16px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
          border: "none"
        }}
        bodyStyle={{ padding: "32px 28px" }}
      >
        <div style={{ marginBottom: 16 }}>
          <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#722ed1" }}>
            <ArrowLeftOutlined /> Back to portal selection
          </Link>
        </div>

        <SPlogoheader
          title="Lecturer & Faculty Portal"
          subtitle="Manage student grades, curricula & assessments"
        />

        <Divider style={{ margin: "16px 0 24px" }} />

        <Form
          form={form}
          name="lecturerLoginForm"
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ username: "kminchelle", password: "0lelplR" }}
        >
          <SPFormInput
            label="Faculty ID / Username"
            name="username"
            placeholder="Enter Faculty ID or Username"
            prefix={<TeamOutlined style={{ color: "#722ed1" }} />}
            rules={[{ required: true, message: "Please enter your faculty username!" }]}
            labelStyle={{ color: "#1f1f1f", fontWeight: 600 }}
          />

          <SPFormInput
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your security password"
            prefix={<LockOutlined style={{ color: "#722ed1" }} />}
            rules={[{ required: true, message: "Please enter your password!" }]}
            labelStyle={{ color: "#1f1f1f", fontWeight: 600 }}
          />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <Button type="link" size="small" onClick={fillDemoCredentials} style={{ padding: 0, color: "#722ed1" }}>
              <CheckCircleOutlined /> Fill Faculty Demo
            </Button>
            <Link to="/studentlogin" style={{ fontSize: "12px" }}>
              Are you a Student?
            </Link>
          </div>

          <SPButton
            loading={loading}
            icon={<LoginOutlined />}
            size="large"
            block
            style={{
              height: "44px",
              fontSize: "15px",
              backgroundColor: "#722ed1",
              borderColor: "#722ed1"
            }}
          >
            Sign In to Faculty Portal
          </SPButton>
        </Form>
      </Card>
    </div>
  );
}

import React from "react";
import { Row, Col, Card, Form, message, Typography, Button, Space, Divider } from "antd";
import { UserOutlined, LockOutlined, ArrowLeftOutlined, LoginOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./redux/slices/authSlice";
import { SPlogoheader, SPFormInput, SPButton } from "./Components";

const { Title, Text } = Typography;

export default function StudentLogin() {
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
        role: "student"
      })
    );

    if (loginUser.fulfilled.match(result)) {
      message.success("Student Login successful! Welcome to your dashboard.");
      navigate("/studentdashboard");
    } else {
      message.error(`Login failed: ${result.payload || error || "Invalid credentials"}`);
    }
  };

  const fillDemoCredentials = () => {
    form.setFieldsValue({
      username: "emilys",
      password: "emilyspassword"
    });
    message.info("Demo credentials filled!");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #002766 0%, #0958d9 100%)",
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
          <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#1677ff" }}>
            <ArrowLeftOutlined /> Back to portal selection
          </Link>
        </div>

        <SPlogoheader
          title="Student Portal Login"
          subtitle="Access your academic courses, exams & grades"
        />

        <Divider style={{ margin: "16px 0 24px" }} />

        <Form
          form={form}
          name="studentLoginForm"
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ username: "emilys", password: "emilyspassword" }}
        >
          <SPFormInput
            label="Student ID / Username"
            name="username"
            placeholder="Enter Student ID or Username"
            prefix={<UserOutlined style={{ color: "#1677ff" }} />}
            rules={[{ required: true, message: "Please enter your student username!" }]}
            labelStyle={{ color: "#1f1f1f", fontWeight: 600 }}
          />

          <SPFormInput
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your secret password"
            prefix={<LockOutlined style={{ color: "#1677ff" }} />}
            rules={[{ required: true, message: "Please enter your password!" }]}
            labelStyle={{ color: "#1f1f1f", fontWeight: 600 }}
          />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <Button type="link" size="small" onClick={fillDemoCredentials} style={{ padding: 0 }}>
              <CheckCircleOutlined /> Fill Demo Credentials
            </Button>
            <Link to="/Lecturerlogin" style={{ fontSize: "12px" }}>
              Are you a Lecturer?
            </Link>
          </div>

          <SPButton
            loading={loading}
            icon={<LoginOutlined />}
            size="large"
            type="primary"
            block
            style={{ height: "44px", fontSize: "15px" }}
          >
            Sign In to Student Portal
          </SPButton>
        </Form>
      </Card>
    </div>
  );
}
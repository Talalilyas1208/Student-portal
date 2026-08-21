import React from "react";
import { Form, Input, Row, Col } from "antd";
import { UserOutlined, MailOutlined, IdcardOutlined } from "@ant-design/icons";

const SPpersonalInfo = () => {
  return (
    <>
      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: "Please enter first name!" }]}
          >
            <Input prefix={<UserOutlined style={{ color: "#bfbfbf" }} />} placeholder="e.g. Talal" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: "Please enter last name!" }]}
          >
            <Input prefix={<UserOutlined style={{ color: "#bfbfbf" }} />} placeholder="e.g. Ilyas" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Student ID / Roll No"
            name="studentId"
            rules={[{ required: true, message: "Please enter Student ID!" }]}
          >
            <Input prefix={<IdcardOutlined style={{ color: "#bfbfbf" }} />} placeholder="e.g. SP-2026-8812" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            label="University Email"
            name="email"
            rules={[
              { type: "email", message: "Please enter a valid email!" }
            ]}
          >
            <Input prefix={<MailOutlined style={{ color: "#bfbfbf" }} />} placeholder="student@university.edu" />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default React.memo(SPpersonalInfo);

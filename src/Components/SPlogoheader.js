import React from "react";
import { Row, Col, Space, Typography } from "antd";
import { BankFilled } from "@ant-design/icons";

const { Title, Text } = Typography;

export default function SPlogoheader({ title = "University Portal", subtitle = "Student & Faculty Information System" }) {
  return (
    <Row justify="center" style={{ width: "100%", margin: "20px 0 10px" }}>
      <Col style={{ textAlign: "center" }}>
        <Space orientation="vertical" align="center" size={4}>
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              backgroundColor: "#e6f4ff",
              color: "#1677ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              boxShadow: "0 2px 8px rgba(22,119,255,0.15)"
            }}
          >
            <BankFilled />
          </div>
          <Title level={3} style={{ margin: "4px 0 0", color: "#002766", fontWeight: 700 }}>
            {title}
          </Title>
          <Text type="secondary" style={{ fontSize: "13px" }}>
            {subtitle}
          </Text>
        </Space>
      </Col>
    </Row>
  );
}

import React from "react";
import { Typography, Row, Col, Space } from "antd";

const { Title, Text } = Typography;

const SPTitle = ({ text, item, level = 3, subtitle, style = {}, align = "center" }) => {
  return (
    <Row justify={align === "left" ? "start" : align === "right" ? "end" : "center"} style={{ margin: "12px 0 20px", ...style }}>
      <Col style={{ textAlign: align }}>
        <Space orientation="vertical" size={2}>
          <Title orientation={level} level={level} style={{ margin: 0, fontWeight: 700, color: "#002766" }}>
            {text} {item && <span style={{ color: "#1677ff" }}>{item}</span>}
          </Title>
          {subtitle && (
            <Text type="secondary" style={{ fontSize: "13px" }}>
              {subtitle}
            </Text>
          )}
        </Space>
      </Col>
    </Row>
  );
};

export default React.memo(SPTitle);

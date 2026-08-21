import React from "react";
import { Card, Typography, Space } from "antd";

const { Title } = Typography;

const DashboardCardSection = ({
  icon,
  title,
  extra,
  children,
  style = {},
  bodyStyle = {},
  loading = false
}) => {
  return (
    <Card
      loading={loading}
      title={
        <Space align="center" size={8}>
          {icon && <span style={{ color: "#1677ff", fontSize: "16px", display: "flex" }}>{icon}</span>}
          <Title level={5} style={{ margin: 0, fontWeight: 600, color: "#1f1f1f" }}>
            {title}
          </Title>
        </Space>
      }
      extra={extra}
      style={{
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
        border: "1px solid #e8e8e8",
        marginBottom: "16px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        ...style
      }}
      bodyStyle={{
        flex: 1,
        padding: "16px",
        overflow: "auto",
        ...bodyStyle
      }}
    >
      {children}
    </Card>
  );
};

export default React.memo(DashboardCardSection);

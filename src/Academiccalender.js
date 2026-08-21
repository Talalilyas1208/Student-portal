import React from "react";
import { Card, Typography, Space, Tag, Row, Col } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import SPCalendar from "./Components/SPcalender";

const { Title, Text } = Typography;

export default function Academiccalender() {
  const { calendarEvents } = useSelector((state) => state.portal);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Card
        title={
          <Space align="center">
            <CalendarOutlined style={{ color: "#1677ff", fontSize: "18px" }} />
            <Title level={4} style={{ margin: 0, color: "#002766" }}>
              University Academic Calendar (2026 - 2027)
            </Title>
          </Space>
        }
        extra={
          <Space wrap size={[6, 6]}>
            <Tag color="success">Term Start / Orientation</Tag>
            <Tag color="processing">Hackathons & Exhibits</Tag>
            <Tag color="warning">Deadlines & Registrations</Tag>
            <Tag color="error">Examinations</Tag>
          </Space>
        }
        style={{ borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}
      >
        <SPCalendar events={calendarEvents} fullscreen={true} bordered={false} />
      </Card>
    </div>
  );
}

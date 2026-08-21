import React from "react";
import { Space, Avatar, Typography, Tag } from "antd";
import image from "../Images/images.jpg";

const { Text } = Typography;

export default function SPstudentinfo({ name = "Talal Ilyas", status = "Active", department = "Computer Science" }) {
  return (
    <Space align="start" style={{ padding: "12px", background: "#f5f5f5", borderRadius: "8px", width: "100%" }}>
      <Avatar
        shape="circle"
        src={image}
        size={54}
        style={{ border: "2px solid #1677ff" }}
      />
      <Space direction="vertical" size={2}>
        <Text strong style={{ fontSize: "14px" }}>{name}</Text>
        <Text type="secondary" style={{ fontSize: "12px" }}>{department}</Text>
        <Tag color={status === "Active" ? "success" : "warning"} style={{ margin: 0, fontSize: "10px" }}>
          {status}
        </Tag>
      </Space>
    </Space>
  );
}

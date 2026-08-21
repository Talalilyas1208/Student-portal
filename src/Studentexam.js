import React from "react";
import { Tag, Typography, Space } from "antd";
import { ClockCircleOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { SPtable } from "./Components";

const { Text } = Typography;

export default function Studentexam() {
  const { exams, loading } = useSelector((state) => state.portal);

  const columns = [
    {
      title: "Course Subject",
      dataIndex: "course_subject",
      key: "course_subject",
      render: (text) => <Text strong style={{ color: "#1f1f1f" }}>{text}</Text>
    },
    {
      title: "Exam Type",
      dataIndex: "exam_type",
      key: "exam_type",
      render: (type) => {
        const isLab = type?.toLowerCase().includes("practical") || type?.toLowerCase().includes("lab");
        const isProject = type?.toLowerCase().includes("project") || type?.toLowerCase().includes("viva");
        return (
          <Tag color={isLab ? "cyan" : isProject ? "purple" : "blue"} style={{ fontWeight: 500 }}>
            {type}
          </Tag>
        );
      }
    },
    {
      title: "Date & Time",
      dataIndex: "exam_date_time",
      key: "exam_date_time",
      render: (dateTime) => (
        <Space size={4}>
          <ClockCircleOutlined style={{ color: "#1677ff", fontSize: "12px" }} />
          <Text style={{ fontSize: "12px" }}>{dateTime}</Text>
        </Space>
      )
    },
    {
      title: "Venue / Room",
      dataIndex: "venue",
      key: "venue",
      render: (venue) => (
        <Space size={4}>
          <EnvironmentOutlined style={{ color: "#52c41a", fontSize: "12px" }} />
          <Text style={{ fontSize: "12px" }}>{venue || "Main Examination Hall"}</Text>
        </Space>
      )
    }
  ];

  return (
    <SPtable
      data={exams || []}
      columns={columns}
      pagination={false}
      loading={loading}
      size="middle"
      bordered={false}
      rowKey="id"
    />
  );
}
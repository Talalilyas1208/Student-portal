import React, { useState } from "react";
import { Row, Col, Typography, Card, Tag, Table, Button, Space, Input, Modal, message } from "antd";
import {
  TeamOutlined,
  BookOutlined,
  CheckCircleOutlined,
  NotificationOutlined,
  PlusOutlined,
  EditOutlined
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { addAnnouncement } from "./redux/slices/portalSlice";
import SPStatCard from "./Components/SPStatCard";
import DashboardCardSection from "./Components/DashboardCardSection";
import SPtable from "./Components/Sptable";

const { Title, Text } = Typography;

export default function Teacherdashboardoverveiw() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { teacherCourses, announcements } = useSelector((state) => state.portal);
  const [announcementModal, setAnnouncementModal] = useState(false);
  const [announcementText, setAnnouncementText] = useState("");

  const handlePostAnnouncement = () => {
    if (!announcementText.trim()) {
      message.warning("Please enter announcement text");
      return;
    }
    dispatch(addAnnouncement(announcementText));
    message.success("Campus announcement posted successfully!");
    setAnnouncementText("");
    setAnnouncementModal(false);
  };

  const studentGradingData = [
    { key: "1", id: "SP-8812", name: "Talal Ilyas", course: "Data Structures", score: 92, grade: "A", status: "Submitted" },
    { key: "2", id: "SP-8813", name: "Sara Ahmed", course: "Data Structures", score: 86, grade: "A-", status: "Submitted" },
    { key: "3", id: "SP-8814", name: "Hamza Tariq", course: "Database Systems", score: 79, grade: "B+", status: "Graded" },
    { key: "4", id: "SP-8815", name: "Ayesha Malik", course: "Software Engineering", score: 95, grade: "A+", status: "Graded" },
    { key: "5", id: "SP-8816", name: "Bilal Hassan", course: "Database Systems", score: 72, grade: "B", status: "Pending Review" }
  ];

  const gradingColumns = [
    { title: "Student ID", dataIndex: "id", key: "id", render: (t) => <Text strong style={{ color: "#722ed1" }}>{t}</Text> },
    { title: "Student Name", dataIndex: "name", key: "name" },
    { title: "Enrolled Course", dataIndex: "course", key: "course" },
    { title: "Score", dataIndex: "score", key: "score", align: "center", render: (s) => <span>{s}/100</span> },
    {
      title: "Grade",
      dataIndex: "grade",
      key: "grade",
      align: "center",
      render: (g) => <Tag color={g.startsWith("A") ? "green" : "blue"}>{g}</Tag>
    },
    {
      title: "Evaluation Status",
      dataIndex: "status",
      key: "status",
      render: (st) => <Tag color={st === "Pending Review" ? "warning" : "success"}>{st}</Tag>
    }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div>
        <Title level={4} style={{ margin: "0 0 4px", color: "#120338" }}>
          Welcome back, {user?.name || "Professor"}! 👩‍🏫
        </Title>
        <Text type="secondary">
          Academic Faculty Portal - Fall 2026 Course Management & Grading Overview
        </Text>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <SPStatCard
            title="Total Active Students"
            value={142}
            prefix={<TeamOutlined />}
            color="#722ed1"
            tagText="Across 3 Sections"
            tagColor="purple"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <SPStatCard
            title="Assigned Courses"
            value={teacherCourses?.length || 3}
            prefix={<BookOutlined />}
            color="#1677ff"
            tagText="12 Credit Hours"
            tagColor="blue"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <SPStatCard
            title="Class Average Score"
            value="87.9%"
            prefix={<CheckCircleOutlined />}
            color="#52c41a"
            tagText="+3.2% vs Last Term"
            tagColor="green"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <SPStatCard
            title="Active Announcements"
            value={announcements?.length || 6}
            prefix={<NotificationOutlined />}
            color="#fa8c16"
            tagText="Broadcast to Campus"
            tagColor="orange"
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <DashboardCardSection
            icon={<BookOutlined />}
            title="Assigned Courses & Enrollment"
            extra={
              <Button
                type="primary"
                size="small"
                icon={<PlusOutlined />}
                onClick={() => setAnnouncementModal(true)}
                style={{ backgroundColor: "#722ed1" }}
              >
                Post Notice
              </Button>
            }
          >
            <Table
              dataSource={teacherCourses}
              rowKey="id"
              pagination={false}
              size="middle"
              columns={[
                { title: "Course Code", dataIndex: "id", key: "id", render: (t) => <Text strong>{t}</Text> },
                { title: "Course Name", dataIndex: "name", key: "name" },
                { title: "Section", dataIndex: "section", key: "section", render: (s) => <Tag color="purple">{s}</Tag> },
                { title: "Students", dataIndex: "students", key: "students", align: "center" },
                { title: "Class Avg", dataIndex: "averageScore", key: "averageScore", align: "center", render: (a) => `${a}%` }
              ]}
            />
          </DashboardCardSection>
        </Col>

        <Col xs={24} lg={8}>
          <DashboardCardSection icon={<NotificationOutlined />} title="Recent Notices & Bulletins">
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {announcements?.slice(0, 4).map((ann) => (
                <Card
                  key={ann.id}
                  size="small"
                  style={{ backgroundColor: "#fafafa", borderRadius: "8px", border: "1px solid #f0f0f0" }}
                >
                  <Text style={{ fontSize: "13px" }}>{ann.announcement_text}</Text>
                </Card>
              ))}
            </div>
          </DashboardCardSection>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <DashboardCardSection icon={<TeamOutlined />} title="Student Submissions & Evaluation Queue">
            <SPtable
              data={studentGradingData}
              columns={gradingColumns}
              pagination={{ pageSize: 5 }}
              bordered={false}
              rowKey="key"
            />
          </DashboardCardSection>
        </Col>
      </Row>

      {/* Post Notice Modal */}
      <Modal
        title="Post New Campus Announcement"
        open={announcementModal}
        onOk={handlePostAnnouncement}
        onCancel={() => setAnnouncementModal(false)}
        okText="Publish Notice"
      >
        <div style={{ marginTop: 12 }}>
          <Input.TextArea
            rows={4}
            placeholder="Type announcement or notification for all students..."
            value={announcementText}
            onChange={(e) => setAnnouncementText(e.target.value)}
          />
        </div>
      </Modal>
    </div>
  );
}
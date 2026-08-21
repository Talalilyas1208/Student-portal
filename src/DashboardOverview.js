import React from "react";
import { Row, Col, Typography, Tag, Space, Button, List } from "antd";
import {
  UnorderedListOutlined,
  CalendarOutlined,
  NotificationOutlined,
  ClockCircleOutlined,
  TrophyOutlined,
  BookOutlined,
  CheckCircleOutlined,
  RightOutlined
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DashboardCardSection from "./Components/DashboardCardSection";
import SPStatCard from "./Components/SPStatCard";
import SPCalendar from "./Components/SPcalender";
import CourseTable from "./CourseTable";
import Studentexam from "./Studentexam";

const { Text } = Typography;

export default function DashboardOverview() {
  const navigate = useNavigate();
  const { announcements, calendarEvents, courses, exams, loading } = useSelector(
    (state) => state.portal
  );
  const { user } = useSelector((state) => state.auth);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Welcome Banner & Top Statistics */}
      <div style={{ marginBottom: 4 }}>
        <Typography.Title level={4} style={{ margin: "0 0 4px", color: "#002766" }}>
          Welcome back, {user?.name || "Talal Ilyas"}! 🎓
        </Typography.Title>
        <Text type="secondary">
          Here is your academic summary and schedule for Fall 2026 semester.
        </Text>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <SPStatCard
            title="Current CGPA"
            value={user?.cgpa || "3.84"}
            prefix={<TrophyOutlined />}
            color="#52c41a"
            tagText="Top 5% of Class"
            tagColor="green"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <SPStatCard
            title="Enrolled Courses"
            value={courses?.length || 6}
            prefix={<BookOutlined />}
            color="#1677ff"
            tagText="18 Credit Hours"
            tagColor="blue"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <SPStatCard
            title="Lecture Attendance"
            value={user?.attendance || "94.5%"}
            prefix={<CheckCircleOutlined />}
            color="#722ed1"
            tagText="Excellent Standing"
            tagColor="purple"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <SPStatCard
            title="Upcoming Exams"
            value={exams?.length || 5}
            prefix={<ClockCircleOutlined />}
            color="#fa8c16"
            tagText="Starting Sept 12"
            tagColor="orange"
          />
        </Col>
      </Row>

      {/* Main Content Grid */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <DashboardCardSection
            icon={<UnorderedListOutlined />}
            title="My Registered Courses"
            extra={
              <Button
                type="link"
                size="small"
                onClick={() => navigate("/studentdashboard/mycourse")}
                style={{ padding: 0 }}
              >
                View All <RightOutlined />
              </Button>
            }
          >
            <CourseTable useCard={false} pagination={{ pageSize: 4 }} />
          </DashboardCardSection>
        </Col>

        <Col xs={24} lg={8}>
          <DashboardCardSection
            icon={<CalendarOutlined />}
            title="Academic Calendar"
            extra={
              <Button
                type="link"
                size="small"
                onClick={() => navigate("/studentdashboard/academiccalendar")}
                style={{ padding: 0 }}
              >
                Full Calendar <RightOutlined />
              </Button>
            }
          >
            <SPCalendar
              events={calendarEvents}
              fullscreen={false}
              bordered={false}
              style={{ padding: 0 }}
            />
          </DashboardCardSection>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <DashboardCardSection
            icon={<ClockCircleOutlined />}
            title="Upcoming Exam Schedule"
            extra={
              <Tag color="volcano" style={{ margin: 0 }}>
                Fall 2026
              </Tag>
            }
          >
            <Studentexam />
          </DashboardCardSection>
        </Col>

        <Col xs={24} lg={8}>
          <DashboardCardSection
            icon={<NotificationOutlined />}
            title="Campus Announcements"
            loading={loading}
          >
            <List
              itemLayout="horizontal"
              dataSource={announcements || []}
              renderItem={(item) => (
                <List.Item style={{ padding: "10px 0" }}>
                  <List.Item.Meta
                    avatar={
                      <div
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          backgroundColor: "#1677ff",
                          marginTop: 6
                        }}
                      />
                    }
                    title={
                      <Text style={{ fontSize: "13px", fontWeight: 500 }}>
                        {item.announcement_text}
                      </Text>
                    }
                  />
                </List.Item>
              )}
            />
          </DashboardCardSection>
        </Col>
      </Row>
    </div>
  );
}
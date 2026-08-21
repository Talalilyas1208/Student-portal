import React from "react";
import { Row, Col, Card, Typography, Progress, Space, Tag, Divider, Table } from "antd";
import { CheckCircleOutlined, TrophyOutlined, BookOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const { Title, Text } = Typography;

export default function Myprogress() {
  const { progress, courses } = useSelector((state) => state.portal);
  const { user } = useSelector((state) => state.auth);

  const totalCredits = 128;
  const completedCredits = 99;
  const degreePercentage = Math.round((completedCredits / totalCredits) * 100);

  const twoColors = { "0%": "#108ee9", "100%": "#52c41a" };
  const highColors = { "0%": "#52c41a", "100%": "#13c2c2" };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Degree Overview Card */}
      <Card
        style={{
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
          background: "linear-gradient(135deg, #001529 0%, #003a8c 100%)",
          color: "white"
        }}
        bodyStyle={{ padding: "24px 28px" }}
      >
        <Row gutter={[24, 24]} align="middle">
          <Col xs={24} md={16}>
            <Space orientation="vertical" size={6} style={{ width: "100%" }}>
              <Tag color="cyan" style={{ fontSize: "12px", padding: "2px 8px" }}>
                Degree Audit - BS Computer Science
              </Tag>
              <Title level={3} style={{ color: "#ffffff", margin: 0 }}>
                {user?.name || "Talal Ilyas"} - {degreePercentage}% Completed
              </Title>
              <Text style={{ color: "#d6e4ff", fontSize: "14px" }}>
                You have completed <strong style={{ color: "#fff" }}>{completedCredits}</strong> of{" "}
                <strong style={{ color: "#fff" }}>{totalCredits}</strong> total credit hours required for graduation.
              </Text>
              <div style={{ marginTop: 12 }}>
                <Progress
                  percent={degreePercentage}
                  strokeColor={{
                    "0%": "#4096ff",
                    "100%": "#52c41a"
                  }}
                  trailColor="rgba(255,255,255,0.2)"
                  strokeWidth={14}
                  style={{ color: "#ffffff" }}
                />
              </div>
            </Space>
          </Col>
          <Col xs={24} md={8} style={{ textAlign: "center" }}>
            <div
              style={{
                backgroundColor: "rgba(255,255,255,0.1)",
                borderRadius: "12px",
                padding: "16px",
                backdropFilter: "blur(4px)"
              }}
            >
              <TrophyOutlined style={{ fontSize: "32px", color: "#ffd666", marginBottom: 8 }} />
              <div style={{ fontSize: "22px", fontWeight: 700, color: "#ffffff" }}>
                CGPA: {user?.cgpa || "3.84"}
              </div>
              <Text style={{ color: "#bae0ff", fontSize: "12px" }}>High Honors Standing</Text>
            </div>
          </Col>
        </Row>
      </Card>

      {/* Module Breakdown Circles */}
      <Card
        title={
          <Space align="center">
            <BookOutlined style={{ color: "#1677ff" }} />
            <Title level={4} style={{ margin: 0, color: "#002766" }}>
              Core Knowledge & Specialization Areas
            </Title>
          </Space>
        }
        style={{ borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}
      >
        <Row gutter={[24, 24]} justify="center">
          {progress?.map((item) => (
            <Col xs={24} sm={12} md={8} lg={4} key={item.id} style={{ textAlign: "center" }}>
              <div
                style={{
                  padding: "16px 12px",
                  borderRadius: "10px",
                  border: "1px solid #f0f0f0",
                  backgroundColor: "#fafafa",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <Progress
                  type="circle"
                  percent={item.percent}
                  size={90}
                  strokeColor={item.percent >= 90 ? highColors : twoColors}
                />
                <div style={{ marginTop: 12 }}>
                  <Text strong style={{ fontSize: "13px", display: "block", marginBottom: 4 }}>
                    {item.name}
                  </Text>
                  <Tag color={item.percent >= 90 ? "success" : "processing"}>
                    {item.creditsCompleted || 20}/{item.totalCredits || 24} Credits
                  </Tag>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Card>
    </div>
  );
}

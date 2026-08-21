import React, { useState } from "react";
import { Row, Col, Card, Typography, Modal, Button, Tag, Space, List } from "antd";
import { ReadOutlined, FilePdfOutlined, VideoCameraOutlined, LinkOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import SPTitle from "./Components/SpTitle";
import SPButton from "./Components/SPButton";

const { Title, Text, Paragraph } = Typography;

export default function Studycard() {
  const { studyCards } = useSelector((state) => state.portal);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const handleExplore = (item) => {
    setSelectedTopic(item);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <Title level={3} style={{ margin: 0, color: "#002766" }}>
            Curated Study Cards & Knowledge Tracks
          </Title>
          <Text type="secondary">
            Access curated lecture notes, reference architectures, and past examination papers.
          </Text>
        </div>
      </div>

      <Row gutter={[16, 16]}>
        {studyCards?.map((item) => (
          <Col xs={24} sm={12} md={8} lg={8} key={item.id}>
            <Card
              hoverable
              style={{
                borderRadius: "12px",
                borderTop: `4px solid ${item.color || "#1677ff"}`,
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
              bodyStyle={{
                padding: "20px",
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <Title level={5} style={{ margin: 0, color: "#1f1f1f" }}>
                    {item.label}
                  </Title>
                  <Tag color={item.color || "blue"}>{item.resources || 10} Resources</Tag>
                </div>
                <Paragraph type="secondary" ellipsis={{ rows: 2 }} style={{ fontSize: "13px", marginBottom: 16 }}>
                  {item.description || "In-depth academic modules, practice questions, and reference cheat sheets."}
                </Paragraph>
              </div>

              <SPButton
                type="primary"
                ghost
                onClick={() => handleExplore(item)}
                icon={<ReadOutlined />}
                style={{ borderRadius: "6px" }}
              >
                Explore Syllabus & Notes
              </SPButton>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Topic Details Modal */}
      <Modal
        title={
          <Space>
            <ReadOutlined style={{ color: selectedTopic?.color || "#1677ff" }} />
            <span>{selectedTopic?.label} - Learning Resources</span>
          </Space>
        }
        open={Boolean(selectedTopic)}
        onCancel={() => setSelectedTopic(null)}
        footer={[
          <Button key="close" type="primary" onClick={() => setSelectedTopic(null)}>
            Close
          </Button>
        ]}
      >
        <div style={{ padding: "12px 0" }}>
          <Paragraph>{selectedTopic?.description}</Paragraph>
          <Title level={5} style={{ marginTop: 16, marginBottom: 8 }}>
            Available Course Materials:
          </Title>
          <List
            size="small"
            bordered
            dataSource={[
              { title: "Lecture Notes & Slides (PDF)", icon: <FilePdfOutlined style={{ color: "#ff4d4f" }} /> },
              { title: "Recorded Video Workshop (2h 15m)", icon: <VideoCameraOutlined style={{ color: "#1677ff" }} /> },
              { title: "Sample Exam Questions with Solutions", icon: <FilePdfOutlined style={{ color: "#52c41a" }} /> },
              { title: "Recommended Textbooks & External References", icon: <LinkOutlined style={{ color: "#722ed1" }} /> }
            ]}
            renderItem={(res) => (
              <List.Item>
                <Space>
                  {res.icon}
                  <Text>{res.title}</Text>
                </Space>
              </List.Item>
            )}
          />
        </div>
      </Modal>
    </div>
  );
}

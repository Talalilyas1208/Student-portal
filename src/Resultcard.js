import React, { useState } from "react";
import { Form, Row, Col, Typography, Divider, Card, message, Modal, Descriptions, Tag } from "antd";
import { CheckCircleFilled, PrinterOutlined, SendOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { submitResultRecord } from "./redux/slices/portalSlice";
import SPpersonalInfo from "./Components/Sppersonalinfo";
import ResultInfo from "./Components/ResultInfo";
import SPButton from "./Components/SPButton";

const { Title, Text } = Typography;

export default function Resultcard() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const { user } = useSelector((state) => state.auth);

  const handleFormSubmit = async (values) => {
    setSubmitting(true);
    try {
      await dispatch(submitResultRecord(values));
      message.success("Academic Result Card submitted and recorded successfully!");
      setSubmittedData(values);
      form.resetFields();
    } catch {
      message.error("Failed to submit result.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Row justify="center" style={{ padding: "10px 0" }}>
      <Col xs={24} sm={22} md={18} lg={14} xl={12}>
        <Card
          style={{
            borderRadius: "12px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
            border: "1px solid #e8e8e8"
          }}
          bodyStyle={{ padding: "32px 28px" }}
        >
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <Title level={3} style={{ margin: 0, color: "#002766", fontWeight: 700 }}>
              Student Examination & Result Card
            </Title>
            <Text type="secondary">
              Official University Evaluation & Grade Recording Entry
            </Text>
          </div>

          <Divider style={{ margin: "16px 0 24px" }} />

          <Form
            form={form}
            layout="vertical"
            onFinish={handleFormSubmit}
            initialValues={{
              firstName: user?.name ? user.name.split(" ")[0] : "Talal",
              lastName: user?.name ? user.name.split(" ").slice(1).join(" ") : "Ilyas",
              studentId: user?.studentId || "SP-2026-8812",
              email: user?.email || "talal.ilyas@university.edu",
              classNumber: 13,
              grade: "A+",
              cgpa: "3.80"
            }}
          >
            <SPpersonalInfo />
            <ResultInfo form={form} />

            <div style={{ marginTop: 24 }}>
              <SPButton
                loading={submitting}
                icon={<SendOutlined />}
                size="large"
                type="primary"
                block
                style={{ height: "44px", fontSize: "15px" }}
              >
                Submit & Record Result Card
              </SPButton>
            </div>
          </Form>
        </Card>

        {/* Confirmation Modal */}
        <Modal
          title={
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#52c41a" }}>
              <CheckCircleFilled style={{ fontSize: "20px" }} />
              <span>Result Card Submitted Successfully</span>
            </div>
          }
          open={Boolean(submittedData)}
          onOk={() => setSubmittedData(null)}
          onCancel={() => setSubmittedData(null)}
          okText="Done"
          cancelButtonProps={{ style: { display: "none" } }}
        >
          <Descriptions bordered size="small" column={1} style={{ marginTop: 16 }}>
            <Descriptions.Item label="Student Name">
              {submittedData?.firstName} {submittedData?.lastName}
            </Descriptions.Item>
            <Descriptions.Item label="Student ID">{submittedData?.studentId}</Descriptions.Item>
            <Descriptions.Item label="Level / Class">{submittedData?.classNumber}</Descriptions.Item>
            <Descriptions.Item label="Teacher / Examiner">
              {submittedData?.teacher || "Faculty Incharge"}
            </Descriptions.Item>
            <Descriptions.Item label="Performance">
              <Tag color="green">
                {submittedData?.cgpa ? `CGPA: ${submittedData.cgpa}` : `Grade: ${submittedData?.grade}`}
              </Tag>
            </Descriptions.Item>
          </Descriptions>
        </Modal>
      </Col>
    </Row>
  );
}

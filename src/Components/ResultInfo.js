import React, { useState } from "react";
import { Form, Select, Row, Col, Typography, Card, Space, Tag } from "antd";

const { Text } = Typography;

const ResultInfo = ({ form }) => {
  const [classNumber, setClassNumber] = useState(4);
  const [resultType, setResultType] = useState("Final Result");
  const [teacherOptions, setTeacherOptions] = useState([
    { value: "Dr. Asad Malik", label: "Dr. Asad Malik (CS)" },
    { value: "Prof. Ahmad Raza", label: "Prof. Ahmad Raza (Math)" },
    { value: "Dr. Syed Tanveer", label: "Dr. Syed Tanveer (EE)" }
  ]);

  const classOptions = Array.from({ length: 13 }, (_, i) => ({
    label: i + 4 <= 12 ? `Grade / Class ${i + 4}` : `Semester ${i - 8} (University)`,
    value: i + 4
  }));

  const handleClassChange = (value) => {
    setClassNumber(value);
    const newResultType = value <= 12 ? "School / Intermediate Exam" : "University Semester Exam";
    setResultType(newResultType);

    let options = [];
    if (value >= 4 && value <= 6) {
      options = [
        { value: "Dr. Asad Malik", label: "Dr. Asad Malik" },
        { value: "Prof. Ahmad Raza", label: "Prof. Ahmad Raza" },
        { value: "Dr. Syed Tanveer", label: "Dr. Syed Tanveer" }
      ];
    } else if (value >= 7 && value <= 10) {
      options = [
        { value: "Prof. Maryam Bilal", label: "Prof. Maryam Bilal" },
        { value: "Dr. Iqbal Murad", label: "Dr. Iqbal Murad" },
        { value: "Prof. Abdullah", label: "Prof. Abdullah" }
      ];
    } else if (value >= 11 && value <= 12) {
      options = [
        { value: "Prof. Sarfaraz Arshad", label: "Prof. Sarfaraz Arshad" },
        { value: "Dr. Ayesha Khan", label: "Dr. Ayesha Khan" }
      ];
    } else {
      options = [
        { value: "Dr. Ali Hamza", label: "Dr. Ali Hamza (Department Head)" },
        { value: "Prof. Dr. Maryam Bilal", label: "Prof. Dr. Maryam Bilal (Faculty Advisor)" },
        { value: "Dr. Asad Malik", label: "Dr. Asad Malik (Course Lead)" }
      ];
    }
    setTeacherOptions(options);

    if (form) {
      form.setFieldsValue({
        resultType: newResultType,
        teacher: undefined,
        grade: undefined,
        cgpa: undefined
      });
    }
  };

  return (
    <Card
      type="inner"
      title={<Text strong>Academic Performance & Evaluation</Text>}
      style={{ marginBottom: 16, borderRadius: "8px" }}
    >
      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Class / Semester Level"
            name="classNumber"
            initialValue={4}
            rules={[{ required: true, message: "Please select academic level!" }]}
          >
            <Select
              placeholder="Select class or semester"
              options={classOptions}
              value={classNumber}
              onChange={handleClassChange}
            />
          </Form.Item>
        </Col>

        {classNumber <= 12 ? (
          <Col xs={24} sm={12}>
            <Form.Item
              label="Obtained Grade"
              name="grade"
              rules={[{ required: true, message: "Please select grade!" }]}
            >
              <Select
                placeholder="Select grade"
                options={[
                  { value: "A+", label: "A+ (90-100%)" },
                  { value: "A", label: "A (80-89%)" },
                  { value: "B+", label: "B+ (70-79%)" },
                  { value: "B", label: "B (60-69%)" },
                  { value: "C", label: "C (50-59%)" },
                  { value: "Pass", label: "Pass (40-49%)" }
                ]}
              />
            </Form.Item>
          </Col>
        ) : (
          <Col xs={24} sm={12}>
            <Form.Item
              label="Semester CGPA / GPA"
              name="cgpa"
              rules={[{ required: true, message: "Please select CGPA!" }]}
            >
              <Select
                placeholder="Select CGPA"
                options={[
                  { value: "4.00", label: "4.00 (Distinction)" },
                  { value: "3.80", label: "3.80 (High Honors)" },
                  { value: "3.50", label: "3.50 (Honors)" },
                  { value: "3.20", label: "3.20 (Good Standing)" },
                  { value: "3.00", label: "3.00 (Satisfactory)" },
                  { value: "2.50", label: "2.50 (Pass)" }
                ]}
              />
            </Form.Item>
          </Col>
        )}
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Assigned Instructor / Examiner"
            name="teacher"
            rules={[{ required: true, message: "Please select instructor!" }]}
          >
            <Select placeholder="Select instructor" options={teacherOptions} />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12}>
          <Form.Item label="Evaluation Type">
            <Space orientation="vertical" style={{ width: "100%", paddingTop: 4 }}>
              <Tag color="geekblue" style={{ fontSize: "12px", padding: "4px 8px" }}>
                {resultType}
              </Tag>
            </Space>
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );
};

export default React.memo(ResultInfo);

import React, { useMemo } from "react";
import { Typography, Card, Tag, Badge, Tooltip } from "antd";
import { useSelector } from "react-redux";
import { SPtable } from "./Components";

const { Title, Text } = Typography;

export default function CourseTable({
  title = "Course Catalogue",
  pagination = { pageSize: 6 },
  useCard = false,
  bordered = true
}) {
  const { courses, loading } = useSelector((state) => state.portal);
  const searchQuery = useSelector((state) => state.ui.searchQuery);

  const filteredCourses = useMemo(() => {
    if (!courses || !Array.isArray(courses)) return [];
    if (!searchQuery) return courses;
    const query = searchQuery.toLowerCase();
    return courses.filter(
      (c) =>
        c.course_title?.toLowerCase().includes(query) ||
        String(c.course_id)?.toLowerCase().includes(query) ||
        c.instructor?.toLowerCase().includes(query)
    );
  }, [courses, searchQuery]);

  const columns = [
    {
      title: "Course ID",
      dataIndex: "course_id",
      key: "course_id",
      width: 110,
      render: (text) => <Text strong style={{ color: "#1677ff" }}>{text}</Text>,
      sorter: (a, b) => String(a.course_id).localeCompare(String(b.course_id))
    },
    {
      title: "Course Title",
      dataIndex: "course_title",
      key: "course_title",
      render: (text, record) => (
        <div>
          <Text strong style={{ fontSize: "13px" }}>{text}</Text>
          {record.instructor && (
            <Text type="secondary" style={{ display: "block", fontSize: "11px" }}>
              Instructor: {record.instructor}
            </Text>
          )}
        </div>
      ),
      sorter: (a, b) => (a.course_title || "").localeCompare(b.course_title || "")
    },
    {
      title: "Credits",
      dataIndex: "Credits",
      key: "Credits",
      width: 90,
      align: "center",
      render: (val) => <Tag color="geekblue">{val || 3} Cr</Tag>,
      sorter: (a, b) => (a.Credits || 0) - (b.Credits || 0)
    },
    {
      title: "GPA / Awarded",
      dataIndex: "awarded",
      key: "awarded",
      width: 120,
      align: "center",
      render: (val) => (
        <span style={{ fontWeight: 600, color: val >= 3.5 ? "#52c41a" : "#faad14" }}>
          {val ? Number(val).toFixed(2) : "3.50"} / 4.0
        </span>
      ),
      sorter: (a, b) => (a.awarded || 0) - (b.awarded || 0)
    },
    {
      title: "Score & Grade",
      dataIndex: "score",
      key: "score",
      width: 140,
      align: "center",
      render: (scoreVal, record) => {
        const score = scoreVal !== undefined ? scoreVal : 85;
        const grade = record.grade || (score >= 90 ? "A+" : score >= 80 ? "A" : score >= 70 ? "B" : "C");
        const color = score >= 85 ? "green" : score >= 70 ? "blue" : score >= 50 ? "gold" : "red";
        return (
          <Tooltip title={`Raw Score: ${score}/100`}>
            <Tag color={color} style={{ fontWeight: 600, padding: "2px 8px" }}>
              {grade} ({score}%)
            </Tag>
          </Tooltip>
        );
      },
      sorter: (a, b) => (a.score || 0) - (b.score || 0)
    }
  ];

  const tableContent = (
    <SPtable
      data={filteredCourses}
      columns={columns}
      pagination={pagination}
      loading={loading}
      bordered={bordered}
      rowKey="course_id"
    />
  );

  if (useCard) {
    return (
      <Card
        title={title ? <Title level={4} style={{ margin: 0, color: "#002766" }}>{title}</Title> : null}
        style={{ borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
      >
        {tableContent}
      </Card>
    );
  }

  return tableContent;
}

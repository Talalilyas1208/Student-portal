import React from "react";
import { Avatar, Typography, Skeleton, Tag, Tooltip } from "antd";
import { UserOutlined } from "@ant-design/icons";
import defaultImage from "../Images/images.jpg";

const { Text, Title } = Typography;

const SPHeader = ({ collapsed = false, profile = {}, loading = false, role = "student" }) => {
  const userName = profile?.name || (role === "lecturer" ? "Prof. Dr. Maryam" : "Student User");
  const userStatus = profile?.status || "Active";
  const userDept = profile?.department || (role === "lecturer" ? "Computer Science" : "BS Computer Science");

  if (loading) {
    return (
      <div style={{ padding: "16px", textAlign: "center" }}>
        <Skeleton.Avatar active size={collapsed ? "default" : "large"} shape="circle" />
        {!collapsed && <Skeleton active paragraph={{ rows: 1 }} title={{ width: 120 }} style={{ marginTop: 8 }} />}
      </div>
    );
  }

  if (collapsed) {
    return (
      <div style={{ padding: "16px 0", textAlign: "center" }}>
        <Tooltip title={`${userName} (${role.toUpperCase()})`} placement="right">
          <Avatar
            size={40}
            src={profile?.avatarUrl || defaultImage}
            icon={<UserOutlined />}
            style={{ border: "2px solid #1677ff" }}
          />
        </Tooltip>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "20px 16px 14px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        borderBottom: "1px solid #f0f0f0",
        background: "#fafafa"
      }}
    >
      <Avatar
        size={52}
        src={profile?.avatarUrl || defaultImage}
        icon={<UserOutlined />}
        style={{
          border: "2px solid #1677ff",
          flexShrink: 0,
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
        }}
      />
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
          <Title
            level={5}
            style={{
              margin: 0,
              fontSize: "14px",
              fontWeight: 600,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap"
            }}
          >
            {userName}
          </Title>
          <Tag color={role === "lecturer" ? "purple" : "blue"} style={{ margin: 0, fontSize: "10px", lineHeight: "16px", padding: "0 4px" }}>
            {role.toUpperCase()}
          </Tag>
        </div>
        <Text type="secondary" style={{ fontSize: "11px", display: "block", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {userDept}
        </Text>
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4 }}>
          <span
            style={{
              display: "inline-block",
              width: 7,
              height: 7,
              borderRadius: "50%",
              backgroundColor: userStatus === "Active" ? "#52c41a" : "#faad14"
            }}
          />
          <Text style={{ fontSize: "11px", color: userStatus === "Active" ? "#52c41a" : "#faad14", fontWeight: 500 }}>
            {userStatus}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SPHeader);

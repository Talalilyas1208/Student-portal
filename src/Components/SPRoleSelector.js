import React from "react";
import { Segmented, Row, Col } from "antd";
import { UserOutlined, TeamOutlined } from "@ant-design/icons";

const SPRoleSelector = ({ role = "student", onChange, style = {} }) => {
  return (
    <Row justify="center" style={{ margin: "16px 0", ...style }}>
      <Col>
        <Segmented
          size="large"
          value={role}
          onChange={onChange}
          options={[
            {
              label: "Student Portal",
              value: "student",
              icon: <UserOutlined />
            },
            {
              label: "Lecturer Portal",
              value: "lecturer",
              icon: <TeamOutlined />
            }
          ]}
          style={{
            padding: "4px",
            backgroundColor: "#f0f2f5",
            borderRadius: "8px",
            fontWeight: 500
          }}
        />
      </Col>
    </Row>
  );
};

export default React.memo(SPRoleSelector);

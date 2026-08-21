import React, { useState, useEffect } from "react";
import { Input } from "antd";
import { SearchOutlined, CloseCircleFilled } from "@ant-design/icons";

const SPsearch = ({ onSearch, placeholder = "Search courses, exams, announcements...", style = {} }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onSearch) {
        onSearch(value);
      }
    }, 250);
    return () => clearTimeout(timer);
  }, [value, onSearch]);

  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      prefix={<SearchOutlined style={{ color: "#1677ff", marginRight: 4 }} />}
      suffix={
        value ? (
          <CloseCircleFilled
            style={{ color: "#bfbfbf", cursor: "pointer", fontSize: 12 }}
            onClick={() => setValue("")}
          />
        ) : null
      }
      allowClear={false}
      style={{
        borderRadius: "8px",
        maxWidth: 360,
        width: "100%",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        ...style
      }}
    />
  );
};

export default React.memo(SPsearch);

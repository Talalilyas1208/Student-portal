import React from "react";
import { Card, Statistic, Space, Tag } from "antd";

const SPStatCard = ({
  title,
  value,
  prefix,
  suffix,
  icon,
  color = "#1677ff",
  tagText,
  tagColor = "blue",
  precision,
  style = {}
}) => {
  return (
    <Card
      hoverable
      style={{
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        border: "1px solid #f0f0f0",
        height: "100%",
        ...style
      }}
      bodyStyle={{ padding: "16px 20px" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <Statistic
            title={<span style={{ fontSize: "13px", color: "#8c8c8c", fontWeight: 500 }}>{title}</span>}
            value={value}
            prefix={prefix}
            suffix={suffix}
            precision={precision}
            valueStyle={{ color: "#141414", fontWeight: 700, fontSize: "24px" }}
          />
          {tagText && (
            <div style={{ marginTop: 6 }}>
              <Tag color={tagColor} style={{ borderRadius: "10px", fontSize: "11px" }}>
                {tagText}
              </Tag>
            </div>
          )}
        </div>
        {icon && (
          <div
            style={{
              backgroundColor: `${color}15`,
              color: color,
              width: 44,
              height: 44,
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px"
            }}
          >
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
};

export default React.memo(SPStatCard);

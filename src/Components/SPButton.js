import React from "react";
import { Button, Form } from "antd";

const SPButton = ({
  text,
  name,
  children,
  shape = "default",
  type = "primary",
  size = "middle",
  loading = false,
  disabled = false,
  icon,
  danger = false,
  ghost = false,
  block = true,
  htmlType = "submit",
  onClick,
  style = {},
  className = "",
  inFormItem = false
}) => {
  const content = children || text || name || "Submit";

  const buttonElement = (
    <Button
      type={type}
      shape={shape}
      size={size}
      loading={loading}
      disabled={disabled}
      icon={icon}
      danger={danger}
      ghost={ghost}
      block={block}
      htmlType={htmlType}
      onClick={onClick}
      style={{
        fontWeight: 500,
        borderRadius: shape === "round" ? "20px" : "6px",
        transition: "all 0.2s ease-in-out",
        ...style
      }}
      className={className}
    >
      {content}
    </Button>
  );

  if (inFormItem) {
    return <Form.Item style={{ marginBottom: 0 }}>{buttonElement}</Form.Item>;
  }

  return buttonElement;
};

export default React.memo(SPButton);

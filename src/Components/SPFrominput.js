import React from "react";
import { Form } from "antd";
import SPInput from "./SPInput";

const SPFormInput = ({
  label,
  name,
  rules,
  type = "text",
  value,
  onChange,
  placeholder,
  prefix,
  suffix,
  disabled = false,
  extra,
  tooltip,
  labelStyle = { color: "#ffffff" },
  formItemStyle = {},
  inputStyle = {}
}) => {
  return (
    <Form.Item
      label={label ? <span style={labelStyle}>{label}</span> : null}
      name={name}
      rules={rules}
      extra={extra}
      tooltip={tooltip}
      style={{ marginBottom: 16, ...formItemStyle }}
    >
      <SPInput
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        prefix={prefix}
        suffix={suffix}
        disabled={disabled}
        style={inputStyle}
      />
    </Form.Item>
  );
};

export default React.memo(SPFormInput);

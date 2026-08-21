import React, { forwardRef } from "react";
import { Input } from "antd";

const SPInput = forwardRef(({ type = "text", size = "middle", prefix, suffix, ...props }, ref) => {
  if (type === "password") {
    return <Input.Password ref={ref} size={size} prefix={prefix} suffix={suffix} {...props} />;
  }
  if (type === "textarea") {
    return <Input.TextArea ref={ref} size={size} {...props} />;
  }
  if (type === "search") {
    return <Input.Search ref={ref} size={size} prefix={prefix} suffix={suffix} {...props} />;
  }
  return <Input ref={ref} size={size} prefix={prefix} suffix={suffix} {...props} />;
});

SPInput.displayName = "SPInput";

export default React.memo(SPInput);

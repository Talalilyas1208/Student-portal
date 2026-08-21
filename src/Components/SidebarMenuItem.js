import React from "react";
import { useNavigate } from "react-router-dom";

// Helper that formats an item object for modern Ant Design 5 Menu items prop
export const createMenuItem = (key, label, icon, path, onClick) => {
  return {
    key: String(key),
    icon,
    label,
    onClick: onClick ? onClick : (navigate) => (path ? navigate(path) : null)
  };
};

const SidebarMenuItem = ({ label, icon, path, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) onClick();
    else if (path) navigate(path);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 16px",
        cursor: "pointer",
        borderRadius: "6px",
        transition: "all 0.2s"
      }}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
};

export default React.memo(SidebarMenuItem);

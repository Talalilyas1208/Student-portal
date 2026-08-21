import React, { useState } from "react";
import { Calendar, Badge, Modal, List, Typography, theme } from "antd";
import dayjs from "dayjs";

const { Text } = Typography;

const SPCalendar = ({
  events = [],
  fullscreen = false,
  bordered = true,
  onSelectDate,
  wrapperStyle = {},
  style = {}
}) => {
  const { token } = theme.useToken();
  const [selectedEventModal, setSelectedEventModal] = useState(null);

  const getEventsForDate = (dateVal) => {
    if (!Array.isArray(events) || events.length === 0) return [];
    const formatted = dayjs(dateVal).format("YYYY-MM-DD");
    return events.filter((ev) => ev.date === formatted);
  };

  const cellRender = (current, info) => {
    if (info.type !== "date") return info.originNode;
    const dateEvents = getEventsForDate(current);
    if (!dateEvents.length) return info.originNode;

    return (
      <div className="ant-picker-cell-inner ant-picker-calendar-date">
        <div className="ant-picker-calendar-date-value">{current.date()}</div>
        <div className="ant-picker-calendar-date-content" style={{ marginTop: 2 }}>
          {dateEvents.slice(0, 2).map((item, idx) => (
            <div
              key={idx}
              style={{
                fontSize: "11px",
                lineHeight: "14px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                margin: "1px 0"
              }}
            >
              <Badge status={item.type || "processing"} text={item.content} />
            </div>
          ))}
          {dateEvents.length > 2 && (
            <Text type="secondary" style={{ fontSize: "10px" }}>
              +{dateEvents.length - 2} more
            </Text>
          )}
        </div>
      </div>
    );
  };

  const handleSelect = (date) => {
    const dateEvents = getEventsForDate(date);
    if (dateEvents.length > 0 && !fullscreen) {
      setSelectedEventModal({
        date: date.format("MMMM D, YYYY"),
        events: dateEvents
      });
    }
    if (onSelectDate) onSelectDate(date);
  };

  const containerStyle = {
    width: "100%",
    border: bordered ? `1px solid ${token.colorBorderSecondary}` : "none",
    borderRadius: token.borderRadiusLG,
    padding: fullscreen ? 16 : 8,
    background: "#ffffff",
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
    ...wrapperStyle,
    ...style
  };

  return (
    <div style={containerStyle}>
      <Calendar
        fullscreen={fullscreen}
        cellRender={cellRender}
        onSelect={handleSelect}
      />
      <Modal
        title={`Events for ${selectedEventModal?.date}`}
        open={Boolean(selectedEventModal)}
        onCancel={() => setSelectedEventModal(null)}
        footer={null}
      >
        <List
          dataSource={selectedEventModal?.events || []}
          renderItem={(item) => (
            <List.Item>
              <Badge status={item.type || "processing"} text={<Text strong>{item.content}</Text>} />
            </List.Item>
          )}
        />
      </Modal>
    </div>
  );
};

export default React.memo(SPCalendar);

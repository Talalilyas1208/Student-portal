import React from "react";
import { Table, Empty, ConfigProvider } from "antd";

const SPTable = ({
  data = [],
  columns = [],
  pagination = { pageSize: 8, showSizeChanger: true },
  rowKey,
  size = "middle",
  bordered = true,
  loading = false,
  scroll = { x: "max-content" },
  rowClassName,
  onRow,
  onChange,
  style = {},
  title,
  footer,
  emptyText = "No records found"
}) => {
  // Safe rowKey resolver
  const resolveRowKey = (record, index) => {
    if (typeof rowKey === "function") return rowKey(record, index);
    if (typeof rowKey === "string" && record[rowKey] !== undefined) return record[rowKey];
    return record.course_id || record.id || record.key || `row-${index}`;
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: "#fafafa",
            headerColor: "#1d39c4",
            headerSortActiveBg: "#f0f5ff"
          }
        }
      }}
    >
      <Table
        dataSource={data}
        columns={columns}
        rowKey={resolveRowKey}
        pagination={
          pagination === false
            ? false
            : {
                pageSize: 8,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                ...pagination
              }
        }
        scroll={scroll}
        size={size}
        bordered={bordered}
        loading={loading}
        rowClassName={rowClassName}
        onRow={onRow}
        onChange={onChange}
        style={{ width: "100%", ...style }}
        title={title}
        footer={footer}
        locale={{
          emptyText: <Empty description={emptyText} image={Empty.PRESENTED_IMAGE_SIMPLE} />
        }}
      />
    </ConfigProvider>
  );
};

export default React.memo(SPTable);

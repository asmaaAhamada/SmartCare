import React from "react";
import { Spin, Typography } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const { Text } = Typography;

export const AnnouncementLoader = ({ color }) => {
  const antIcon = <LoadingOutlined style={{ fontSize: 42, color: color }} spin />;
  
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "300px", width: "100%" }}>
      <Spin indicator={antIcon} />
      <Text style={{ marginTop: "16px", color: "#666", fontSize: "15px", fontWeight: 500 }}>
        جاري تحميل آخر الإعلانات والأخبار الطبية...
      </Text>
    </div>
  );
};
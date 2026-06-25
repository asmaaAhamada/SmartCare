import React from "react";
import { Typography } from "antd";
import { FileImageOutlined } from "@ant-design/icons";

const { Text } = Typography;

export default function ImagePlaceholder({ height = "200px" }) {
  return (
    <div 
      style={{ 
        height: height, 
        backgroundColor: "#f7fafc", 
        display: "flex", 
        flexDirection: "column",
        justifyContent: "center", 
        alignItems: "center",
        borderBottom: "1px solid #edf2f7",
        gap: "8px"
      }}
    >
      <FileImageOutlined style={{ fontSize: "38px", color: "#cbd5e1" }} />
      <Text style={{ color: "#94a3b8", fontSize: "13px", fontWeight: 500 }}>
        لا يتوفر صورة لهذا الإعلان
      </Text>
    </div>
  );
}
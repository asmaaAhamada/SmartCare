import React from "react";
import { Typography, Space } from "antd";
import { NotificationOutlined } from "@ant-design/icons";

// التفكيك الصحيح لحل مشكلة الـ TypeError
const { Text } = Typography;

export const AnnouncementEmpty = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "350px", width: "100%", textAlign: "center", padding: "20px" }}>
      
      {/* ستايل الموشن المخصص لتأثير التصفن والالتفات */}
      <style>{`
        @keyframes ponderAndLook {
          0% { transform: rotate(0deg) translateX(0); }
          20% { transform: rotate(-8deg) translateX(-5px); }
          40% { transform: rotate(0deg) translateX(0); }
          60% { transform: rotate(8deg) translateX(5px); }
          80% { transform: rotate(0deg) translateX(0); }
          100% { transform: rotate(0deg) translateX(0); }
        }
        .pondering-icon {
          animation: ponderAndLook 3.5s ease-in-out infinite;
          display: inline-block;
        }
      `}</style>

      <div className="pondering-icon" style={{ marginBottom: "20px" }}>
        <NotificationOutlined style={{ fontSize: "70px", color: "#bfbfbf", filter: "drop-shadow(0px 4px 6px rgba(0,0,0,0.05))" }} />
      </div>

      <Space direction="vertical" size={4}>
        <Text strong style={{ fontSize: "18px", color: "#434343" }}>
          لا يوجد إعلانات حالياً
        </Text>
        <Text style={{ fontSize: "14px", color: "#8c8c8c", maxWidth: "400px", display: "block", lineHeight: "1.6" }}>
          أضف إعلانات إذا كنت ترغب بالضغط على الزر أعلاه لنشرها للمرضى والكادر الطبي.
        </Text>
      </Space>
    </div>
  );
};
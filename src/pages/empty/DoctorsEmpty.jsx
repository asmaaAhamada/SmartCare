import React from "react";
import { Typography, Space } from "antd";
import { MedicineBoxOutlined } from "@ant-design/icons";

const { Text } = Typography;

export default function DoctorsEmpty() {
  return (
    <div
      style={{
        padding: "50px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <style>{`
        @keyframes doctorFloat {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }

        .doctor-empty-icon {
          animation: doctorFloat 2.8s ease-in-out infinite;
        }
      `}</style>

      <div className="doctor-empty-icon">
        <MedicineBoxOutlined
          style={{
            fontSize: "72px",
            color: "#bfbfbf",
            marginBottom: "18px",
            filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.05))",
          }}
        />
      </div>

      <Space direction="vertical" size={5}>
        <Text
          strong
          style={{
            fontSize: "18px",
            color: "#434343",
          }}
        >
          لا يوجد أطباء حالياً
        </Text>

        <Text
          style={{
            fontSize: "14px",
            color: "#8c8c8c",
            maxWidth: "420px",
            lineHeight: "1.7",
          }}
        >
          لم تتم إضافة أي طبيب إلى النظام بعد. سيظهر جميع الأطباء هنا بمجرد إضافتهم.
        </Text>
      </Space>
    </div>
  );
}
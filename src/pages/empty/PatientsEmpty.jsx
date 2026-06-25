import React from "react";
import { Typography, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Text } = Typography;

export default function PatientsEmpty() {
  return (
    <div
      style={{
        minHeight: 340,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        padding: 20,
      }}
    >
      <style>{`
        @keyframes float {
          0% {transform: translateY(0);}
          50% {transform: translateY(-8px);}
          100% {transform: translateY(0);}
        }

        .empty-patient-icon{
          animation: float 2.5s ease-in-out infinite;
        }
      `}</style>

      <div className="empty-patient-icon">
        <UserOutlined
          style={{
            fontSize: 70,
            color: "#bfbfbf",
            marginBottom: 18,
          }}
        />
      </div>

      <Space direction="vertical" size={5}>
        <Text
          strong
          style={{
            fontSize: 18,
            color: "#434343",
          }}
        >
          لا يوجد مرضى حتى الآن
        </Text>

        <Text
          style={{
            color: "#8c8c8c",
            maxWidth: 420,
            lineHeight: 1.7,
          }}
        >
          لم يتم تسجيل أي مرضى في النظام بعد. ستظهر قائمة المرضى هنا بمجرد إنشاء أول حساب.
        </Text>
      </Space>
    </div>
  );
}
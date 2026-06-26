import React from "react";
import { Space, Typography } from "antd";
import { SafetyOutlined } from "@ant-design/icons";

const { Text } = Typography;

export default function RolesEmpty() {
  return (
    <div
      style={{
        padding: "70px 20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <style>{`
        @keyframes shieldFloat{
          0%{transform:translateY(0)}
          50%{transform:translateY(-8px)}
          100%{transform:translateY(0)}
        }

        .roles-empty-icon{
          animation:shieldFloat 2.7s ease-in-out infinite;
        }
      `}</style>

      <div className="roles-empty-icon">
        <SafetyOutlined
          style={{
            fontSize:72,
            color:"#bfbfbf",
            marginBottom:18,
          }}
        />
      </div>

      <Space direction="vertical" size={5}>
        <Text strong style={{fontSize:18}}>
          لا توجد أدوار حالياً
        </Text>

        <Text
          style={{
            color:"#8c8c8c",
            maxWidth:420,
            lineHeight:1.7
          }}
        >
          لم يتم إنشاء أي أدوار أو صلاحيات بعد. ستظهر جميع الأدوار هنا بمجرد إضافتها.
        </Text>
      </Space>
    </div>
  );
}
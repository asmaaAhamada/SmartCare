import React, { useState } from "react";
import { Empty, Button } from "antd";
import { HomeOutlined, PlusOutlined } from "@ant-design/icons";
import { baby_blue, babyBlue } from "../../color-main/color";

export default function EmptyClinics({ onAddClick, sidebarBlue }) {
  return (
    <div style={{ 
      padding: "60px 20px", 
      textAlign: "center", 
      backgroundColor: "#ffffff", 
      borderRadius: "16px",
      boxShadow: "0 4px 16px rgba(0,0,0,0.02)",
      border: "1px solid #f0f0f0",
      marginTop: "20px"
    }}>
      <Empty
        image={
          <div style={{ fontSize: "64px", color: "#d9d9d9", marginBottom: "16px" }}>
            <HomeOutlined style={{ color: `${sidebarBlue}40` }} />
          </div>
        }
        imageStyle={{ height: 80 }}
        description={
          <div style={{ maxWidth: "400px", margin: "0 auto" }}>
            <span style={{ fontSize: "18px", fontWeight: 700, color: "#434343", display: "block", marginBottom: "8px" }}>
              لا توجد عيادات مسجلة حالياً
            </span>
            <span style={{ fontSize: "14px", color: "#8c8c8c" }}>
              يبدو أنه لم يتم إضافة أي عيادة طبية إلى النظام بعد. يمكنك البدء بإضافة العيادة الأولى الآن لإدارة أطبائها ومواعيدها.
            </span>
          </div>
        }
      >
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={onAddClick}
          style={{
            backgroundColor: baby_blue,
            borderColor: sidebarBlue,
            height: "40px",
            borderRadius: "8px",
            fontWeight: 600,
            marginTop: "8px",
            boxShadow: `0 4px 12px   #035970 30`
          }}
        >
          إضافة العيادة الأولى
        </Button>
      </Empty>
    </div>
  );
}
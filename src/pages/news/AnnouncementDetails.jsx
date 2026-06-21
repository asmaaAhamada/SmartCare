import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Typography, Space, Popconfirm, Divider } from "antd";
import { ArrowRightOutlined, EditOutlined, DeleteOutlined, CalendarOutlined } from "@ant-design/icons";
import { fakeAnnouncements } from "./AnnouncementsPage"; // استيراد الداتا الوهمية لقراءتها

const { Title, Paragraph, Text } = Typography;

export default function AnnouncementDetails() {
  const { id } = useParams(); // جلب آيدي الإعلان من الرابط
  const navigate = useNavigate();
  const sidebarBlue = "#2ca8c9";

  // البحث عن الإعلان المطلوب بناءً على الـ ID
  const announcement = fakeAnnouncements.find(item => item.id === parseInt(id));

  if (!announcement) {
    return <div style={{ padding: "20px", textAlign: "center", direction: "rtl" }}>الإعلان غير موجود أو تم حذفه!</div>;
  }

  return (
    <div style={{ width: "100%", maxWidth: "850px", margin: "0 auto", direction: "rtl", padding: "16px" }}>
      
      {/* زر الرجوع */}
      <Button 
        type="link" 
        icon={<ArrowRightOutlined />} 
        onClick={() => navigate("/dashboard/announcements")}
        style={{ color: sidebarBlue, fontSize: "15px", fontWeight: 600, padding: 0, marginBottom: "20px" }}
      >
        العودة إلى لوحة الإعلانات
      </Button>

      {/* كارد التفاصيل الكبير */}
      <Card
        bordered={false}
        style={{ borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", border: "1px solid #eef2f5" }}
      >
        {/* الصورة الكبيرة */}
        <div style={{ width: "100%", height: "380px", borderRadius: "12px", overflow: "hidden", marginBottom: "24px" }}>
          <img 
            src={announcement.image} 
            alt={announcement.title} 
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* التاريخ */}
        <Space style={{ color: "#999", fontSize: "13px", marginBottom: "12px" }}>
          <CalendarOutlined />
          <Text type="secondary">تاريخ النشر: {announcement.date}</Text>
        </Space>

        {/* العنوان والوصف */}
        <Title level={2} style={{ fontWeight: 700, marginTop: 0, color: "#222", lineHeight: "1.4" }}>
          {announcement.title}
        </Title>
        
        <Divider style={{ margin: "16px 0" }} />

        <Paragraph style={{ fontSize: "15px", color: "#555", lineHeight: "1.8", textAlign: "justify" }}>
          {announcement.description}
        </Paragraph>

        <Divider style={{ margin: "24px 0" }} />

        {/* أزرار الإجراءات السفلية (بنفس الأكشن الخارجي) */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
          <Button 
            icon={<EditOutlined />} 
            onClick={() => console.log("تعديل الإعلان من الداخل:", announcement.id)}
            style={{ borderColor: "#ffc107", color: "#ffc107", fontWeight: 500 }}
          >
            تعديل الإعلان
          </Button>

          <Popconfirm 
            title="هل أنت متأكد من حذف هذا الإعلان؟" 
            onConfirm={() => {
              console.log("حذف الإعلان رقم:", announcement.id);
              navigate("/dashboard/announcements"); // العودة للخارج بعد الحذف
            }}
            okText="نعم" 
            cancelText="إلغاء"
          >
            <Button 
              danger 
              type="primary" 
              icon={<DeleteOutlined />}
              style={{ backgroundColor: "#ff5252", borderColor: "#ff5252" }}
            >
              حذف الإعلان
            </Button>
          </Popconfirm>
        </div>

      </Card>
    </div>
  );
}
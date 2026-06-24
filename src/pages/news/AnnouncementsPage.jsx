import React, { useState } from "react";
import { Card, Button, Row, Col, Typography, Space, Tooltip, Popconfirm } from "antd";
import { PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined, CalendarOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { baby_blue } from "../../color-main/color";

const { Title, Text } = Typography;

// بيانات وهمية (Fake Data) للإعلانات
export const fakeAnnouncements = [
  {
    id: 1,
    title: "حملة التلقيح الوطنية ضد الإنفلونزا تنطلق غداً",
    description: "ندعو جميع المواطنين الكرام لزيارة العيادات التخصصية ابتداءً من صباح الغد للحصول على لقاح الإنفلونزا الموسمي مجاناً لجميع الأعمار.",
    date: "2026-06-20",
    image: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=500&q=80",
  },
  {
    id: 2,
    title: "انضمام الأستاذ الدكتور أحمد علي لعيادة القلب",
    description: "يسر إدارة الرعاية المتكاملة الإعلان عن انضمام الأستاذ الدكتور أحمد علي، استشاري جراحة القلب والأوعية الدموية، إلى الفريق الطبي المتميز لدينا.",
    date: "2026-06-18",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&q=80",
  },
  {
    id: 3,
    title: "أوقات الدوام الجديدة خلال فترة الإجازة الرسمية",
    description: "نحيطكم علماً بأن العيادات الخارجية ستعمل خلال فترة العطلة القادمة بنظام الطوارئ المناوب على مدار 24 ساعة لتقديم أفضل خدمة ممكنة.",
    date: "2026-06-15",
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=500&q=80",
  },
];

export default function AnnouncementsPage() {
  const navigate = useNavigate();
  const sidebarBlue =baby_blue; // لون نظامك المعتمد
  const [announcements, setAnnouncements] = useState(fakeAnnouncements);

  // دالة الحذف الوهمية
  const handleDelete = (id) => {
    setAnnouncements(announcements.filter(item => item.id !== id));
  };

  return (
    <div style={{ width: "100%", direction: "rtl", padding: "16px" }}>
      
      {/* الهيدر العلوي مع زر الإضافة */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
        <div>
          <Title level={3} style={{ margin: 0, fontWeight: 700, color: "#222" }}>لوحة الإعلانات والأخبار</Title>
          <Text style={{ color: "#777", fontSize: "14px" }}>إدارة ونشر الإعلانات الموجهة للمرضى والكادر الطبي</Text>
        </div>
        
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => console.log("فتح مودال أو صفحة إضافة إعلان")}
          style={{
            backgroundColor: sidebarBlue,
            borderColor: sidebarBlue,
            height: "40px",
            borderRadius: "8px",
            fontWeight: 600,
          }}
        >
          إضافة إعلان جديد
        </Button>
      </div>

      {/* شبكة الكروت (3 كروت في السطر) */}
      <Row gutter={[20, 24]}>
        {announcements.map((item) => (
          <Col xs={24} sm={12} md={8} key={item.id}>
            <Card
              hoverable
              style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid #eef2f5", boxShadow: "0 4px 12px rgba(0,0,0,0.01)" }}
              cover={
                <img 
                  alt={item.title} 
                  src={item.image} 
                  style={{ height: "200px", objectFit: "cover" }}
                />
              }
              // قائمة الإجراءات بالأسفل (تفصيل، تعديل، حذف)
              actions={[
                <Tooltip title="عرض التفاصيل">
                  <EyeOutlined key="view" onClick={() => navigate(`/dashboard/announcements/${item.id}`)} style={{ color: sidebarBlue, fontSize: "16px" }} />
                </Tooltip>,
                <Tooltip title="تعديل الإعلان">
                  <EditOutlined key="edit" onClick={() => console.log("تعديل الإعلان رقم:", item.id)} style={{ color: "#ffc107", fontSize: "16px" }} />
                </Tooltip>,
                <Popconfirm title="هل أنت متأكد من حذف هذا الإعلان؟" onConfirm={() => handleDelete(item.id)} okText="نعم" cancelText="إلغاء">
                  <Tooltip title="حذف الإعلان">
                    <DeleteOutlined key="delete" style={{ color: "#ff5252", fontSize: "16px" }} />
                  </Tooltip>
                </Popconfirm>
              ]}
            >
              <Card.Meta
                title={<span style={{ fontWeight: 700, fontSize: "15px", whiteSpace: "normal" }}>{item.title}</span>}
                description={
                  <Space style={{ marginTop: "8px", color: "#999", fontSize: "12px" }}>
                    <CalendarOutlined />
                    <span>{item.date}</span>
                  </Space>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
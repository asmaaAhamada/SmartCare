import React, { useEffect, useState } from "react";
import { 
  Card, 
  Button, 
  Row, 
  Col, 
  Typography, 
  Space, 
  Tooltip, 
  Modal, 
  Tag, 
  Divider, 
  Badge, 
  Spin, 
  Alert 
} from "antd";
import { 
  PlusOutlined, 
  EyeOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  CalendarOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  ArrowRightOutlined,
  UserOutlined,
  InfoCircleOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { baby_blue } from "../../color-main/color";
import { fetchAnnouncement } from "../../backend/slice/announcements/fetchAll";
import { useDispatch, useSelector } from "react-redux";
import { AnnouncementLoader } from "../LOADING/AnnouncementLoader";
import { AnnouncementEmpty } from "../empty/AnnouncementEmpty";
import AddAnnouncementModal from "./AddAnnouncementModal";
import ImagePlaceholder from "../empty/ImagePlaceholder";
import EditAnnouncementModal from "./EditAnnouncementModal";
import DeleteAnnouncementModal from "./DeleteAnnouncementModal";
import { fetchDetailsAnnouncement, resetDetails } from "../../backend/slice/announcements/deteails";

const { Title, Text, Paragraph } = Typography;

// ==========================================
// 🌟 المكون الجديد: مودال عرض التفاصيل العصري المطور بالتكامل مع الباكيند
// ==========================================
export default  function ViewAnnouncementModal({ open, id, onCancel }) {
  const dispatch = useDispatch();
  const sidebarBlue = baby_blue;

  // جلب تفاصيل الإعلان من الـ Redux Store
  const { data: announcement, isLoading, error } = useSelector((state) => state.fetchDetailsAnnouncement);

  // جلب البيانات عند فتح المودال وتغير الـ ID وتصفيرها عند الإغلاق
  useEffect(() => {
    if (open && id) {
      dispatch(fetchDetailsAnnouncement(id));
    }
    return () => {
      dispatch(resetDetails());
    };
  }, [id, open, dispatch]);

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null} // تخصيص الأزرار في الهيكل الداخلي
      centered
      width={440} // قياس ملموم وممتاز للشاشة
      styles={{
        body: { padding: 0, overflow: "hidden", borderRadius: "12px", minHeight: "220px" },
        content: { borderRadius: "12px", padding: 0 }
      }}
    >
      {/* 1. معالجة حالة التحميل (Spinner ملموم وجميل داخل المودال) */}
      {isLoading ? (
        <div style={{ 
          display: "flex", 
          flexDirection: "column", 
          justifyContent: "center", 
          alignItems: "center", 
          minHeight: "260px", 
          direction: "rtl",
          gap: "12px"
        }}>
          <Spin size="large" style={{ color: sidebarBlue }} />
          <Text type="secondary" style={{ fontSize: "12px" }}>جاري تحميل التفاصيل...</Text>
        </div>
      ) : error ? (
        /* 2. معالجة حالة الخطأ مع إمكانية إعادة المحاولة */
        <div style={{ padding: "20px", direction: "rtl" }}>
          <Alert
            message="خطأ في جلب البيانات"
            description={error}
            type="error"
            showIcon
            action={
              <Button size="small" type="primary" onClick={() => dispatch(fetchDetailsAnnouncement(id))}>
                إعادة المحاولة
              </Button>
            }
          />
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}>
            <Button onClick={onCancel} size="small" type="text">إغلاق</Button>
          </div>
        </div>
      ) : announcement ? (
        /* 3. عرض البيانات بعد جلبها بنجاح */
        <>
          {/* قسم الصورة العلوية وشارة الحالة */}
          <div style={{ position: "relative", height: "130px", width: "100%", overflow: "hidden" }}>
            {announcement.image_url ? (
              <img
                src={announcement.image_url}
                alt={announcement.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <div style={{ 
                width: "100%", 
                height: "100%", 
                background: "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <ImagePlaceholder height="100%" />
              </div>
            )}
            
            {/* شارة الحالة العائمة بحجم أصغر */}
            <div style={{ position: "absolute", top: "10px", right: "10px" }}>
              {announcement.is_active ? (
                <Tag color="success" style={{ padding: "2px 8px", borderRadius: "10px", fontSize: "10px", fontWeight: "bold", border: "none", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
                  <CheckCircleFilled /> فعال الآن
                </Tag>
              ) : (
                <Tag color="error" style={{ padding: "2px 8px", borderRadius: "10px", fontSize: "10px", fontWeight: "bold", border: "none", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
                  <CloseCircleFilled /> غير نشط
                </Tag>
              )}
            </div>
          </div>

          {/* تفاصيل الخبر */}
          <div style={{ padding: "16px", direction: "rtl" }}>
            <div style={{ marginBottom: "6px" }}>
              <Tag color="blue" style={{ borderRadius: "4px", fontSize: "10px", padding: "0px 6px" }}>
                <UserOutlined style={{ marginLeft: "4px" }} /> موجه للمرضى والكادر الطبي
              </Tag>
            </div>

            {/* العنوان الرئيسي للخبر */}
            <Title level={5} style={{ marginTop: 0, marginBottom: "8px", fontWeight: 700, color: "#1e293b", lineHeight: "1.3" }}>
              {announcement.title}
            </Title>

            {/* شريط معلومات الخبر التوضيحي المصغر */}
            <div style={{ 
              display: "flex", 
              gap: "12px", 
              background: "#f8fafc", 
              padding: "6px 10px", 
              borderRadius: "6px", 
              marginBottom: "12px",
              border: "1px solid #f1f5f9"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <CalendarOutlined style={{ color: "#64748b", fontSize: "12px" }} />
                <span style={{ color: "#475569", fontSize: "11px" }}>
                  تاريخ النشر: <strong>{announcement.created_at?.substring(0, 10)}</strong>
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <InfoCircleOutlined style={{ color: "#64748b", fontSize: "12px" }} />
                <span style={{ color: "#475569", fontSize: "11px" }}>
                  رقم الإعلان: <strong>#{announcement.id}</strong>
                </span>
              </div>
            </div>

            {/* نص ومضمون الخبر الرئيسي */}
            <div style={{ marginBottom: "16px" }}>
              <Text style={{ fontSize: "10px", color: "#94a3b8", display: "block", marginBottom: "2px", fontWeight: "bold" }}>مضمون الإعلان:</Text>
              <Paragraph style={{ 
                fontSize: "12px", 
                color: "#334155", 
                lineHeight: "1.5", 
                textAlign: "justify",
                whiteSpace: "pre-line",
                margin: 0
              }}>
                {announcement.description || announcement.content || "لا يوجد تفاصيل إضافية مكتوبة لهذا الإعلان حالياً."}
              </Paragraph>
            </div>

            <Divider style={{ margin: "10px 0" }} />

            {/* أزرار التحكم السفلية الملمومة */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#94a3b8", fontSize: "10px" }}>نظام الرعاية المتكامل © {new Date().getFullYear()}</span>
              <Button 
                type="primary" 
                onClick={onCancel}
                style={{ 
                  backgroundColor: "#222", 
                  borderColor: "#222", 
                  borderRadius: "6px", 
                  height: "30px", 
                  padding: "0 12px",
                  fontSize: "11px",
                  fontWeight: 600
                }}
              >
                إغلاق التفاصيل
              </Button>
            </div>
          </div>
        </>
      ) : null}
    </Modal>
  );
}
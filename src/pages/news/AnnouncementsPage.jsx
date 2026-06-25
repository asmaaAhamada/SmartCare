import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, Typography, Space, Tooltip, Popconfirm } from "antd";
import { PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined, CalendarOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { baby_blue } from "../../color-main/color";
import { fetchAnnouncement } from "../../backend/slice/announcements/fetchAll";
import { useDispatch, useSelector } from "react-redux";
import {
  CheckCircleFilled,
  CloseCircleFilled,
} from "@ant-design/icons";
import { AnnouncementLoader } from "../LOADING/AnnouncementLoader";
import { AnnouncementEmpty } from "../empty/AnnouncementEmpty";
import AddAnnouncementModal from "./AddAnnouncementModal";
import ImagePlaceholder from "../empty/ImagePlaceholder";
import EditAnnouncementModal from "./EditAnnouncementModal";
import DeleteAnnouncementModal from "./DeleteAnnouncementModal"; // تأكد من صحة المسار
import ViewAnnouncementModal from "./ViewAnnouncementModal";
// 🌟 استيراد مكون الـ Placeholder المنفصل (تأكد من صحة المسار حسب ترتيب مجلداتك)

const { Title, Text } = Typography;

export default function AnnouncementsPage() {
 const dispatch = useDispatch();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  
  // حالة لفتح مودال تفاصيل العرض بناءً على الـ ID
  const [openViewModal, setOpenViewModal] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  
  const navigate = useNavigate();
  const sidebarBlue = baby_blue;

  // جلب الحالة من الريدكس
  const { data: responseData, isLoading } = useSelector((state) => state.fetchAnnouncement);

  useEffect(() => {
    dispatch(fetchAnnouncement());
  }, [dispatch]);

  // سحب مصفوفة البيانات الحقيقية
  const announcements = responseData?.data || [];

  return (
    <div style={{ width: "100%", direction: "rtl", padding: "16px" }}>
      
      {/* الهيدر العلوي */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
        <div>
          <Title level={3} style={{ margin: 0, fontWeight: 700, color: "#222" }}>لوحة الإعلانات والأخبار</Title>
          <Text style={{ color: "#777", fontSize: "14px" }}>إدارة ونشر الإعلانات الموجهة للمرضى والكادر الطبي</Text>
        </div>
        
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setOpenAddModal(true)}
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

      {/* التحكم بالعرض بناءً على حالة الـ API للكل */}
      {isLoading ? (
        <AnnouncementLoader color={sidebarBlue} />
      ) : announcements.length === 0 ? (
        <AnnouncementEmpty />
      ) : (
        <Row gutter={[20, 24]}>
          {announcements.map((item) => (
            <Col xs={24} sm={12} md={8} key={item.id}>
              <Card
                hoverable
                style={{ 
                  borderRadius: "12px", 
                  overflow: "hidden", 
                  border: "1px solid #eef2f5", 
                  boxShadow: "0 4px 12px rgba(0,0,0,0.01)" 
                }}
                cover={
                  item.image_url ? (
                    <img 
                      alt={item.title} 
                      src={item.image_url} 
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  ) : (
                    <ImagePlaceholder height="200px" />
                  )
                }
                actions={[
                  <Tooltip title="عرض التفاصيل" key="view-tooltip">
                    <EyeOutlined 
                      key="view" 
                      onClick={() => {
                        setSelectedAnnouncement(item); // حفظ بيانات الخبر مؤقتاً لتمرير الـ id
                        setOpenViewModal(true);        // فتح المودال لعرض التفاصيل من الباكيند
                      }} 
                      style={{ color: sidebarBlue, fontSize: "16px" }} 
                    />
                  </Tooltip>,
                  
                  <Tooltip title="تعديل الإعلان" key="edit-tooltip">
                    <EditOutlined 
                      key="edit" 
                      onClick={() => {
                        setSelectedAnnouncement(item); 
                        setOpenEditModal(true);       
                      }} 
                      style={{ color: "#ffc107", fontSize: "16px" }} 
                    />
                  </Tooltip>,
                  
                  <Tooltip title="حذف الإعلان" key="delete-tooltip">
                    <DeleteOutlined 
                      key="delete" 
                      style={{ color: "#ff5252", fontSize: "16px", cursor: "pointer" }} 
                      onClick={() => {
                        setSelectedAnnouncement(item); 
                        setOpenDeleteModal(true);      
                      }} 
                    />
                  </Tooltip>
                ]}
              >
                <Card.Meta
                  title={
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontWeight: 700, fontSize: "15px" }}>
                        {item.title}
                      </span>

                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        {item.is_active ? (
                          <>
                            <CheckCircleFilled style={{ color: "#52c41a", fontSize: 14 }} />
                            <span style={{ color: "#52c41a", fontSize: 12, fontWeight: 600 }}>فعال</span>
                          </>
                        ) : (
                          <>
                            <CloseCircleFilled style={{ color: "#ff4d4f", fontSize: 14 }} />
                            <span style={{ color: "#ff4d4f", fontSize: 12, fontWeight: 600 }}>غير فعال</span>
                          </>
                        )}
                      </div>
                    </div>
                  }
                  description={
                    <Space style={{ marginTop: "8px", color: "#999", fontSize: "12px" }}>
                      <CalendarOutlined />
                      <span>{item.created_at?.substring(0, 10)}</span>
                    </Space>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* ==========================================
          💎 المودالات والنوافذ المنبثقة للتحكم
         ========================================== */}
         
      {/* 1. مودال عرض التفاصيل المتكامل بالكامل مع الباكيند وبناءً على الـ ID */}
      <ViewAnnouncementModal
        open={openViewModal}
        id={selectedAnnouncement?.id} // تمرير الـ id الخاص بالخبر فقط
        onCancel={() => {
          setOpenViewModal(false);
          setSelectedAnnouncement(null);
        }}
      />

      {/* 2. مودال إضافة الإعلان */}
      <AddAnnouncementModal
        open={openAddModal}
        onCancel={() => setOpenAddModal(false)}
        onSuccess={() => dispatch(fetchAnnouncement())}
      />
      
      {/* 3. مودال تعديل الإعلان */}
      <EditAnnouncementModal
        open={openEditModal}
        announcementData={selectedAnnouncement}
        onCancel={() => {
          setOpenEditModal(false);
          setSelectedAnnouncement(null);
        }}
        onSuccess={() => dispatch(fetchAnnouncement())}
      />
      
      {/* 4. مودال تأكيد الحذف */}
      <DeleteAnnouncementModal
        open={openDeleteModal}
        announcementData={selectedAnnouncement} 
        onSuccess={() => dispatch(fetchAnnouncement())} 
        onCancel={() => {
          setOpenDeleteModal(false);
          setSelectedAnnouncement(null);
        }}
      />
    </div>
  );
}
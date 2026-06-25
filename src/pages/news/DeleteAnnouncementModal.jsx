import React from "react";
import { Modal, Button, Typography, message } from "antd"; // 🌟 استيراد message هنا
import { ExclamationCircleFilled, DeleteOutlined } from "@ant-design/icons";
import { baby_blue } from "../../color-main/color"; 
import { deletAnnouncement } from "../../backend/slice/announcements/delet";
import { useDispatch, useSelector } from "react-redux";

const { Text, Title } = Typography;

export default function DeleteAnnouncementModal({ open, onCancel, announcementData, onSuccess }) {
  const sidebarBlue = baby_blue;
  const dispatch = useDispatch();
  
  const { isLoading } = useSelector((state) => state.deletAnnouncement);

  const handleDelete = () => {
    if (!announcementData?.id) return;

    dispatch(deletAnnouncement(announcementData.id))
      .unwrap()
      .then(() => {
        // 🌟 إظهار رسالة النجاح الخضراء اللطيفة في أعلى الشاشة
        message.success({
          content: "تم حذف الإعلان بنجاح!",
          duration: 3, // تظل ظاهرة لمدة 3 ثوانٍ
          style: {
            marginTop: '8vh', // إزاحتها قليلاً للأسفل لتكون مريحة للعين فوق الـ Header
          },
        });

        if (typeof onSuccess === "function") onSuccess();
        onCancel();
      })
      .catch((err) => {
        console.error("فشلت عملية حذف الخبر:", err);
        // رسالة تنبيه في حال حدوث خطأ غير متوقع
        message.error("عذراً، حدث خطأ أثناء محاولة حذف الإعلان.");
      });
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null} 
      centered
      width={400}
      bodyStyle={{ padding: "24px", textDirection: "rtl" }}
    >
      <div style={{ textAlign: "center", direction: "rtl" }}>
        <div style={{ marginBottom: "16px" }}>
          <ExclamationCircleFilled style={{ fontSize: "52px", color: "#ff5252" }} />
        </div>

        <Title level={4} style={{ marginTop: 0, fontWeight: 700, color: "#222" }}>
          تأكيد الحذف
        </Title>
        
        <p style={{ color: "#666", fontSize: "14px", marginBottom: "24px" }}>
          هل أنت متأكد أنك تريد حذف الإعلان <br />
          <Text strong style={{ color: "#222", fontSize: "15px" }}>
            "{announcementData?.title}"
          </Text>؟ <br />
          <Text type="danger" style={{ fontSize: "12px", marginTop: "4px", display: "block" }}>
            ملاحظة: هذا الإجراء لا يمكن التراجع عنه.
          </Text>
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            loading={isLoading} 
            onClick={handleDelete} 
            style={{
              height: "40px",
              borderRadius: "6px",
              fontWeight: 600,
              padding: "0 24px",
              backgroundColor: "#ff5252",
              borderColor: "#ff5252",
            }}
          >
            تأكيد الحذف
          </Button>
          
          <Button
            onClick={onCancel}
            disabled={isLoading} 
            style={{
              height: "40px",
              borderRadius: "6px",
              fontWeight: 600,
              padding: "0 24px",
              color: "#555",
            }}
          >
            تراجع
          </Button>
        </div>
      </div>
    </Modal>
  );
}
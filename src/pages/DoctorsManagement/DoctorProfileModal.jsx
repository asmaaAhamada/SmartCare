import React from "react";
import { Modal, Avatar, Descriptions, Badge, Divider, Space } from "antd";
import { MailOutlined, PhoneOutlined, SafetyCertificateOutlined, IdcardOutlined } from "@ant-design/icons";

export default function DoctorProfileModal({ visible, onClose, doctor, sidebarBlue, mode }) {
  if (!doctor) return null;

  // فحص إذا كان الوضع داكن أو فاتح
  const isDarkMode = mode === "dark";

  // إعدادات الألوان بناءً على الوضع الحالي
  const colors = {
    modalBg: isDarkMode ? "#1f1f1f" : "#ffffff",
    titleText: isDarkMode ? "#ffffff" : "#333333",
    subText: isDarkMode ? "#aaaaaa" : "#666666",
    descLabelBg: isDarkMode ? "#2a2a2a" : "#fafafa",
    descValueBg: isDarkMode ? "#141414" : "#ffffff",
    descBorder: isDarkMode ? "#303030" : "#f0f0f0",
    descText: isDarkMode ? "#e0e0e0" : "#333333",
    divider: isDarkMode ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.06)",
  };

  return (
    <Modal
      title={
        <span style={{ fontWeight: 700, fontSize: "18px", color: colors.titleText }}>
          الملف الشخصي للطبيب
        </span>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
      width={550}
      // تطبيق الألوان الداكنة على بنية المودال الافتراضية لـ Ant Design
      styles={{
        content: {
          backgroundColor: colors.modalBg,
          color: colors.titleText,
        },
        header: {
          backgroundColor: colors.modalBg,
        }
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "10px 0" }}>
        
        {/* الصورة الشخصية */}
        <Avatar
          src={doctor.avatar}
          size={90}
          style={{ 
            backgroundColor: isDarkMode ? `${sidebarBlue}30` : `${sidebarBlue}20`, 
            color: sidebarBlue, 
            fontSize: "36px", 
            fontWeight: 600,
            boxShadow: isDarkMode ? "0 4px 12px rgba(0,0,0,0.4)" : "0 4px 10px rgba(0,0,0,0.1)",
            marginBottom: "16px"
          }}
        >
          {doctor.name.split(" ")[1]?.charAt(0) || doctor.name.charAt(2)}
        </Avatar>

        {/* الاسم والحالة */}
        <h3 style={{ margin: "0 0 8px 0", fontWeight: 700, fontSize: "20px", color: colors.titleText }}>
          {doctor.name}
        </h3>
        <Space size="small" style={{ marginBottom: "16px" }}>
          <Badge
            status={doctor.verified ? "success" : "warning"}
            text={
              <span style={{ fontWeight: 600, color: doctor.verified ? "#4caf50" : "#ff9800" }}>
                {doctor.verified ? "حساب موثق ومُعتمَد" : "قيد المراجعة"}
              </span>
            }
          />
        </Space>

        <Divider style={{ margin: "8px 0 24px 0", borderColor: colors.divider }} />

        {/* حاقن CSS مخصص لتعديل بوردرات وخلفيات Descriptions التابع لـ Ant Design بالوضع الداكن */}
        <style>{`
          .custom-desc-dark .ant-descriptions-item-label {
            background-color: ${colors.descLabelBg} !important;
            color: ${colors.titleText} !important;
            border-inline-end: 1px solid ${colors.descBorder} !important;
          }
          .custom-desc-dark .ant-descriptions-item-content {
            background-color: ${colors.descValueBg} !important;
            color: ${colors.descText} !important;
          }
          .custom-desc-dark .ant-descriptions-view {
            border: 1px solid ${colors.descBorder} !important;
            border-radius: 8px !important;
            overflow: hidden;
          }
          .custom-desc-dark .ant-descriptions-row {
            border-bottom: 1px solid ${colors.descBorder} !important;
          }
          .custom-desc-dark .ant-descriptions-row:last-child {
            border-bottom: none !important;
          }
        `}</style>

        {/* تفاصيل البيانات الشخصية والمهنية */}
        <Descriptions 
          className="custom-desc-dark"
          column={1} 
          bordered 
          size="middle" 
          style={{ width: "100%" }}
        >
          <Descriptions.Item label={<Space><IdcardOutlined style={{ color: sidebarBlue }} />التخصص</Space>}>
            <span style={{ fontWeight: 600 }}>{doctor.specialty}</span>
          </Descriptions.Item>
          
          <Descriptions.Item label={<Space><MailOutlined style={{ color: sidebarBlue }} />البريد الإلكتروني</Space>}>
            <span style={{ color: colors.descText }}>{doctor.email}</span>
          </Descriptions.Item>
          
          <Descriptions.Item label={<Space><PhoneOutlined style={{ color: sidebarBlue }} />رقم الهاتف</Space>}>
            <span style={{ direction: "ltr", display: "inline-block" }}>{doctor.phone}</span>
          </Descriptions.Item>

          <Descriptions.Item label={<Space><SafetyCertificateOutlined style={{ color: sidebarBlue }} />الرقم المرجعي</Space>}>
            <span style={{ color: colors.subText }}>DOC-2026-00{doctor.id}</span>
          </Descriptions.Item>
        </Descriptions>
      </div>
    </Modal>
  );
}
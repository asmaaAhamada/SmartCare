import React from "react";
import { Modal, Avatar, Badge, Divider, Spin } from "antd";
import { useSelector } from "react-redux";

export default function PatientProfileModal({ visible, onClose, mode }) {
  const { data: patientData, isLoading } = useSelector(
    (state) => state.fetchDetailspatitnent
  );

  const isDarkMode = mode === "dark";

  const colors = {
    modalBg: isDarkMode ? "#1f1f1f" : "#ffffff",
    titleText: isDarkMode ? "#ffffff" : "#333333",
    subText: isDarkMode ? "#aaaaaa" : "#666666",
    descBorder: isDarkMode ? "#303030" : "#f0f0f0",
    descText: isDarkMode ? "#e0e0e0" : "#333333",
    divider: isDarkMode ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.06)",
  };

  const InfoCard = ({ title, value }) => (
    <div
      style={{
        background: isDarkMode ? "#262626" : "#fafafa",
        border: `1px solid ${colors.descBorder}`,
        borderRadius: "10px",
        padding: "10px 14px",
        minHeight: "65px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          fontSize: "11px",
          color: colors.subText,
          marginBottom: "4px",
          fontWeight: 500,
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: "14px",
          fontWeight: 600,
          color: colors.descText,
          wordBreak: "break-word",
        }}
      >
        {value}
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <Modal open={visible} footer={null} onCancel={onClose} centered>
        <div style={{ textAlign: "center", padding: "30px" }}>
          <Spin size="large" />
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      title={
        <span
          style={{
            fontWeight: 700,
            fontSize: "16px",
            color: colors.titleText,
          }}
        >
          الملف الشخصي للمريض
        </span>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
      width={600} /* تم تصغير العرض الإجمالي هنا ليتناسب مع المحتوى بشكل مريح */
      styles={{
        content: { backgroundColor: colors.modalBg, padding: "20px 24px" },
        header: { backgroundColor: colors.modalBg, marginBottom: "16px" },
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          size={75} /* تصغير حجم الآفاتار قليلاً لتوفير مساحة عمودية */
          style={{
            backgroundColor: "#1677ff",
            color: "#fff",
            fontSize: "30px",
            fontWeight: 700,
            marginBottom: "8px",
          }}
        >
          {patientData?.first_name?.charAt(0)}
        </Avatar>

        <h3
          style={{
            margin: 0,
            color: colors.titleText,
            fontWeight: 700,
            fontSize: "18px",
          }}
        >
          {patientData?.first_name} {patientData?.last_name}
        </h3>

        <div style={{ marginTop: "6px" }}>
          <Badge
            status={patientData?.email_verified ? "success" : "warning"}
            text={patientData?.email_verified ? "البريد الإلكتروني موثق" : "البريد غير موثق"}
            style={{ fontSize: "12px" }}
          />
        </div>

        <Divider style={{ margin: "16px 0", borderColor: colors.divider }} />

        <div
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "10px",
          }}
        >
          <InfoCard title="البريد الإلكتروني" value={patientData?.email} />
          
          <InfoCard 
            title="رقم الهاتف" 
            value={<span style={{ direction: "ltr", display: "inline-block" }}>{patientData?.phone || "غير متوفر"}</span>} 
          />
          
          <InfoCard 
            title="الجنس" 
            value={patientData?.gender === "male" ? "ذكر" : "أنثى"} 
          />
          
          <InfoCard title="تاريخ الميلاد" value={patientData?.date_of_birth || "غير مسجل"} />
          
          <InfoCard 
            title="حالة الحساب" 
            value={patientData?.status === "active" ? "نشط" : "مجمّد"} 
          />

          <InfoCard 
            title="تاريخ الإنشاء" 
            value={patientData?.created_at ? new Date(patientData.created_at).toLocaleDateString('ar-EG') : "-"} 
          />
        </div>

        {/* صندوق الإحصائيات مدمج ومنسق بشكل مسطح أنيق */}
        <div
          style={{
            width: "100%",
            marginTop: "14px",
            background: isDarkMode ? "#262626" : "#fafafa",
            border: `1px solid ${colors.descBorder}`,
            borderRadius: "10px",
            padding: "12px 14px",
          }}
        >
          <div style={{ fontSize: "13px", fontWeight: 700, color: colors.titleText, marginBottom: "10px" }}>
            إحصائيات المواعيد والمدفوعات
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "11px", color: colors.subText }}>إجمالي المواعيد</div>
              <div style={{ fontSize: "15px", fontWeight: 700, color: colors.descText }}>{patientData?.stats?.total_appointments || 0}</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "11px", color: colors.subText }}>المواعيد المكتملة</div>
              <div style={{ fontSize: "15px", fontWeight: 700, color: "#52c41a" }}>{patientData?.stats?.done_appointments || 0}</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "11px", color: colors.subText }}>إجمالي المدفوعات</div>
              <div style={{ fontSize: "15px", fontWeight: 700, color: "#1677ff" }}>{(patientData?.stats?.total_paid || 0).toLocaleString()} ل.س</div>
            </div>
          </div>
        </div>

      </div>
    </Modal>
  );
}
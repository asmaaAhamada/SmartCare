import React from "react";
import {
  Modal,
  Avatar,
  Badge,
  Divider,
  Spin,
} from "antd";
import { useSelector } from "react-redux";

export default function DoctorProfileModal({
  visible,
  onClose,
  sidebarBlue,
  mode,
}) {
  const { data: doctorData, isLoading } = useSelector(
    (state) => state.fetchDetailsDoctors
  );

  const isDarkMode = mode === "dark";

  const colors = {
    modalBg: isDarkMode ? "#1f1f1f" : "#ffffff",
    titleText: isDarkMode ? "#ffffff" : "#333333",
    subText: isDarkMode ? "#aaaaaa" : "#666666",
    descBorder: isDarkMode ? "#303030" : "#f0f0f0",
    descText: isDarkMode ? "#e0e0e0" : "#333333",
    divider: isDarkMode
      ? "rgba(255,255,255,0.12)"
      : "rgba(0,0,0,0.06)",
  };

  const InfoCard = ({ title, value }) => (
    <div
      style={{
        background: isDarkMode ? "#262626" : "#fafafa",
        border: `1px solid ${colors.descBorder}`,
        borderRadius: "12px",
        padding: "14px 16px",
        minHeight: "75px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          fontSize: "12px",
          color: colors.subText,
          marginBottom: "6px",
          fontWeight: 500,
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: "15px",
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
      <Modal
        open={visible}
        footer={null}
        onCancel={onClose}
        centered
      >
        <div style={{ textAlign: "center", padding: "40px" }}>
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
            fontSize: "18px",
            color: colors.titleText,
          }}
        >
          الملف الشخصي للطبيب
        </span>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
      width={700}
      styles={{
        content: {
          backgroundColor: colors.modalBg,
        },
        header: {
          backgroundColor: colors.modalBg,
        },
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
          size={90}
          style={{
            backgroundColor: "#1677ff",
            color: "#fff",
            fontSize: "36px",
            fontWeight: 700,
            marginBottom: "12px",
          }}
        >
          {doctorData?.first_name?.charAt(0)}
        </Avatar>

        <h2
          style={{
            margin: 0,
            color: colors.titleText,
            fontWeight: 700,
          }}
        >
          {doctorData?.first_name} {doctorData?.last_name}
        </h2>

        <div style={{ marginTop: "10px" }}>
          <Badge
            status={
              doctorData?.is_verified
                ? "success"
                : "warning"
            }
            text={
              doctorData?.is_verified
                ? "حساب موثق ومعتمد"
                : "قيد المراجعة"
            }
          />
        </div>

        <Divider
          style={{
            margin: "20px 0",
            borderColor: colors.divider,
          }}
        />

        <div
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "12px",
          }}
        >
          <InfoCard
            title="التخصص"
            value={doctorData?.specialty_ar}
          />

          <InfoCard
            title="رقم الترخيص"
            value={doctorData?.license_number}
          />

          <InfoCard
            title="البريد الإلكتروني"
            value={doctorData?.email}
          />

          <InfoCard
            title="رقم الهاتف"
            value={doctorData?.phone || "غير متوفر"}
          />

          <InfoCard
            title="سنوات الخبرة"
            value={`${doctorData?.years_experience} سنوات`}
          />

          <InfoCard
            title="التقييم"
            value={`⭐ ${doctorData?.rating}`}
          />

          <InfoCard
            title="سعر الاستشارة"
            value={`${doctorData?.consultation_fee?.toLocaleString()} ل.س`}
          />

          <InfoCard
            title="عدد التقييمات"
            value={doctorData?.total_reviews}
          />

          <InfoCard
            title="الخدمة المنزلية"
            value={
              doctorData?.home_service
                ? "متاحة"
                : "غير متاحة"
            }
          />

          <InfoCard
            title="استشارة فيديو"
            value={
              doctorData?.video_consultation
                ? "متاحة"
                : "غير متاحة"
            }
          />

          <InfoCard
            title="الحالة"
            value={
              doctorData?.status === "active"
                ? "نشط"
                : "غير نشط"
            }
          />

          <InfoCard
            title="التوثيق"
            value={
              doctorData?.is_verified
                ? "موثق"
                : "غير موثق"
            }
          />
        </div>

        <div
          style={{
            width: "100%",
            marginTop: "16px",
            background: isDarkMode
              ? "#262626"
              : "#fafafa",
            border: `1px solid ${colors.descBorder}`,
            borderRadius: "12px",
            padding: "16px",
          }}
        >
          <div
            style={{
              fontSize: "13px",
              color: colors.subText,
              marginBottom: "10px",
            }}
          >
            نبذة تعريفية
          </div>

          <div
            style={{
              color: colors.descText,
              lineHeight: 1.8,
            }}
          >
            {doctorData?.bio}
          </div>
        </div>
      </div>
    </Modal>
  );
}
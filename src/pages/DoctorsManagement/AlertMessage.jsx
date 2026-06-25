import React from 'react';
import { Alert } from 'antd';

export default function AlertMessage({ isVerified, doctorName }) {
  // الرسالة الودية بناءً على نوع العملية
  const messageText = isVerified
  ? `تم إلغاء توثيق ${doctorName || "الطبيب"}`
  : `تم توثيق ${doctorName || "الطبيب"}`;

const descriptionText = isVerified
  ? "تم إلغاء اعتماد الحساب بنجاح."
  : "تم اعتماد الحساب بنجاح.";

  return (
    <Alert
      message={<strong>{messageText}</strong>}
      description={descriptionText}
      type={isVerified ? "warning" : "success"}
      showIcon
      closable
      style={{
        textAlign: 'right',
        direction: 'rtl',
        borderRadius: '8px',
        marginBottom: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
      }}
    />
  );
}
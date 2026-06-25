import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"; 
import { Modal, Button, Typography, Space } from "antd";
import { 
  CheckCircleOutlined, 
  CloseCircleOutlined, 
} from "@ant-design/icons";

// استيراد كومبوننت اليرت المنفصل
import AlertMessage from "./AlertMessage";
// استيراد أكشن التنظيف من السلايس
import { clearSuccess, vrifyDoctors } from "../../backend/slice/doctors/verfiy"; 

const { Text, Paragraph } = Typography;

export default function VerifyDoctorModal({ open, doctorData, onCancel, onSuccess }) {
  const mainColor = "#035970"; 
  const dispatch = useDispatch();
  
  // جلب الحالات من السلايس الخاص بالتوثيق
  const { isLoading, success } = useSelector((state) => state.vrifyDoctors);
  
  const isCurrentlyVerified = doctorData?.verified;

  // عند إغلاق المودال أو فتحه، نقوم بتنظيف حالة النجاح السابقة
  useEffect(() => {
    if (!open) {
      dispatch(vrifyDoctors());
    }
  }, [open, dispatch]);

  const handleConfirm = () => {
    if (onSuccess && doctorData) {
      onSuccess(doctorData.id);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
      destroyOnClose
      width={440}
      styles={{
        body: { padding: "24px", textDirection: "rtl" }
      }}
    >
      <div style={{ direction: "rtl", textAlign: "center" }}>
        
        {/* في حال النجاح: يتم عرض الكومبوننت المنفصل للرسالة الودية */}
        {success && (
          <AlertMessage 
            isVerified={isCurrentlyVerified} 
            doctorName={doctorData?.name} 
          />
        )}

        {/* الأيقونة العلوية */}
        <div style={{ marginBottom: "16px" }}>
          {isCurrentlyVerified ? (
            <CloseCircleOutlined style={{ fontSize: "55px", color: "#ff4d4f" }} />
          ) : (
            <CheckCircleOutlined style={{ fontSize: "55px", color: mainColor }} />
          )}
        </div>

        {/* عنوان المودال */}
        <Typography.Title level={4} style={{ marginTop: 0, fontWeight: 700, color: "#262626" }}>
          {isCurrentlyVerified ? "إلغاء توثيق الحساب الطبي" : "تأكيد اعتماد الحساب الطبي"}
        </Typography.Title>

        {/* نص الرسالة */}
        <Paragraph style={{ color: "#595959", fontSize: "14px", lineHeight: "1.6", marginBottom: "24px" }}>
          {isCurrentlyVerified ? (
            <>
              أنت على وشك <Text danger style={{ fontWeight: 600 }}>إلغاء توثيق</Text> حساب الطبيب{" "}
              <Text style={{ fontWeight: 'bold' }}>{doctorData?.name}</Text>. بعد هذا الإجراء، لن تظهر شارة التوثيق للمرضى في المنصة.
            </>
          ) : (
            <>
              هل أنت متأكد من رغبتك في <Text style={{ color: mainColor, fontWeight: 600 }}>توثيق واعتماد</Text> حساب الطبيب{" "}
              <Text style={{ fontWeight: 'bold' }}>{doctorData?.name}</Text>؟ سيتيح هذا الإجراء للمرضى الثقة بالبيانات الطبية المقدمة.
            </>
          )}
        </Paragraph>

        {/* أزرار التحكم - تختفي أو تصبح ديسبيلد عند النجاح لترك التركيز على الـ Alert */}
        <Space size="middle" style={{ width: "100%", justifyContent: "center" }}>
          <Button
            type="primary"
            loading={isLoading}
            onClick={handleConfirm}
            disabled={success} // تعطيل الزر بمجرد النجاح
            style={{
              backgroundColor: isCurrentlyVerified ? "#ff4d4f" : mainColor,
              borderColor: isCurrentlyVerified ? "#ff4d4f" : mainColor,
              minWidth: "120px",
              height: "38px",
              borderRadius: "6px",
              fontWeight: 600
            }}
          >
            {isCurrentlyVerified ? "إلغاء التوثيق" : "توثيق الحساب"}
          </Button>
          
          <Button
            onClick={onCancel}
            disabled={isLoading}
            style={{
              minWidth: "120px",
              height: "38px",
              borderRadius: "6px",
              fontWeight: 600,
              color: "#8c8c8c"
            }}
          >
            {success ? "إغلاق" : "تراجع"}
          </Button>
        </Space>
      </div>
    </Modal>
  );
}
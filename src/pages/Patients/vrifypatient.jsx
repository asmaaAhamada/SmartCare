import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"; 
import { Modal, Button, Typography, Space, Alert } from "antd";
import { 
  CheckCircleOutlined, 
  CloseCircleOutlined, 
} from "@ant-design/icons";

import { clearSuccess, vrifypatitnent } from "../../backend/slice/patitents/verfiy"; 

const { Text, Paragraph } = Typography;

export default function VerifyPatientModal({ open, patientData, onCancel, onSuccess }) {
  const mainColor = "#035970"; 
  const dispatch = useDispatch();
  
  // جلب الحالات من السلايس الخاص بالتوثيق / تغيير الحالة
  const { isLoading, success } = useSelector((state) => state.vrifypatitnent);
  
  // التحقق إن كان الحساب نشطاً حالياً أم مجمداً
  const isCurrentlyActive = patientData?.status === "active";

  // عند إغلاق المودال، نقوم بتنظيف حالة النجاح السابقة
  useEffect(() => {
    if (!open) {
      dispatch(clearSuccess());
    }
  }, [open, dispatch]);

  const handleConfirm = () => {
    if (patientData?.id) {
      dispatch(vrifypatitnent(patientData.id)).then((res) => {
        if (res.meta.requestStatus === "fulfilled" && onSuccess) {
          onSuccess(); // تحديث بيانات الجدول تلقائياً بعد النجاح
        }
      });
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
        body: { padding: "24px" }
      }}
    >
      <div style={{ direction: "rtl", textAlign: "center" }}>
        
        {/* رسالة النجاح المدمجة تظهر هنا عند اكتمال الطلب */}
        {success && (
          <Alert
            message={
              <span style={{ fontWeight: 600 }}>
                {isCurrentlyActive 
                  ? `تم تجميد حساب المريض ${patientData?.name || ""} بنجاح.` 
                  : `تم تفعيل حساب المريض ${patientData?.name || ""} بنجاح.`
                }
              </span>
            }
            type="success"
            showIcon
            style={{ marginBottom: "20px", textAlign: "right", borderRadius: "8px" }}
          />
        )}

        {/* الأيقونة العلوية بناءً على الحالة الحالية */}
        <div style={{ marginBottom: "16px" }}>
          {isCurrentlyActive ? (
            <CloseCircleOutlined style={{ fontSize: "55px", color: "#ff4d4f" }} />
          ) : (
            <CheckCircleOutlined style={{ fontSize: "55px", color: "#2e7d32" }} />
          )}
        </div>

        {/* عنوان المودال */}
        <Typography.Title level={4} style={{ marginTop: 0, fontWeight: 700, color: "#262626" }}>
          {isCurrentlyActive ? "تجميد حساب المريض" : "تفعيل حساب المريض"}
        </Typography.Title>

        {/* نص الرسالة الاسترشادية */}
        <Paragraph style={{ color: "#595959", fontSize: "14px", lineHeight: "1.6", marginBottom: "24px" }}>
          {isCurrentlyActive ? (
            <>
              أنت على وشك <Text danger style={{ fontWeight: 600 }}>تجميد</Text> حساب المريض{" "}
              <Text style={{ fontWeight: 'bold' }}>{patientData?.name}</Text>. بعد هذا الإجراء، لن يتمكن المريض من تسجيل الدخول أو حجز مواعيد جديدة.
            </>
          ) : (
            <>
              هل أنت متأكد من رغبتك في <Text style={{ color: "#2e7d32", fontWeight: 600 }}>إعادة تفعيل</Text> حساب المريض{" "}
              <Text style={{ fontWeight: 'bold' }}>{patientData?.name}</Text>؟ سيتيح هذا الإجراء للمريض العودة لاستخدام المنصة بشكل طبيعي.
            </>
          )}
        </Paragraph>

        {/* أزرار التحكم */}
        <Space size="middle" style={{ width: "100%", justifyContent: "center" }}>
          <Button
            type="primary"
            loading={isLoading}
            onClick={handleConfirm}
            disabled={success} /* تعطيل الزر لتجنب التكرار بعد النجاح */
            style={{
              backgroundColor: isCurrentlyActive ? "#ff4d4f" : "#2e7d32",
              borderColor: isCurrentlyActive ? "#ff4d4f" : "#2e7d32",
              minWidth: "120px",
              height: "38px",
              borderRadius: "6px",
              fontWeight: 600
            }}
          >
            {isCurrentlyActive ? "تجميد الحساب" : "تفعيل الحساب"}
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
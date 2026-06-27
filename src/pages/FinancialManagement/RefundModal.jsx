import React, { useState, useEffect } from "react";
import { Modal, InputNumber, Input, Form } from "antd";
import { Button as MUIButton, Box, Typography, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { SettingsBackupRestoreOutlined } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";

const ACCENT_RED = "#d32f2f";
const PRIMARY_DARK = "#0a566c";

export default function RefundModal({ open, onClose, selectedPayment, onConfirmRefund }) {
  const [refundType, setRefundType] = useState("full"); // full أو partial
  const [form] = Form.useForm();

  // تحديث القيم داخل المودال عند تغيير الدفعة المختارة
  useEffect(() => {
    if (open && selectedPayment) {
      setRefundType("full");
      form.setFieldsValue({
        refundAmount: selectedPayment.amount - selectedPayment.refundAmount,
        refundReason: ""
      });
    }
  }, [open, selectedPayment, form]);

  const handleSubmit = (values) => {
    onConfirmRefund(values, refundType);
  };

  if (!selectedPayment) return null;

  const maxRefundable = selectedPayment.amount - selectedPayment.refundAmount;

  return (
    <AnimatePresence>
      <Modal
        title={
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: ACCENT_RED }}>
            <SettingsBackupRestoreOutlined />
            <Typography variant="h6" sx={{尊fontWeight: 700, fontFamily: "inherit"}}>
              نافذة تسوية وإرجاع الدفعات المالية
            </Typography>
          </Box>
        }
        open={open}
        onCancel={onClose}
        footer={null}
        centered
        destroyOnClose
        bodyStyle={{ direction: "rtl", paddingTop: "15px" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            
            {/* بطاقة معلومات سريعة */}
            <Box sx={{ p: 2, mb: 3, bgcolor: "#fff8f8", borderRadius: "12px", border: "1px dashed #ffcccc" }}>
              <Typography variant="body2" gutterBottom>المريض المستهدف: <b>{selectedPayment.patientName}</b></Typography>
              <Typography variant="body2">الرصيد المتاح للاسترجاع: <b style={{ color: PRIMARY_DARK }}>{maxRefundable} AED</b></Typography>
            </Box>

            {/* أزرار التبديل الفلترة لنوع الاسترجاع */}
            <Form.Item label="هيكلية ونوع الحركة الاسترجاعية">
              <ToggleButtonGroup
                value={refundType}
                exclusive
                onChange={(e, next) => {
                  if (next) {
                    setRefundType(next);
                    if (next === "full") {
                      form.setFieldValue("refundAmount", maxRefundable);
                    }
                  }
                }}
                fullWidth
                color="error"
                size="small"
              >
                <ToggleButton value="full" sx={{ fontWeight: 600, fontFamily: "inherit" }}>إرجاع كامل للمبلغ (Full)</ToggleButton>
                <ToggleButton value="partial" sx={{ fontWeight: 600, fontFamily: "inherit" }}>إرجاع جزء محدد (Partial)</ToggleButton>
              </ToggleButtonGroup>
            </Form.Item>

            {/* حقل المبلغ */}
            <Form.Item 
              label="المبلغ المسترد (AED)" 
              name="refundAmount"
              rules={[{ required: true, message: "يرجى تعيين المبلغ" }]}
            >
              <InputNumber 
                min={1} 
                max={maxRefundable} 
                disabled={refundType === "full"}
                style={{ width: "100%", borderRadius: "6px" }}
              />
            </Form.Item>

            {/* حقل السبب */}
            <Form.Item 
              label="سبب طلب الاسترجاع وضبط الحساب" 
              name="refundReason"
              rules={[{ required: true, message: "يرجى ذكر السبب لتوثيقه في السجلات المالية" }]}
            >
              <Input.TextArea placeholder="على سبيل المثال: إلغاء الموعد من قبل الطبيب أو تعديل الجدول" rows={3} style={{ borderRadius: "6px" }} />
            </Form.Item>

            {/* أزرار التحكم */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1.5, mt: 3 }}>
              <MUIButton variant="text" color="inherit" onClick={onClose} sx={{ fontFamily: "inherit" }}>
                إلغاء الأمر
              </MUIButton>
              <MUIButton type="submit" variant="contained" color="error" sx={{ borderRadius: "8px", fontFamily: "inherit", fontWeight: 700 }}>
                تأكيد وضخ الاسترجاع في الحساب
              </MUIButton>
            </Box>
          </Form>
        </motion.div>
      </Modal>
    </AnimatePresence>
  );
}
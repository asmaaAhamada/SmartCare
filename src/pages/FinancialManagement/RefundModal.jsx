import React, { useEffect } from "react";
import { Modal, InputNumber, Input, Form } from "antd";
import { Button as MUIButton, Box, Typography } from "@mui/material";
import { SettingsBackupRestoreOutlined } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";

const ACCENT_RED = "#d32f2f";
const PRIMARY_DARK = "#0a566c";

export default function RefundModal({
  open,
  onClose,
  selectedPayment,
  onConfirmRefund,
}) {
  const [form] = Form.useForm();

  const { loading } = useSelector((state) => state.partialRefund);

  useEffect(() => {
    if (open && selectedPayment) {
      form.setFieldsValue({
        refundAmount: 1,
        refundReason: "",
      });
    }
  }, [open, selectedPayment, form]);

  const handleSubmit = (values) => {
    onConfirmRefund({
      refund_amount: values.refundAmount,
      refund_reason: values.refundReason,
    });
  };

  if (!selectedPayment) return null;

  const maxRefundable =
    selectedPayment.amount - selectedPayment.refundAmount;

  return (
    <AnimatePresence>
      <Modal
        title={
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: ACCENT_RED,
            }}
          >
            <SettingsBackupRestoreOutlined />

            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontFamily: "inherit",
              }}
            >
              استرجاع جزئي
            </Typography>
          </Box>
        }
        open={open}
        onCancel={onClose}
        footer={null}
        centered
        destroyOnClose
        bodyStyle={{
          direction: "rtl",
          paddingTop: "15px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
          >
            <Box
              sx={{
                p: 2,
                mb: 3,
                bgcolor: "#fff8f8",
                borderRadius: 2,
                border: "1px dashed #ffcccc",
              }}
            >
              <Typography variant="body2">
                المريض :
                <b> {selectedPayment.patientName}</b>
              </Typography>

              <Typography variant="body2">
                الحد الأقصى للاسترجاع :
                <b style={{ color: PRIMARY_DARK }}>
                  {" "}
                  {maxRefundable} AED
                </b>
              </Typography>
            </Box>

            <Form.Item
              label="المبلغ المسترجع"
              name="refundAmount"
              rules={[
                {
                  required: true,
                  message: "أدخل مبلغ الاسترجاع",
                },
                {
                  validator(_, value) {
                    if (!value)
                      return Promise.reject("أدخل مبلغاً");

                    if (value > maxRefundable)
                      return Promise.reject(
                        `لا يمكن استرجاع أكثر من ${maxRefundable}`
                      );

                    return Promise.resolve();
                  },
                },
              ]}
            >
              <InputNumber
                min={1}
                max={maxRefundable}
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item
              label="سبب الاسترجاع"
              name="refundReason"
              rules={[
                {
                  required: true,
                  message: "يرجى كتابة سبب الاسترجاع",
                },
              ]}
            >
              <Input.TextArea
                rows={4}
                placeholder="اكتب سبب الاسترجاع..."
              />
            </Form.Item>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
              }}
            >
              <MUIButton onClick={onClose}>
                إلغاء
              </MUIButton>

              <MUIButton
                type="submit"
                variant="contained"
                color="error"
                disabled={loading}
              >
                {loading
                  ? "جاري الاسترجاع..."
                  : "تأكيد الاسترجاع"}
              </MUIButton>
            </Box>
          </Form>
        </motion.div>
      </Modal>
    </AnimatePresence>
  );
}
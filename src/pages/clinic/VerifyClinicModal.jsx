import React, { useEffect } from "react";
import {
  Modal,
  Button,
  Typography,
  Space,
  Alert,
} from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSuccess,
  vrifyClinic,
} from "../../backend/slice/clinic/verfiy";

const { Text, Paragraph, Title } = Typography;

export default function ToggleClinicStatusModal({
  open,
  onCancel,
  clinic,
  onSuccess,
}) {
  const dispatch = useDispatch();

  const { isLoading, success, error } = useSelector(
    (state) => state.vrifyClinic
  );

  useEffect(() => {
    if (!open) {
      dispatch(clearSuccess());
    }
  }, [open, dispatch]);

 const handleConfirm = async () => {
  const result = await dispatch(vrifyClinic(clinic.id));
console.log(result)
  if (vrifyClinic.fulfilled.match(result)) {
    onSuccess?.();
  }
};

  return (
    <Modal
      open={open}
      footer={null}
      centered
      destroyOnClose
      onCancel={onCancel}
      width={470}
      styles={{
        body: {
          padding: 24,
          direction: "rtl",
        },
      }}
    >
      <div style={{ textAlign: "center" }}>
        {/* رسالة النجاح */}
       {success && (
  <Alert
    showIcon
    type="success"
    message={
      clinic?.is_active
        ? "تم تعطيل العيادة بنجاح"
        : "تم تفعيل العيادة بنجاح"
    }
    description={
      clinic?.is_active
        ? "لن تظهر العيادة للمستخدمين حتى يتم تفعيلها مرة أخرى."
        : "أصبحت العيادة متاحة للاستخدام داخل النظام."
    }
    style={{ marginBottom: 20 }}
  />
)}

        {/* رسالة الخطأ */}
        {error && (
          <Alert
            style={{ marginBottom: 20 }}
            type="error"
            showIcon
            message="فشل تنفيذ العملية"
            description={error}
          />
        )}

        <div style={{ marginBottom: 18 }}>
          {clinic?.is_active ? (
            <CloseCircleOutlined
              style={{
                fontSize: 60,
                color: "#ff4d4f",
              }}
            />
          ) : (
            <CheckCircleOutlined
              style={{
                fontSize: 60,
                color: "#52c41a",
              }}
            />
          )}
        </div>

        <Title level={4}>
          {clinic?.is_active
            ? "تعطيل العيادة"
            : "تفعيل العيادة"}
        </Title>

        <Paragraph style={{ lineHeight: 1.9 }}>
          {clinic?.is_active ? (
            <>
              هل أنت متأكد من
              <Text danger strong>
                {" "}تعطيل{" "}
              </Text>
              العيادة

              <Text strong>
                {" "}
                {clinic?.name}
              </Text>

              ؟

              <br />

              لن تصبح متاحة داخل النظام حتى يتم تفعيلها مجدداً.
            </>
          ) : (
            <>
              هل أنت متأكد من
              <Text strong style={{ color: "#52c41a" }}>
                {" "}تفعيل{" "}
              </Text>

              العيادة

              <Text strong>
                {" "}
                {clinic?.name}
              </Text>

              ؟

              <br />

              ستصبح متاحة للاستخدام داخل النظام.
            </>
          )}
        </Paragraph>

        <Space
          style={{
            width: "100%",
            justifyContent: "center",
          }}
        >
          <Button
            loading={isLoading}
            disabled={success}
            onClick={handleConfirm}
            type="primary"
            style={{
              minWidth: 130,
              background: clinic?.is_active
                ? "#ff4d4f"
                : "#52c41a",
              borderColor: clinic?.is_active
                ? "#ff4d4f"
                : "#52c41a",
            }}
          >
            {clinic?.is_active
              ? "تعطيل"
              : "تفعيل"}
          </Button>

          <Button
            disabled={isLoading}
            onClick={onCancel}
            style={{
              minWidth: 130,
            }}
          >
            {success ? "إغلاق" : "إلغاء"}
          </Button>
        </Space>
      </div>
    </Modal>
  );
}
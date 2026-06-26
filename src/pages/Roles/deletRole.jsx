import React from "react";
import { Modal, Button, Typography, message } from "antd"; // 🌟 استيراد message هنا
import { ExclamationCircleFilled, DeleteOutlined } from "@ant-design/icons";
import { baby_blue } from "../../color-main/color"; 
import { useDispatch, useSelector } from "react-redux";
import { deletRoles } from "../../backend/slice/pirmission/delet";

const { Text, Title } = Typography;

export default function DeleteRolesModal({ open, onCancel, RolesData, onSuccess }) {
  const sidebarBlue = baby_blue;
  const dispatch = useDispatch();
  
  const { isLoading } = useSelector((state) => state.deletRoles);

  const handleDelete = () => {
    if (!RolesData?.id) return;

   dispatch(deletRoles(RolesData.id))
  .unwrap()
  .then((response) => {
    console.log("THEN RESPONSE:", response);
    console.log("MESSAGE:", response?.message);

    message.success({
      content: response?.message || "لا توجد رسالة",
          duration: 3,

    });
      onSuccess?.();

  })
  .catch((err) => {
  console.log("ERROR =", err);
  console.log("ERROR STRING =", JSON.stringify(err, null, 2));

  message.error({
    content: JSON.stringify(err),
    duration: 5,
  });
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
          هل أنت متأكد أنك تريد حذف الصلاحية <br />
          <Text strong style={{ color: "#222", fontSize: "15px" }}>
            "{RolesData?.name}"
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
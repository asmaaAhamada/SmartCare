import React, { useEffect } from "react";
import { Modal, Form, Input, Select, Button, message as antdMessage } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ADD_DEPEINSE, resetAddMedicineState } from "../../backend/slice/pharmecy/add_depeins"; // تأكد من المسار لديك

export default function DispenseModal({ visible, onClose, patientId }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.ADD_DEPEINSE || state.dispense); // حسب اسم المجمع بالـ store

  useEffect(() => {
    if (visible) {
      form.setFieldsValue({
        success: true,
        message: "Prescription dispensed successfully"
      });
    }
  }, [visible, form]);

  useEffect(() => {
    if (success) {
      antdMessage.success("تم صرف الوصفة الطبية بنجاح!");
      dispatch(resetAddMedicineState());
      form.resetFields();
      onClose();
    }
    if (error) {
      antdMessage.error(error);
      dispatch(resetAddMedicineState());
    }
  }, [success, error, dispatch, onClose, form]);

  const handleSubmit = (values) => {
    dispatch(ADD_DEPEINSE({ id: patientId, ...values }));
  };

  return (
    <Modal
      title="صرف وصفة طبية للمريض"
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit} style={{ marginTop: "16px" }}>
        
        <Form.Item
          label="حالة العملية (Success)"
          name="success"
          rules={[{ required: true }]}
        >
          <Select>
            <Select.Option value={true}>True (ناجحة)</Select.Option>
            <Select.Option value={false}>False (فاشلة)</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="رسالة التأكيد (Message)"
          name="message"
          rules={[{ required: true, message: "الرجاء كتابة رسالة الصرف" }]}
        >
          <Input.TextArea rows={3} placeholder="مثال: Prescription dispensed successfully" />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0, textAlign: "left" }}>
          <Button style={{ marginRight: "2px" }} onClick={onClose}>
            إلغاء
          </Button>
          <Button type="primary" htmlType="submit" loading={loading} style={{ backgroundColor: "#4A148C" }}>
تأكيد الوصفة          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
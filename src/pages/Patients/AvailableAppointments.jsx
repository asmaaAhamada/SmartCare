import React, { useEffect, useState } from "react";
import { Table, Button, Typography, Select, Space, Card, Tag, Spin, Tooltip, Modal, Divider } from "antd";
import { 
  ArrowRightOutlined, 
  CalendarOutlined, 
  ClockCircleOutlined, 
  UserOutlined, 
  LoadingOutlined,
  InboxOutlined,
  EyeOutlined,
  DollarOutlined,
  FileTextOutlined,
  HourglassOutlined
} from "@ant-design/icons";
import { baby_blue } from "../../color-main/color";
import { useDispatch, useSelector } from "react-redux";
import { fetchAPPINTMENT } from "../../backend/slice/patitents/appointents/fetchAll";
import { fetchspesficAPPINTMENT, resetSpecificDetails } from "../../backend/slice/patitents/appointents/spescfic"; // 👈 تأكدي من مسار ملف تفاصيل الموعد المعدل فوق

const { Title, Text } = Typography;
const { Option } = Select;

const DARK_BLUE = "#035970"; 

export default function AvailableAppointments({ onBackToPatients }) {
  const dispatch = useDispatch();
  
  const { data: responseData, isLoading } = useSelector((state) => state.fetchAPPINTMENT);
  const { data: specificData, isLoading: isSpecificLoading } = useSelector((state) => state.fetchspesficAPPINTMENT);
  
  const sidebarBlue = baby_blue; 

  const [selectedPatientId, setSelectedPatientId] = useState("all");
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchAPPINTMENT());
  }, [dispatch]);

  // بناء المكونات بالتطابق مع كائنات الـ API
  const appointmentsList = responseData?.data?.map((appointment) => ({
    id: appointment.id,
    key: appointment.id,
    patientId: appointment.patient?.id,
    patientName: appointment.patient?.name || "مريض غير معروف",
    doctorName: appointment.doctor?.name || "طبيب غير معروف",
    date: appointment.appointment_date,
    time: appointment.appointment_time,
    type: appointment.type === "in_clinic" ? "داخل العيادة" : appointment.type,
    status: appointment.status,
  })) || [];

  const filteredAppointments = selectedPatientId === "all" 
    ? appointmentsList 
    : appointmentsList.filter(app => app.patientId === Number(selectedPatientId));

  const uniquePatients = Array.from(
    new Map(
      appointmentsList.filter(app => app.patientId).map(app => [app.patientId, app.patientName])
    ).entries()
  ).map(([id, name]) => ({ id, name }));

  // دالة فتح المودال وجلب تفاصيل الموعد المحدد بناءً على معرف الموعد
  const handleOpenAppointmentDetails = (appointmentId) => {
    dispatch(resetSpecificDetails());
    dispatch(fetchspesficAPPINTMENT(appointmentId));
    setIsDetailsModalVisible(true);
  };

  const columns = [
    { title: "رقم الموعد", dataIndex: "id", key: "id", render: (id) => <Text code>#{id}</Text> },
    { title: "اسم المريض", dataIndex: "patientName", key: "patientName", render: (text) => <Text strong>{text}</Text> },
    { title: "الطبيب المعالج", dataIndex: "doctorName", key: "doctorName" },
    {
      title: "التاريخ",
      dataIndex: "date",
      key: "date",
      render: (text) => (
        <Space>
          <CalendarOutlined style={{ color: sidebarBlue }} />
          <span>{text}</span>
        </Space>
      )
    },
    {
      title: "التوقيت",
      dataIndex: "time",
      key: "time",
      render: (text) => (
        <Space>
          <ClockCircleOutlined style={{ color: "#ed6c02" }} />
          <span style={{ direction: "ltr" }}>{text}</span>
        </Space>
      )
    },
    {
      title: "نوع الحجز",
      dataIndex: "type",
      key: "type",
      render: (type) => <Tag color="purple" style={{ borderRadius: "4px", fontWeight: 600 }}>{type}</Tag>
    },
    {
      title: "الحالة",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "blue"; let text = status;
        if (status === "confirmed") { color = "success"; text = "مؤكد"; }
        if (status === "cancelled") { color = "error"; text = "ملغي"; }
        if (status === "pending") { color = "warning"; text = "قيد الانتظار"; }
        return <Tag color={color} style={{ borderRadius: "4px", fontWeight: 600 }}>{text}</Tag>;
      }
    },
    {
      title: "العمليات الإضافية",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <Tooltip title="عرض بقية تفاصيل الحجز الفنية">
          <Button 
            type="text" 
            icon={<EyeOutlined style={{ color: sidebarBlue }} />} 
            style={{ backgroundColor: `${sidebarBlue}10` }}
            onClick={() => handleOpenAppointmentDetails(record.id)} // استدعاء دالة جلب التفاصيل
          />
        </Tooltip>
      )
    }
  ];

  const customEmptyRender = () => (
    <div style={{ padding: "40px 0", textAlign: "center" }}>
      <InboxOutlined className="animated-empty-icon" style={{ fontSize: "54px", color: DARK_BLUE }} />
      <div style={{ marginTop: "16px" }}>
        <Text strong style={{ fontSize: "16px", color: "#333", display: "block", marginBottom: "4px" }}>لا يوجد مواعيد حتى الآن</Text>
        <Text type="secondary" style={{ fontSize: "14px" }}>{selectedPatientId === "all" ? "لم يتم تسجيل أي مواعيد في النظام بعد." : "لا توجد مواعيد متوفرة لهذا المريض المحدد."}</Text>
      </div>
    </div>
  );

  return (
    <div style={{ width: "100%", direction: "rtl" }}>
      
      <style>{`
        .blue-header-table .ant-table-thead > tr > th {
          background-color: ${sidebarBlue} !important;
          color: #ffffff !important;
          font-weight: 700 !important;
          border-bottom: none !important;
          border-radius: 0px !important;
        }
        .blue-header-table .ant-table-container { border-radius: 12px !important; overflow: hidden !important; }
        @keyframes pulseMotion {
          0% { transform: scale(1); opacity: 0.85; }
          50% { transform: scale(1.08); opacity: 1; filter: drop-shadow(0 4px 8px rgba(3, 89, 112, 0.25)); }
          100% { transform: scale(1); opacity: 0.85; }
        }
        .animated-empty-icon { animation: pulseMotion 2.5s infinite ease-in-out; }
      `}</style>
      
      <Button 
        type="link" icon={<ArrowRightOutlined />} onClick={onBackToPatients}
        style={{ color: sidebarBlue, fontSize: "15px", fontWeight: 600, padding: 0, marginBottom: "16px" }}
      >
        العودة إلى إدارة المرضى
      </Button>

      <Card style={{ marginBottom: "20px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.01)" }} bodyStyle={{ padding: "16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <Title level={4} style={{ margin: 0, fontWeight: 700 }}>جدول المواعيد المتاحة</Title>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Text strong><UserOutlined /> تصفية حسب المريض:</Text>
            <Select
              value={selectedPatientId} style={{ width: 220 }}
              onChange={(value) => setSelectedPatientId(value)}
              disabled={isLoading || appointmentsList.length === 0}
            >
              <Option value="all">عرض مواعيد كل المرضى</Option>
              {uniquePatients.map(patient => (
                <Option key={patient.id} value={String(patient.id)}>{patient.name}</Option>
              ))}
            </Select>
          </div>
        </div>
      </Card>

      <div style={{ background: "#fff", borderRadius: "12px", boxShadow: "0 4px 16px rgba(0,0,0,0.02)" }}>
        {isLoading ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "280px", width: "100%" }}>
            <Spin indicator={<LoadingOutlined style={{ fontSize: 36, color: sidebarBlue }} spin />} tip="جاري تحميل جدول المواعيد..." />
          </div>
        ) : (
          <Table 
            className="blue-header-table" columns={columns} dataSource={filteredAppointments} 
            rowKey="id" scroll={{ x: true }} pagination={{ pageSize: 5 }}
            locale={{ emptyText: customEmptyRender() }}
          />
        )}
      </div>

      {/* 👈 مودال منبثق فخم يعرض بقية حقول الـ API المخفية للموعد المختار عند النقر على العين */}
      <Modal
        title={<span style={{ fontWeight: 700, fontSize: "16px" }}>تفاصيل الموعد بالكامل</span>}
        open={isDetailsModalVisible}
        onCancel={() => setIsDetailsModalVisible(false)}
        footer={[
          <Button key="close" type="primary" style={{ backgroundColor: sidebarBlue, borderColor: sidebarBlue }} onClick={() => setIsDetailsModalVisible(false)}>
            إغلاق النافذة
          </Button>
        ]}
        centered
        width={500}
      >
        {isSpecificLoading ? (
          <div style={{ textAlign: "center", padding: "40px" }}><Spin size="large" /></div>
        ) : specificData ? (
          <div style={{ direction: "rtl", paddingTop: "10px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "12px" }}>
              <div>
                <Text type="secondary" style={{ fontSize: "12px" }}>اسم المريض</Text>
                <div><Text strong style={{ fontSize: "15px" }}>{specificData?.patient?.name}</Text></div>
              </div>
              <div>
                <Text type="secondary" style={{ fontSize: "12px" }}>الطبيب المسؤول</Text>
                <div><Text strong style={{ fontSize: "15px" }}>{specificData?.doctor?.name}</Text></div>
              </div>
            </div>

            <Divider style={{ margin: "12px 0" }} />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "12px" }}>
              <div>
                <Space><CalendarOutlined style={{ color: sidebarBlue }} /><Text type="secondary">التاريخ:</Text></Space>
                <div><Text strong>{specificData?.appointment_date}</Text></div>
              </div>
              <div>
                <Space><ClockCircleOutlined style={{ color: "#ed6c02" }} /><Text type="secondary">التوقيت:</Text></Space>
                <div style={{ direction: "ltr", textAlign: "right" }}><Text strong>{specificData?.appointment_time}</Text></div>
              </div>
            </div>

            <Divider style={{ margin: "12px 0" }} />

            {/* الحقول الإضافية الرائعة التي تميز إضافة المودال والعين */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
              <div>
                <Space><HourglassOutlined style={{ color: "#722ed1" }} /><Text type="secondary">مدة الموعد:</Text></Space>
                <div><Text strong>{specificData?.duration_minutes} دقيقة</Text></div>
              </div>
              <div>
                <Space><DollarOutlined style={{ color: "#52c41a" }} /><Text type="secondary">رسوم الكشفية:</Text></Space>
                <div><Text strong style={{ color: "#2e7d32" }}>{Number(specificData?.consultation_fee || 0).toLocaleString()} ل.س</Text></div>
              </div>
            </div>

            <div style={{ background: "#fafafa", padding: "12px", borderRadius: "8px", border: "1px solid #f0f0f0" }}>
              <Space style={{ marginBottom: "4px" }}><FileTextOutlined style={{ color: "#13c2c2" }} /><Text type="secondary" style={{ fontWeight: 600 }}>ملاحظات الحجز:</Text></Space>
              <div><Text style={{ color: "#595959" }}>{specificData?.notes || "لا توجد ملاحظات مدونة لهذا الحجز."}</Text></div>
            </div>
            
            {specificData?.cancellation_reason && (
              <div style={{ background: "#fff2f0", padding: "12px", borderRadius: "8px", border: "1px solid #ffccc7", marginTop: "10px" }}>
                <Text type="danger" strong>سبب الإلغاء: </Text>
                <Text style={{ color: "#ff4d4f" }}>{specificData.cancellation_reason}</Text>
              </div>
            )}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "20px" }}><Text type="secondary">فشل تحميل تفاصيل الحجز الفنية.</Text></div>
        )}
      </Modal>
    </div>
  );
}
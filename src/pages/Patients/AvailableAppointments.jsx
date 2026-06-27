import React, { useEffect, useState } from "react";
import { Table, Button, Typography, Select, Space, Card, Tag, Spin, Empty } from "antd";
import { 
  ArrowRightOutlined, 
  CalendarOutlined, 
  ClockCircleOutlined, 
  UserOutlined, 
  LoadingOutlined,
  InboxOutlined // أيقونة للمواعيد الفارغة بشكل أغمق وعصري
} from "@ant-design/icons";
import { baby_blue } from "../../color-main/color";
import { useDispatch, useSelector } from "react-redux";
import { fetchAPPINTMENT } from "../../backend/slice/patitents/appointents/fetchAll";

const { Title, Text } = Typography;
const { Option } = Select;

// اللون الأزرق الداكن المعتمد لتغميق الأيقونة
const DARK_BLUE = "#035970"; 

export default function AvailableAppointments({ onBackToPatients }) {
  const dispatch = useDispatch();
  
  const { data: responseData, isLoading } = useSelector((state) => state.fetchAPPINTMENT);
  const appointmentsList = responseData?.data || [];

  const [selectedPatientId, setSelectedPatientId] = useState("all");
  const sidebarBlue = baby_blue; 

  useEffect(() => {
    dispatch(fetchAPPINTMENT());
  }, [dispatch]);

  const filteredAppointments = selectedPatientId === "all" 
    ? appointmentsList 
    : appointmentsList.filter(app => app.patientId === selectedPatientId);

  const uniquePatients = Array.from(
    new Map(appointmentsList.map(app => [app.patientId, app.patientName])).entries()
  ).map(([id, name]) => ({ id, name }));

  const columns = [
    { title: "رقم الموعد", dataIndex: "id", key: "id", render: (id) => <Text code>#{id}</Text> },
    { title: "اسم المريض", dataIndex: "patientName", key: "patientName", render: (text) => <Text strong>{text}</Text> },
    { title: "العيادة / التخصص", dataIndex: "clinic", key: "clinic" },
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
          <span>{text}</span>
        </Space>
      )
    },
    {
      title: "نوع الحجز",
      dataIndex: "type",
      key: "type",
      render: (type) => <Tag color="purple" style={{ borderRadius: "4px" }}>{type}</Tag>
    }
  ];

  // تخصيص واجهة الفراغ التفاعلية مع الحركة (Motion) والأيقونة الأغمق داخل الجدول
  const customEmptyRender = () => (
    <div style={{ padding: "40px 0", textAlign: "center" }}>
      <InboxOutlined className="animated-empty-icon" style={{ fontSize: "54px", color: DARK_BLUE }} />
      <div style={{ marginTop: "16px" }}>
        <Text strong style={{ fontSize: "16px", color: "#333", display: "block", marginBottom: "4px" }}>
          لا يوجد مواعيد حتى الآن
        </Text>
        <Text type="secondary" style={{ fontSize: "14px" }}>
          {selectedPatientId === "all" ? "لم يتم تسجيل أي مواعيد في النظام بعد." : "لا توجد مواعيد متوفرة لهذا المريض المحدد."}
        </Text>
      </div>
    </div>
  );

  return (
    <div style={{ width: "100%", direction: "rtl" }}>
      
      {/* حاقن الستايل: لتثبيت الهيدر، وإضافة موشن (Pulse Effect) للأيقونة الداكنة */}
      <style>{`
        .blue-header-table .ant-table-thead > tr > th {
          background-color: ${sidebarBlue} !important;
          color: #ffffff !important;
          font-weight: 700 !important;
          border-bottom: none !important;
          border-radius: 0px !important;
        }
        .blue-header-table .ant-table-container {
          border-radius: 12px !important;
          overflow: hidden !important;
        }
        /* أنيميشن نبض ناعم للأيقونة */
        @keyframes pulseMotion {
          0% { transform: scale(1); opacity: 0.85; }
          50% { transform: scale(1.08); opacity: 1; filter: drop-shadow(0 4px 8px rgba(3, 89, 112, 0.25)); }
          100% { transform: scale(1); opacity: 0.85; }
        }
        .animated-empty-icon {
          animation: pulseMotion 2.5s infinite ease-in-out;
        }
      `}</style>
      
      <Button 
        type="link" 
        icon={<ArrowRightOutlined />} 
        onClick={onBackToPatients}
        style={{ color: sidebarBlue, fontSize: "15px", fontWeight: 600, padding: 0, marginBottom: "16px" }}
      >
        العودة إلى إدارة المرضى
      </Button>

      <Card 
        style={{ marginBottom: "20px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.01)" }}
        bodyStyle={{ padding: "16px" }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <Title level={4} style={{ margin: 0, fontWeight: 700 }}>جدول المواعيد المتاحة

          </Title>
          
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Text strong><UserOutlined /> تصفية حسب المريض:</Text>
            <Select
              value={selectedPatientId}
              style={{ width: 220 }}
              onChange={(value) => setSelectedPatientId(value)}
              disabled={isLoading || appointmentsList.length === 0}
            >
              <Option value="all">عرض مواعيد كل المرضى</Option>
              {uniquePatients.map(patient => (
                <Option key={patient.id} value={patient.id}>{patient.name}</Option>
              ))}
            </Select>
          </div>
        </div>
      </Card>

      <div style={{ background: "#fff", borderRadius: "12px", boxShadow: "0 4px 16px rgba(0,0,0,0.02)" }}>
        
        {isLoading ? (
          /* حالة التحميل تظل منفصلة لضمان أفضل تجربة للمستخدم */
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "280px", width: "100%" }}>
            <Spin indicator={<LoadingOutlined style={{ fontSize: 36, color: sidebarBlue }} spin />} tip="جاري تحميل جدول المواعيد..." />
          </div>
        ) : (
          /* الجدول سيعرض دائماً مع الهيدر؛ وفي حال عدم وجود بيانات سيقوم بحقن الـ Empty المخصص بالداخل تلقائياً */
          <Table 
            className="blue-header-table"
            columns={columns} 
            dataSource={filteredAppointments} 
            rowKey="id"
            scroll={{ x: true }}
            pagination={{ pageSize: 5 }}
            locale={{
              emptyText: customEmptyRender()
            }}
          />
        )}
      </div>
    </div>
  );
}
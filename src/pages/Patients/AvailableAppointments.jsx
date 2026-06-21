import React, { useState } from "react";
import { Table, Button, Typography, Select, Space, Card, Tag } from "antd";
import { ArrowRightOutlined, CalendarOutlined, ClockCircleOutlined, UserOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { Option } = Select;

const allAppointments = [
  { id: 101, patientId: 1, patientName: "أحمد محمود العلي", clinic: "عيادة القلب", date: "2026-06-22", time: "10:00 ص", type: "معاينة أولى" },
  { id: 102, patientId: 2, patientName: "فاطمة عمر حسن", clinic: "عيادة الأطفال", date: "2026-06-22", time: "11:30 ص", type: "مراجعة دورية" },
  { id: 103, patientId: 1, patientName: "أحمد محمود العلي", clinic: "عيادة القلب", date: "2026-06-25", time: "01:00 م", type: "استشارة ومتابعة" },
  { id: 104, patientId: 3, patientName: "يوسف خالد منصور", clinic: "جراحة العظام", date: "2026-06-26", time: "09:00 ص", type: "معاينة أولى" },
];

export default function AvailableAppointments({ onBackToPatients }) {
  const [selectedPatientId, setSelectedPatientId] = useState("all");
  const sidebarBlue = "#2ca8c9"; // اللون الأزرق الأساسي للنظام

  const filteredAppointments = selectedPatientId === "all" 
    ? allAppointments 
    : allAppointments.filter(app => app.patientId === selectedPatientId);

  const columns = [
    {
      title: "رقم الموعد",
      dataIndex: "id",
      key: "id",
      render: (id) => <Text code>#{id}</Text>
    },
    {
      title: "اسم المريض",
      dataIndex: "patientName",
      key: "patientName",
      render: (text) => <Text strong>{text}</Text>
    },
    {
      title: "العيادة / التخصص",
      dataIndex: "clinic",
      key: "clinic",
    },
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
      render: (type) => (
        <Tag color="purple" style={{ borderRadius: "4px" }}>{type}</Tag>
      )
    }
  ];

  return (
    <div style={{ width: "100%", direction: "rtl" }}>
      
      {/* حاقن مخصص لتغيير ستايل هيدر الجدول للون الأزرق في صفحة المواعيد أيضاً */}
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
          <Title level={4} style={{ margin: 0, fontWeight: 700 }}>جدول المواعيد المتاحة</Title>
          
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Text strong><UserOutlined /> تصفية حسب المريض:</Text>
            <Select
              defaultValue="all"
              style={{ width: 220 }}
              onChange={(value) => setSelectedPatientId(value)}
            >
              <Option value="all">عرض مواعيد كل المرضى</Option>
              <Option value={1}>أحمد محمود العلي</Option>
              <Option value={2}>فاطمة عمر حسن</Option>
              <Option value={3}>يوسف خالد منصور</Option>
            </Select>
          </div>
        </div>
      </Card>

      <div style={{ background: "#fff", borderRadius: "12px", boxShadow: "0 4px 16px rgba(0,0,0,0.02)" }}>
        <Table 
          className="blue-header-table"
          columns={columns} 
          dataSource={filteredAppointments} 
          rowKey="id"
          scroll={{ x: true }}
          pagination={{ pageSize: 5 }}
        />
      </div>
    </div>
  );
}
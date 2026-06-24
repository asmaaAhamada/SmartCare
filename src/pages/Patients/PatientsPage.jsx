import React, { useState } from "react";
import { Table, Button, Tooltip, Tag, Space, Avatar, Typography, Popconfirm } from "antd";
import { 
  EyeOutlined, 
  CheckCircleOutlined, 
  CloseCircleOutlined, 
  CalendarOutlined 
} from "@ant-design/icons";
import { baby_blue } from "../../color-main/color";

const { Title, Text } = Typography;

const initialPatients = [
  { id: 1, name: "أحمد محمود العلي", avatar: "", email: "ahmed.ali@mail.com", phone: "0501112223", status: "active" },
  { id: 2, name: "فاطمة عمر حسن", avatar: "", email: "fatima.h@mail.com", phone: "0504445556", status: "inactive" },
  { id: 3, name: "يوسف خالد منصور", avatar: "", email: "youssef.m@mail.com", phone: "0507778889", status: "active" },
];

export default function PatientsPage({ onNavigateToAppointments, onViewDetails }) {
  const [patients, setPatients] = useState(initialPatients);
  const sidebarBlue =baby_blue; // اللون الأزرق الأساسي للنظام

  const handleToggleStatus = (id) => {
    setPatients(patients.map(p => {
      if (p.id === id) {
        return { ...p, status: p.status === "active" ? "inactive" : "active" };
      }
      return p;
    }));
  };

  const columns = [
    {
      title: "المريض",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Space size="middle">
          <Avatar 
            src={record.avatar} 
            style={{ backgroundColor: `${sidebarBlue}20`, color: sidebarBlue, fontWeight: 600 }}
          >
            {text.charAt(0)}
          </Avatar>
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    {
      title: "البريد الإلكتروني",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "رقم الهاتف",
      dataIndex: "phone",
      key: "phone",
      render: (text) => <span style={{ direction: "ltr", display: "inline-block" }}>{text}</span>
    },
    {
      title: "الحالة",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "active" ? "success" : "error"} style={{ borderRadius: "4px", fontWeight: 600 }}>
          {status === "active" ? "نشط" : "مجمّد"}
        </Tag>
      ),
    },
    {
      title: "العمليات والإجراءات",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="عرض التفاصيل الكاملة">
            <Button 
              type="text" 
              icon={<EyeOutlined style={{ color: sidebarBlue }} />} 
              style={{ backgroundColor: `${sidebarBlue}10` }}
              onClick={() => onViewDetails(record)}
            />
          </Tooltip>

          <Popconfirm
            title="تغيير حالة المريض"
            description={`هل أنت متأكد من ${record.status === "active" ? "تجميد" : "تفعيل"} حساب المريض؟`}
            onConfirm={() => handleToggleStatus(record.id)}
            okText="نعم"
            cancelText="تراجع"
            placement="topLeft"
          >
            <Tooltip title={record.status === "active" ? "تجميد الحساب" : "تفعيل الحساب"}>
              <Button 
                type="text" 
                icon={record.status === "active" ? <CloseCircleOutlined style={{ color: "#ed6c02" }} /> : <CheckCircleOutlined style={{ color: "#2e7d32" }} />} 
                style={{ backgroundColor: record.status === "active" ? "#fff3e0" : "#e8f5e9" }}
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ width: "100%", direction: "rtl" }}>
      
      {/* حاقن مخصص لتغيير ستايل هيدر الجدول للون الأزرق مثل السكرين شوت تماماً */}
      <style>{`
        .blue-header-table .ant-table-thead > tr > th {
          background-color: ${sidebarBlue} !important;
          color: #ffffff !important;
          font-weight: 700 !important;
          border-bottom: none !important;
          border-radius: 0px !important;
        }
        /* لإبقاء الحواف الدائرية للجدول الخارجي أنيقة */
        .blue-header-table .ant-table-container {
          border-radius: 12px !important;
          overflow: hidden !important;
        }
      `}</style>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <Title level={3} style={{ margin: 0, fontWeight: 700, color: "#333" }}>إدارة المرضى</Title>
        </div>

        <Button
          type="primary"
          icon={<CalendarOutlined />}
          onClick={onNavigateToAppointments}
          style={{
            backgroundColor: sidebarBlue,
            borderColor: sidebarBlue,
            height: "40px",
            borderRadius: "8px",
            fontWeight: 600,
            boxShadow: `0 4px 12px ${sidebarBlue}30`
          }}
        >
          عرض المواعيد المتاحة
        </Button>
      </div>

      <div style={{ background: "#fff", borderRadius: "12px", boxShadow: "0 4px 16px rgba(0,0,0,0.02)" }}>
        <Table 
          className="blue-header-table"
          columns={columns} 
          dataSource={patients} 
          rowKey="id"
          scroll={{ x: true }}
          pagination={{ pageSize: 5 }}
        />
      </div>
    </div>
  );
}
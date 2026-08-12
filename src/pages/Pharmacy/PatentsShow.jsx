import React, { useEffect, useState, lazy, Suspense } from "react";
import { Table, Button, Tooltip, Tag, Space, Avatar, Typography, Skeleton } from "antd";
import { ManOutlined, WomanOutlined, MedicineBoxOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { SHOWPATEINTS } from "../../backend/slice/pharmecy/fetchAllPateints";

// استدعاء المودال كـ Lazy Component
const DispenseModal = lazy(() => import("./DispenseModal"));

const { Title, Text } = Typography;

export default function PatientsShow({ onNavigateToAppointments }) {
  const dispatch = useDispatch();
  const { data: responseData, isLoading } = useSelector((state) => state.SHOWPATEINTS);
  console.log(responseData)
  // حالات التحكم بالمودال الكسول
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  useEffect(() => {
    dispatch(SHOWPATEINTS());
  }, [dispatch]);

  const sidebarBlue = '#4A148C'; 

  const patients = responseData?.data?.map((patient) => ({
    id: patient.id,
    key: patient.id,
    name: `${patient.first_name ?? ""} ${patient.last_name ?? ""}`,
    gender: patient.gender,
    email: patient.email,
    phone: patient.phone,
    status: patient.status,
  })) || [];

  const handleOpenDispense = (id) => {
    setSelectedPatientId(id);
    setIsModalVisible(true);
  };

  const columns = [
    {
      title: "المريض",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Space size="middle">
          <Avatar style={{ backgroundColor: `${sidebarBlue}20`, color: sidebarBlue, fontWeight: 600 }}>
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
      title: "الجنس",
      dataIndex: "gender",
      key: "gender",
      align: "center",
      render: (gender) => {
        const value = (gender || "").toLowerCase();
        const isMale = value === "male" || value === "ذكر" || value === "m";
        return isMale ? (
          <Tag icon={<ManOutlined />} color="blue" style={{ borderRadius: 20, padding: "4px 12px", fontWeight: 600 }}>ذكر</Tag>
        ) : (
          <Tag icon={<WomanOutlined />} color="magenta" style={{ borderRadius: 20, padding: "4px 12px", fontWeight: 600 }}>أنثى</Tag>
        );
      },
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
          <Tooltip title="صرف وصفة طبية">
            <Button 
              type="text" 
              icon={<MedicineBoxOutlined style={{ color: "#2e7d32", fontSize: "18px" }} />} 
              style={{ backgroundColor: "#e8f5e9", display: "flex", alignItems: "center", justifyContent: "center" }}
              onClick={() => handleOpenDispense(record.id)} 
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

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
        .blue-header-table .ant-table-container {
          border-radius: 12px !important;
          overflow: hidden !important;
        }
      `}</style>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <Title level={3} style={{ margin: 0, fontWeight: 700, color: "#333" }}>إدارة المرضى</Title>
        </div>
      </div>

      <div style={{ background: "#fff", borderRadius: "12px", boxShadow: "0 4px 16px rgba(0,0,0,0.02)" }}>
        <Table
          className="blue-header-table"
          loading={isLoading}
          columns={columns}
          dataSource={patients}
          rowKey="id"
          scroll={{ x: true }}
          pagination={{ pageSize: 5 }}
        />
      </div>

      {/* الاستدعاء الآمن للمكون الكسول مع مؤشر تحميل مخصص */}
      <Suspense fallback={<Skeleton active title={false} paragraph={{ rows: 2 }} />}>
        <DispenseModal 
          visible={isModalVisible} 
          onClose={() => setIsModalVisible(false)} 
          patientId={selectedPatientId} 
        />
      </Suspense>
    </div>
  );
}
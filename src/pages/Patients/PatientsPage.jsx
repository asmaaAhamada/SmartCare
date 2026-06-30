import React, { useEffect, useState } from "react";
import { Table, Button, Tooltip, Tag, Space, Avatar, Typography } from "antd";
import {
  EyeOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  CalendarOutlined,
  ManOutlined,
  WomanOutlined,
} from "@ant-design/icons";
import { baby_blue } from "../../color-main/color";
import { useDispatch, useSelector } from "react-redux";
import { fetchpatients } from "../../backend/slice/patitents/fetchAll";
import { fetchDetailspatitnent, resetDetails } from "../../backend/slice/patitents/deteails";
import PatientProfileModal from "./details";
import VerifyPatientModal from "./vrifypatient";

const { Title, Text } = Typography;

export default function PatientsPage({ onNavigateToAppointments }) {
  const dispatch = useDispatch();
  const { data: responseData, isLoading } = useSelector((state) => state.fetchpatients);
  
  // حالات التحكم بالمودالات
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isVerifyModalVisible, setIsVerifyModalVisible] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    dispatch(fetchpatients());
  }, [dispatch]);

  const sidebarBlue = baby_blue; 

  // دالة تُستدعى عند فتح مودال تغيير الحالة لتحديد بيانات المريض المستهدف
  const handleOpenVerifyModal = (record) => {
    setSelectedPatient(record);
    setIsVerifyModalVisible(true);
  };

  // دالة لإعادة جلب البيانات وتحديث الجدول تلقائياً عند نجاح العملية في المودال
  const handleStatusChangeSuccess = () => {
    dispatch(fetchpatients());
  };

  const handleOpenDetails = (id) => {
    dispatch(resetDetails()); 
    dispatch(fetchDetailspatitnent(id)); 
    setIsModalVisible(true); 
  };

  // تم تصحيح الفحص هنا ليقرأ الـ status القادمة من الـ API مباشرة ("active" أو "suspended")
  const patients = responseData?.data?.map((patient) => ({
    id: patient.id,
    key: patient.id,
    name: `${patient.first_name ?? ""} ${patient.last_name ?? ""}`,
    gender: patient.gender,
    email: patient.email,
    phone: patient.phone,
    status: patient.status, // 👈 قراءة الحالة المباشرة الصحيحة من السيرفر
  })) || [];

  const columns = [
    {
      title: "المريض",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Space size="middle">
          <Avatar 
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
      title: "الجنس",
      dataIndex: "gender",
      key: "gender",
      align: "center",
      render: (gender) => {
        const value = (gender || "").toLowerCase();
        const isMale = value === "male" || value === "ذكر" || value === "m";

        return isMale ? (
          <Tag icon={<ManOutlined />} color="blue" style={{ borderRadius: 20, padding: "4px 12px", fontWeight: 600 }}>
            ذكر
          </Tag>
        ) : (
          <Tag icon={<WomanOutlined />} color="magenta" style={{ borderRadius: 20, padding: "4px 12px", fontWeight: 600 }}>
            أنثى
          </Tag>
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
          <Tooltip title="عرض التفاصيل الكاملة">
            <Button 
              type="text" 
              icon={<EyeOutlined style={{ color: sidebarBlue }} />} 
              style={{ backgroundColor: `${sidebarBlue}10` }}
              onClick={() => handleOpenDetails(record.id)} 
            />
          </Tooltip>

          {/* تعتمد الأيقونة واللون الآن بشكل كامل ودقيق على المسمى النصي الفعلي القادم من الـ API */}
          <Tooltip title={record.status === "active" ? "تجميد الحساب" : "تفعيل الحساب"}>
            <Button 
              type="text" 
              icon={record.status === "active" ? <CloseCircleOutlined style={{ color: "#ed6c02" }} /> : <CheckCircleOutlined style={{ color: "#2e7d32" }} />} 
              style={{ backgroundColor: record.status === "active" ? "#fff3e0" : "#e8f5e9" }}
              onClick={() => handleOpenVerifyModal(record)} 
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
          loading={isLoading}
          columns={columns}
          dataSource={patients}
          rowKey="id"
          scroll={{ x: true }}
          pagination={{ pageSize: 5 }}
        />
      </div>

      {/* مودال تفاصيل الملف الشخصي للمريض */}
      <PatientProfileModal 
        visible={isModalVisible} 
        onClose={() => setIsModalVisible(false)} 
        mode="light" 
      />

      {/* مودال تجميد وتفعيل حساب المريض */}
      <VerifyPatientModal
        open={isVerifyModalVisible}
        patientData={selectedPatient}
        onCancel={() => setIsVerifyModalVisible(false)}
        onSuccess={handleStatusChangeSuccess}
      />
    </div>
  );
}
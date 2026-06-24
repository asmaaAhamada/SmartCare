import React, { useState, lazy, Suspense } from "react";
import { Table, Button, Tooltip, Avatar, Popconfirm, Typography, Space, Spin } from "antd";
import { 
  PlusOutlined, 
  EyeOutlined, 
  EditOutlined, 
  CheckCircleOutlined, 
  DeleteOutlined 
} from "@ant-design/icons";
import { baby_blue } from "../../color-main/color";

// استدعاء الكومبوننت بشكل Lazy لتخفيف حجم الكود المبدئي للشاشة
const DoctorProfileModal = lazy(() => import("./DoctorProfileModal"));

const { Title } = Typography;

const initialDoctors = [
  {
    key: 1,
    id: 1,
    name: "د. عبد الله الشمري",
    specialty: "طب وجراحة القلب",
    email: "a.shammari@care.com",
    phone: "0501234567",
    avatar: "", 
    verified: true,
  },
  {
    key: 2,
    id: 2,
    name: "د. سارة الأحمد",
    specialty: "طب الأطفال وحديثي الولادة",
    email: "s.ahmed@care.com",
    phone: "0507654321",
    avatar: "",
    verified: false,
  },
  {
    key: 3,
    id: 3,
    name: "د. خالد منصور",
    specialty: "جراحة العظام والمفاصل",
    email: "k.mansour@care.com",
    phone: "0509876543",
    avatar: "",
    verified: true,
  },
];

export default function DoctorPage() {
  const [doctors, setDoctors] = useState(initialDoctors);
  
  // حالات التحكم بالمودال الكسول
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const sidebarBlue =baby_blue; // لون السايد بار المعتمد

  const handleAddDoctor = () => console.log("إضافة طبيب");
  const handleEdit = (id) => console.log("تعديل", id);
  const handleVerify = (id) => console.log("توثيق", id);
  
  const handleDelete = (id) => {
    setDoctors(doctors.filter((doc) => doc.id !== id));
  };

  // عند الضغط على أيقونة العين (View)
  const handleView = (doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: "الطبيب",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Space size="middle">
          <Avatar 
            src={record.avatar} 
            style={{ backgroundColor: `${sidebarBlue}20`, color: sidebarBlue, fontWeight: 600 }}
          >
            {record.name.split(" ")[1]?.charAt(0) || record.name.charAt(2)}
          </Avatar>
          <span style={{ fontWeight: 600, color: "#444" }}>{text}</span>
        </Space>
      ),
    },
    {
      title: "التخصص",
      dataIndex: "specialty",
      key: "specialty",
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
      render: (text) => <span style={{ direction: "ltr", display: "inline-block" }}>{text}</span>,
    },
    {
      title: "العمليات والإجراءات",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="عرض التفاصيل">
            <Button 
              type="text" 
              icon={<EyeOutlined />} 
              onClick={() => handleView(record)} // نمرر الكائن كاملاً لبناء البروفايل
              style={{ color: "#0288d1", backgroundColor: "#0288d110" }}
            />
          </Tooltip>

          <Tooltip title="تعديل البيانات">
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              onClick={() => handleEdit(record.id)}
              style={{ color: "#ed6c02", backgroundColor: "#ed6c0210" }}
            />
          </Tooltip>

          <Tooltip title={record.verified ? "الحساب موثق بالفعل" : "توثيق واعتماد الحساب"}>
            <Button 
              type="text" 
              icon={<CheckCircleOutlined />} 
              onClick={() => handleVerify(record.id)}
              disabled={record.verified}
              style={{ 
                color: record.verified ? "#2e7d32" : "#4caf50", 
                backgroundColor: record.verified ? "#2e7d3215" : "#4caf5010" 
              }}
            />
          </Tooltip>

          <Tooltip title="حذف الطبيب">
            <Popconfirm
              title="حذف الطبيب"
              description="هل أنت متأكد من حذف هذا الطبيب؟"
              onConfirm={() => handleDelete(record.id)}
              okText="نعم"
              cancelText="تراجع"
              placement="topRight"
            >
              <Button 
                type="text" 
                danger 
                icon={<DeleteOutlined />} 
                style={{ backgroundColor: "#ff4d4f10" }}
              />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ width: "100%", direction: "rtl", padding: "16px" }}>
      
      {/* الهيدر العلوي لعنوان الصفحة */}
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        marginBottom: "24px",
        flexWrap: "wrap",
        gap: "16px"
      }}>
        <Title level={3} style={{ margin: 0, fontWeight: 700, color: "#333" }}>
          إدارة الأطباء
        </Title>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddDoctor}
          style={{
            backgroundColor: sidebarBlue,
            borderColor: sidebarBlue,
            height: "40px",
            borderRadius: "8px",
            fontWeight: 600,
            boxShadow: `0 4px 12px ${sidebarBlue}40`
          }}
        >
          إضافة طبيب جديد
        </Button>
      </div>

      <style>{`
        .custom-antd-table .ant-table-thead > tr > th {
          background-color: ${sidebarBlue} !important;
          color: #ffffff !important;
          font-weight: 700 !important;
          font-size: 15px !important;
          text-align: right !important;
        }
        .custom-antd-table .ant-table-thead > tr > th::before {
          display: none !important; 
        }
      `}</style>

      <Table 
        className="custom-antd-table"
        columns={columns} 
        dataSource={doctors} 
        scroll={{ x: 700 }}
        pagination={{ pageSize: 5 }}
        bordered
        style={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0,0,0,0.04)"
        }}
      />

      {/* استدعاء المودال الكسول داخل Suspense لإظهار مؤشر تحميل بسيط عند فتحه لأول مرة */}
      <Suspense fallback={<Spin size="large" fullscreen />}>
        <DoctorProfileModal
          visible={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedDoctor(null);
          }}
          doctor={selectedDoctor}
          sidebarBlue={sidebarBlue}
        />
      </Suspense>
    </div>
  );
}
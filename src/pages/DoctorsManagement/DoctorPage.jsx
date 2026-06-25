import React, { useState, lazy, Suspense, useEffect } from "react";
import { Table, Button, Tooltip, Avatar, Typography, Space, Spin, Modal } from "antd";
import { 
  PlusOutlined, 
  EyeOutlined, 
  EditOutlined, MinusCircleOutlined,CheckCircleFilled,
  CheckCircleOutlined, CloseCircleOutlined,
  DeleteOutlined 
} from "@ant-design/icons";
import { baby_blue } from "../../color-main/color";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctors } from "../../backend/slice/doctors/fetchAll";
import { vrifyDoctors } from "../../backend/slice/doctors/verfiy"; // تأكدي من المسار الصحيح للسلايس
import {
  ManOutlined,
  WomanOutlined,
} from "@ant-design/icons";
import { fetchDetailsDoctors } from "../../backend/slice/doctors/deteails";
import DeleteDoctorsModal from "./deletDoctors";

// استدعاء الكومبوننتات بشكل Lazy لتخفيف حجم الكود المبدئي للشاشة
const DoctorProfileModal = lazy(() => import("./DoctorProfileModal"));
const AddDoctorForm = lazy(() => import("./AddDoctorForm"));
import VerifyDoctorModal from "./VerifyDoctorModal";
import DoctorsEmpty from "../empty/DoctorsEmpty";
const { Title } = Typography;

export default function DoctorPage() {
  const dispatch = useDispatch();
  const { data: responseData, isLoading } = useSelector((state) => state.fetchDoctors);

  console.log(responseData);

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  // حالات التحكم بالمودالات
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const sidebarBlue = baby_blue; // لون السايد بار المعتمد

  const handleAddDoctor = () => setIsAddModalOpen(true);
  const handleEdit = (id) => console.log("تعديل", id);
  const handleVerify = (id) => console.log("توثيق", id);
  
  const handleDelete = (doctor) => {
    setSelectedDoctor(doctor);
    setIsDeleteModalOpen(true);
  };

  // عند الضغط على أيقونة العين (View)
  const handleView = (doctor) => {
    dispatch(fetchDetailsDoctors(doctor.id));
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: "الاسم",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Space>
          <Avatar
            src={record.avatar}
            style={{
              backgroundColor: record.gender === "male" ? "#e6f4ff" : "#fff0f6",
              color: record.gender === "male" ? "#1677ff" : "#d63384",
              fontWeight: 700,
            }}
          >
            {record.name?.charAt(0)}
          </Avatar>
          {text}
        </Space>
      ),
    },
    {
      title: "التخصص",
      dataIndex: "specialty",
      key: "specialty",
    },
    {
      title: "الجنس",
      dataIndex: "gender",
      key: "gender",
      render: (gender) => (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "4px 12px",
            borderRadius: "20px",
            backgroundColor: gender === "male" ? "#e6f4ff" : "#fff0f6",
            color: gender === "male" ? "#1677ff" : "#d63384",
            fontWeight: 600,
          }}
        >
          {gender === "male" ? (
            <>
              <ManOutlined />
              ذكر
            </>
          ) : (
            <>
              <WomanOutlined />
              أنثى
            </>
          )}
        </span>
      ),
    },
    {
      title: "التقييم",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "الحالة",
      dataIndex: "verified",
      key: "verified",
      render: (verified) => (
        <span
          style={{
            color: verified ? "#52c41a" : "#faad14",
            fontWeight: 600,
          }}
        >
          {verified ? "موثق" : "غير موثق"}
        </span>
      ),
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
              onClick={() => handleView(record)}
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

     <Tooltip title={record.verified ? "الحساب موثق (اضغط لإلغاء التوثيق)" : "الحساب غير موثق (اضغط للتوثيق)"}>
        <Button 
          type="text" 
          // 🌟 الأيقونة الآن تعكس الحالة الحالية بدقة
          icon={record.verified ? <CheckCircleFilled /> : <MinusCircleOutlined />} 
          onClick={() => {
            setSelectedDoctor(record); // تمرير البيانات وتخزين الطبيب المحدد بالـ state
            setIsVerifyModalOpen(true); // فتح المودال
          }}
          style={{ 
            // 🌟 الألوان متناسقة مع طبيعة الحالة الحالية
            color: record.verified ? "#035970" : "#999", // الكحلي المعتمد للموثق، والرمادي للهادئ غير الموثق
            backgroundColor: record.verified ? "#03597015" : "#00000008",
            transition: "all 0.3s ease",
            borderRadius: "6px"
          }}
        />
      </Tooltip>

          <Tooltip title="حذف الطبيب">
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record)}
              style={{
                backgroundColor: "#ff4d4f10",
              }}
            />
          </Tooltip>
        </Space>
      ),
    },     
  ];

  const doctors = responseData?.data?.map((doctor) => ({
    key: doctor.id,
    id: doctor.id,
    name: `${doctor.user?.profile?.first_name} ${doctor.user?.profile?.last_name}`,
    gender: doctor.user?.profile?.gender,
    specialty: doctor.specialty?.name_ar,
    rating: doctor.rating,
    avatar: doctor.user?.profile?.avatar_url,
    verified: doctor.is_verified,
  })) || [];

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
  loading={isLoading}
  columns={columns}
  dataSource={doctors}
  rowKey="id"
  scroll={{ x: 700 }}
  pagination={{ pageSize: 5 }}
  bordered
  locale={{
    emptyText: <DoctorsEmpty />,
  }}
  style={{
    backgroundColor: "#fff",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 20px rgba(0,0,0,0.04)"
  }}
/>

      {/* موديل عرض بروفايل الطبيب */}
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

      {/* موديل إضافة طبيب جديد */}
      <Suspense fallback={<Spin size="large" fullscreen />}>
        <Modal
          open={isAddModalOpen}
          onCancel={() => setIsAddModalOpen(false)}
          footer={null}
          width={850}
          destroyOnClose
          styles={{ body: { padding: 0 } }}
        >
          <AddDoctorForm onCancel={() => setIsAddModalOpen(false)} />
        </Modal>
      </Suspense>

      {/* موديل حذف طبيب */}
      <DeleteDoctorsModal
        open={isDeleteModalOpen}
        doctorData={selectedDoctor}
        onCancel={() => {
          setIsDeleteModalOpen(false);
          setSelectedDoctor(null);
        }}
        onSuccess={() => {
          dispatch(fetchDoctors());
          setIsDeleteModalOpen(false);
          setSelectedDoctor(null);
        }}
      />
      {/* موديل توثيق / إلغاء توثيق الطبيب المشترك */}
     <VerifyDoctorModal
  open={isVerifyModalOpen}
  doctorData={selectedDoctor}
  onCancel={() => {
    setIsVerifyModalOpen(false);
    setSelectedDoctor(null);
  }}
  onSuccess={(id) => {
    // استدعاء الثانك الخاص بكِ ممرراً له الـ id
  dispatch(vrifyDoctors(id))
  .unwrap()
  .then(() => {
    dispatch(fetchDoctors());

    // انتظر 3 ثواني حتى تظهر رسالة النجاح
    setTimeout(() => {
      setIsVerifyModalOpen(false);
      setSelectedDoctor(null);
    }, 3000);
  })
  }}
/>
    </div>
  );
}
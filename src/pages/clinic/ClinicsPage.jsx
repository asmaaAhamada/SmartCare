import React, { useEffect, useState } from "react";
import { Row, Col, Card, Table, Button, Tooltip, Popconfirm, Typography, Space, Badge, Empty, Spin } from "antd";
import { 
  PlusOutlined, 
  EyeOutlined, 
  EditOutlined, 
  CheckCircleOutlined, 
  CloseCircleOutlined,
  DeleteOutlined,
  HomeOutlined,
  ArrowRightOutlined,
  IdcardOutlined,      // رقم العيادة
  HeartOutlined,       // التخصص عربي
  GlobalOutlined,      // التخصص إنجليزي
  TagOutlined,         // رقم التخصص
  EnvironmentOutlined, // الطابق
  FolderOpenOutlined,  // رقم الغرفة
  PhoneOutlined,       // رقم الهاتف
  TeamOutlined,        // عدد الأطباء
  FileTextOutlined,    // الوصف
  CalendarOutlined,    // تاريخ الإنشاء
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchClinic } from "../../backend/slice/clinic/fetchAll";
import EmptyClinics from "../empty/EmptyClinics";
import CreateClinicModal from "./CreateClinicModal";
import { fetchDetailsclincs } from "../../backend/slice/clinic/deteails";
import ToggleClinicStatusModal from "./VerifyClinicModal";
import DeleteClinicModal from "./deletClinic";

const { Title, Text } = Typography;

export default function ClinicsPage() {
  const dispatch = useDispatch();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [selectedClinic, setSelectedClinic] = useState(null);
const [openToggle, setOpenToggle] = useState(false);
  // جلب حالة التحميل والبيانات من السلايس
  const { data: responseData, isLoading } = useSelector((state) => state.fetchClinic);
  const {
    data: clinicDetails,
    isLoading: detailsLoading,
    error,
  } = useSelector((state) => state.fetchDetailsclincs);

  // استخراج مصفوفة العيادات الفعلية من الـ response
  const clinics = responseData?.data || [];

  // حالة لمعرفة العيادة التي يتم عرض تفاصيلها حالياً
  const [viewingClinic, setViewingClinic] = useState(null); 
  
  const sidebarBlue = "#17a2b8"; // لون التصميم المعتمد المائل للأزرق السماوي/التيل

  useEffect(() => {
    dispatch(fetchClinic());
  }, [dispatch]);

  const handleAddClinic = () => console.log("إضافة عيادة جديدة");
  const handleEditClinic = (id) => console.log("تعديل بيانات العيادة رقم", id);
const toggleClinicStatus = (clinic) => {
    setSelectedClinic(clinic);
    setOpenToggle(true);
}; 
const handleDeleteClinic = (clinic) => {
  setSelectedClinic(clinic);
  setOpenDelete(true);
};
  // أعمدة جدول الأطباء في صفحة التفاصيل
  const doctorColumns = [
    {
      title: "اسم الطبيب",
      dataIndex: "name",
      key: "name",
      render: (text) => <span style={{ fontWeight: 600, color: "#444" }}>{text}</span>,
    },
    {
      title: "التخصص الدقيق",
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
    }
  ];

  // دالة مساعدة لبناء كروت المعلومات الصغيرة المتطابقة مع التصميم الجديد
  const renderInfoCard = (title, value, icon) => (
    <Card 
      bordered={false} 
      style={{ 
        borderRadius: "10px", 
        backgroundColor: "#fff", 
        boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
        border: "1px solid #f0f0f0",
        height: "100%"
      }}
      bodyStyle={{ padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}
    >
      <div style={{ flex: 1 }}>
        <Text type="secondary" style={{ fontSize: "12px", display: "block", color: sidebarBlue, marginBottom: "4px" }}>
          {title}
        </Text>
        <Text strong style={{ fontSize: "14px", color: "#222" }}>
          {value !== undefined && value !== null && value !== "" ? value : "—"}
        </Text>
      </div>
      <div style={{ 
        fontSize: "20px", 
        color: sidebarBlue, 
        backgroundColor: `${sidebarBlue}10`, // خلفية شفافة من نفس اللون
        padding: "10px", 
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        {icon}
      </div>
    </Card>
  );

  // ----------------------------------------------------
  // الشاشة رقم 2: شاشة عرض تفاصيل عيادة واحدة (التصميم المحدث)
  // ----------------------------------------------------
  if (viewingClinic) {
    if (detailsLoading) {
      return (
        <div style={{ minHeight: "300px", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Spin size="large" tip="جاري تحميل تفاصيل العيادة..." />
        </div>
      );
    }
    if (!clinicDetails) {
      return <Empty description="لا توجد بيانات لهذه العيادة" />;
    }
    
    return (
      <div style={{ width: "100%", direction: "rtl", padding: "16px", backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
        
        {/* زر العودة العلوي المنفصل */}
        <Button 
          type="default" 
          icon={<ArrowRightOutlined />} 
          onClick={() => setViewingClinic(null)}
          style={{ 
            color: sidebarBlue, 
            borderColor: sidebarBlue, 
            borderRadius: "6px", 
            fontWeight: 600, 
            marginBottom: "20px" 
          }}
        >
          العودة إلى قائمة العيادات
        </Button>

        {/* كرت الهيدر الرئيسي العلوي */}
        <Card 
          bordered={false} 
          style={{ 
            borderRadius: "12px", 
            marginBottom: "20px", 
            boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
            border: "1px solid #f0f0f0"
          }}
          bodyStyle={{ padding: "20px" }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{ 
                width: "60px", 
                height: "60px", 
                backgroundColor: "#0d5c75", 
                borderRadius: "50%", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                color: "#fff", 
                fontSize: "28px" 
              }}>
                <HomeOutlined />
              </div>
              <div>
                <Title level={4} style={{ margin: 0, color: "#0d5c75", fontWeight: 700 }}>
                  {clinicDetails.name}
                </Title>
                <Text type="secondary" style={{ fontSize: "13px" }}>
                  كود العيادة المرجعي #{clinicDetails.id}
                </Text>
              </div>
            </div>
            
            <div style={{ textAlign: "left" }}>
              <Badge 
                status="success" 
                text={clinicDetails.is_active ? "نشطة" : "معطلة"} 
                style={{ 
                  backgroundColor: "#e6f7ed", 
                  color: "#28a745", 
                  padding: "6px 16px", 
                  borderRadius: "20px",
                  fontWeight: "bold"
                }} 
              />
              <div style={{ marginTop: "8px" }}>
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  <CalendarOutlined style={{ marginLeft: "4px" }} />
                  تاريخ الإنشاء: {new Date(clinicDetails.created_at).toLocaleDateString("ar", { year: 'numeric', month: 'long', day: 'numeric' })}, {new Date(clinicDetails.created_at).toLocaleTimeString("ar", { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </div>
            </div>
          </div>
        </Card>

        {/* قسم معلومات العيادة (Grid من الكروت الصغيرة المرتبة) */}
        <div style={{ marginBottom: "12px" }}>
          <Text strong style={{ fontSize: "16px", color: "#333", display: "flex", alignItems: "center", marginBottom: "16px" }}>
            <span style={{ width: "4px", height: "16px", backgroundColor: sidebarBlue, marginLeft: "8px", display: "inline-block", borderRadius: "2px" }}></span>
            معلومات العيادة
          </Text>
          
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8} lg={6}>
              {renderInfoCard("رقم العيادة", clinicDetails.id, <IdcardOutlined />)}
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              {renderInfoCard("التخصص (عربي)", clinicDetails.specialty_ar, <HeartOutlined />)}
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              {renderInfoCard("التخصص (إنجليزي)", clinicDetails.specialty_en, <GlobalOutlined />)}
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              {renderInfoCard("رقم التخصص", clinicDetails.specialty_id, <TagOutlined />)}
            </Col>
            
            <Col xs={24} sm={12} md={8} lg={6}>
              {renderInfoCard("الطابق", clinicDetails.floor, <EnvironmentOutlined />)}
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              {renderInfoCard("رقم الغرفة", clinicDetails.room_number, <FolderOpenOutlined />)}
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              {renderInfoCard("رقم الهاتف", clinicDetails.phone, <PhoneOutlined />)}
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              {renderInfoCard("عدد الأطباء", clinicDetails.doctors_count, <TeamOutlined />)}
            </Col>

            {/* حقل الوصف */}
            <Col xs={24}>
              {renderInfoCard("الوصف", clinicDetails.description, <FileTextOutlined />)}
            </Col>
          </Row>
        </div>

        {/* قسم الأطباء المسجلين في العيادة */}
        <div style={{ marginTop: "24px" }}>
          <Text strong style={{ fontSize: "16px", color: "#333", display: "flex", alignItems: "center", marginBottom: "16px" }}>
            <span style={{ width: "4px", height: "16px", backgroundColor: sidebarBlue, marginLeft: "8px", display: "inline-block", borderRadius: "2px" }}></span>
            الأطباء المسجلون في العيادة ({clinicDetails.doctors_count})
          </Text>

          {/* تم تعديل الجدول هنا لحقن ستايل خاص بالـ Header لتلوينه بالكامل باللون الأزرق */}
          <Table
            columns={doctorColumns}
            dataSource={clinicDetails.doctors}
            rowKey="id"
            pagination={false}
            bordered={false}
            components={{
              header: {
                cell: (props) => (
                  <th 
                    {...props} 
                    style={{ 
                      ...props.style, 
                      backgroundColor: sidebarBlue, 
                      color: "#ffffff", 
                      fontWeight: 600,
                      textAlign: "right"
                    }} 
                  />
                ),
              },
            }}
            style={{ 
              backgroundColor: "#fff",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0,0,0,0.02)"
            }}
            locale={{
              emptyText: (
                <div style={{ padding: "30px 0" }}>
                  <TeamOutlined style={{ fontSize: "40px", color: "#ccc", marginBottom: "10px" }} />
                  <p style={{ color: "#999", margin: 0 }}>لا يوجد أطباء مسجلون في هذه العيادة حالياً</p>
                </div>
              ),
            }}
          />
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // الشاشة رقم 1: شاشة عرض شبكة الكروت (الوضع الافتراضي)
  // ----------------------------------------------------
  return (
    <div style={{ width: "100%", direction: "rtl", padding: "16px" }}>
      
      {/* الهيدر العلوي لعنوان الصفحة */}
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between",
        alignItems: "center", 
        marginBottom: "24px"
      }}>
        <Title level={3} style={{ margin: 0, fontWeight: 700, color: "#333" }}>
          إدارة العيادات الطبية
        </Title>

        {!isLoading && clinics.length > 0 && (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddClinic}
            style={{
              backgroundColor: sidebarBlue,
              borderColor: sidebarBlue,
              height: "40px",
              borderRadius: "8px",
              fontWeight: 600,
              boxShadow: `0 4px 12px ${sidebarBlue}40`
            }}
          >
            إضافة عيادة جديدة
          </Button>
        )}
      </div>

      {/* معالجة حالة التحميل (Loading) */}
      {isLoading ? (
         <Row gutter={[20, 20]}>
      {Array.from({ length: 6 }).map((_, index) => (
        <Col xs={24} lg={12} key={index}>
          <Card loading />
        </Col>
      ))}
    </Row>
      ) : clinics.length === 0 ? (
        <EmptyClinics onAddClick={() => setIsCreateModalOpen(true)} sidebarBlue={sidebarBlue} />
      ) : (
        /* عرض الكروت في حال وجود بيانات حقيقية */
        <Row gutter={[20, 20]}>
          {clinics.map((clinic) => (
            <Col xs={24} sm={12} lg={8} key={clinic.id}>
              <Card
                bordered={false}
                style={{
                  borderRadius: "14px",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
                  border: "1px solid #f0f0f0",
                  opacity: clinic.is_active ? 1 : 0.85,
                  backgroundColor: clinic.is_active ? "#ffffff" : "#fafafa"
                }}
                bodyStyle={{ padding: "20px" }}
                actions={[
                  <Tooltip title="عرض التفاصيل والأطباء">
                    <EyeOutlined 
                      key="view" 
                      onClick={() => {
                        dispatch(fetchDetailsclincs(clinic.id));
                        setViewingClinic(true);
                      }}
                      style={{ color: "#0288d1", fontSize: "16px" }} 
                    />
                  </Tooltip>,
                  
                  <Tooltip title="تعديل البيانات">
                    <EditOutlined 
                      key="edit" 
                      onClick={() => handleEditClinic(clinic.id)} 
                      style={{ color: "#ed6c02", fontSize: "16px" }} 
                    />
                  </Tooltip>,
                  
                  <Tooltip title={clinic.is_active ? "تعطيل العيادة" : "تفعيل العيادة"}>
                    {clinic.is_active ? (
                      <CloseCircleOutlined 
                        key="status" 
                        onClick={() => toggleClinicStatus(clinic)} 
                        style={{ color: "#faad14", fontSize: "16px" }} 
                      />
                    ) : (
                      <CheckCircleOutlined 
                        key="status" 
                        onClick={() => toggleClinicStatus(clinic)} 
                        style={{ color: "#52c41a", fontSize: "16px" }} 
                      />
                    )}
                  </Tooltip>,
                  
                <Tooltip title="حذف العيادة">
  <DeleteOutlined
    style={{
      color: "#ff4d4f",
      fontSize: 16,
    }}
    onClick={() => handleDeleteClinic(clinic)}
  />
</Tooltip>
                ]}
              >
                <Space size="middle" style={{ alignItems: "flex-start", width: "100%" }}>
                  <div style={{
                    padding: "12px",
                    backgroundColor: clinic.is_active ? `${sidebarBlue}12` : "#f0f0f0",
                    borderRadius: "10px",
                    color: clinic.is_active ? sidebarBlue : "#999",
                    fontSize: "22px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <HomeOutlined />
                  </div>
                  
                  <div style={{ width: "100%" }}>
                    <Title level={5} style={{ margin: 0, fontWeight: 700, fontSize: "16px", color: clinic.is_active ? "#333" : "#777" }}>
                      {clinic.name}
                    </Title>
                    <Text type="secondary" style={{ fontSize: "13px", display: "block", marginTop: "2px" }}>
                      {clinic.code}
                    </Text>
                    
                    <div style={{ marginTop: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Badge 
                        status={clinic.is_active ? "success" : "default"} 
                        text={clinic.is_active ? "نشطة" : "معطلة"} 
                      />
                      <Text strong style={{ fontSize: "13px", color: sidebarBlue }}>
                        عدد الأطباء: {clinic.doctors?.length || 0}
                      </Text>
                    </div>
                  </div>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      )}
      <CreateClinicModal open={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
       <ToggleClinicStatusModal
  open={openToggle}
  clinic={selectedClinic}
  onCancel={() => {
    setOpenToggle(false);
    setSelectedClinic(null);
  }}
  onSuccess={() => {
    dispatch(fetchClinic());      // إعادة جلب العيادات
    setToggleOpen(false);         // إغلاق المودال
    setSelectedClinic(null);      // تنظيف البيانات
  }}
/>
<DeleteClinicModal
  open={openDelete}
  clinic={selectedClinic}
  onCancel={() => {
    setOpenDelete(false);
    setSelectedClinic(null);
  }}
  onSuccess={() => {
    dispatch(fetchClinic());

    setOpenDelete(false);
    setSelectedClinic(null);
  }}
/>
    </div>
  );
}
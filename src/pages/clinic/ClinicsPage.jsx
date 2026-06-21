import React, { useState } from "react";
import { Row, Col, Card, Table, Button, Tooltip, Popconfirm, Typography, Space, Badge, Empty } from "antd";
import { 
  PlusOutlined, 
  EyeOutlined, 
  EditOutlined, 
  CheckCircleOutlined, 
  CloseCircleOutlined,
  DeleteOutlined,
  HomeOutlined,
  ArrowRightOutlined
} from "@ant-design/icons";

const { Title, Text } = Typography;

// بيانات وهمية متكاملة للعيادات والأطباء
const initialClinics = [
  {
    id: 1,
    name: "عيادة طب وجراحة القلب",
    code: "CLN-CARDIO",
    isActive: true,
    doctors: [
      { id: 101, name: "د. عبد الله الشمري", email: "a.shammari@care.com", phone: "0501234567", specialty: "استشاري قسطرة قلبية" },
      { id: 104, name: "د. رامي العزيز", email: "r.aziz@care.com", phone: "0501112223", specialty: "أخصائي كهرباء القلب" }
    ]
  },
  {
    id: 2,
    name: "عيادة طب الأطفال",
    code: "CLN-PED",
    isActive: true,
    doctors: [
      { id: 102, name: "د. سارة الأحمد", email: "s.ahmed@care.com", phone: "0507654321", specialty: "طب حديثي الولادة" }
    ]
  },
  {
    id: 3,
    name: "عيادة جراحة العظام والمفاصل",
    code: "CLN-ORTHO",
    isActive: false,
    doctors: [
      { id: 103, name: "د. خالد منصور", email: "k.mansour@care.com", phone: "0509876543", specialty: "جراحة المفاصل والمناظير" }
    ]
  },
];

export default function ClinicsPage() {
  const [clinics, setClinics] = useState(initialClinics);
  // حالة لمعرفة العيادة التي يتم عرض تفاصيلها حالياً (إذا كانت null يعرض كل الكروت)
  const [viewingClinic, setViewingClinic] = useState(null); 
  
  const sidebarBlue = "#2ca8c9"; // لون السايد بار المعتمد

  const handleAddClinic = () => console.log("إضافة عيادة جديدة");
  const handleEditClinic = (id) => console.log("تعديل بيانات العيادة رقم", id);

  // تفعيل أو تعطيل العيادة
  const toggleClinicStatus = (id) => {
    setClinics(clinics.map(clinic => 
      clinic.id === id ? { ...clinic, isActive: !clinic.isActive } : clinic
    ));
  };

  // حذف عيادة
  const handleDeleteClinic = (id) => {
    setClinics(clinics.filter(clinic => clinic.id !== id));
  };

  // أعمدة جدول الأطباء في صفحة التفاصيل المنفصلة
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

  // ----------------------------------------------------
  // الشاشة رقم 2: شاشة عرض تفاصيل عيادة واحدة (منفصلة تماماً)
  // ----------------------------------------------------
  if (viewingClinic) {
    return (
      <div style={{ width: "100%", direction: "rtl", padding: "16px" }}>
        {/* زر الرجوع العلوي */}
        <Button 
          type="link" 
          icon={<ArrowRightOutlined />} 
          onClick={() => setViewingClinic(null)}
          style={{ color: sidebarBlue, fontSize: "16px", fontWeight: 600, padding: 0, marginBottom: "20px" }}
        >
          العودة إلى قائمة العيادات
        </Button>

        {/* كرت عرض بيانات العيادة المستهدفة */}
        <Card style={{ 
          borderRadius: "12px", 
          boxShadow: "0 4px 20px rgba(0,0,0,0.03)", 
          border: "1px solid #eee"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", borderBottom: "1px solid #f0f0f0", paddingBottom: "16px" }}>
            <Space size="large">
              <div style={{ padding: "12px", backgroundColor: `${sidebarBlue}15`, borderRadius: "10px", color: sidebarBlue, fontSize: "24px" }}>
                <HomeOutlined />
              </div>
              <div>
                <Title level={3} style={{ margin: 0, fontWeight: 700, color: "#333" }}>
                  {viewingClinic.name}
                </Title>
                <Text type="secondary">كود العيادة المرجعي: {viewingClinic.code}</Text>
              </div>
            </Space>
            
            <Badge 
              count={viewingClinic.isActive ? "نشطة ومتاحة لحجز المرضى" : "معطلة مؤقتاً"} 
              style={{ backgroundColor: viewingClinic.isActive ? "#52c41a" : "#faad14", padding: "0 16px", borderRadius: "6px", height: "28px", lineHeight: "28px", fontSize: "13px" }}
            />
          </div>

          <Title level={4} style={{ marginBottom: "16px", fontWeight: 700, color: "#444" }}>
            الأطباء المخصصين لهذه العيادة ({viewingClinic.doctors.length})
          </Title>

          {/* ستايل هيدر الجدول بلون السايد بار والأبيض */}
          <style>{`
            .custom-view-table .ant-table-thead > tr > th {
              background-color: ${sidebarBlue} !important;
              color: #ffffff !important;
              font-weight: 700 !important;
              text-align: right !important;
            }
            .custom-view-table .ant-table-thead > tr > th::before {
              display: none !important;
            }
          `}</style>

          <Table 
            className="custom-view-table"
            columns={doctorColumns} 
            dataSource={viewingClinic.doctors} 
            rowKey="id"
            pagination={false}
            bordered
            locale={{ emptyText: <Empty description="لا يوجد أطباء مسجلين في هذه العيادة حالياً" /> }}
          />
        </Card>
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
      </div>

      {/* عرض الكروت في شبكة متناسقة و ريسبونسيف */}
      <Row gutter={[20, 20]}>
        {clinics.map((clinic) => (
          <Col xs={24} sm={12} lg={8} key={clinic.id}>
            <Card
              bordered={false}
              style={{
                borderRadius: "14px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
                border: "1px solid #f0f0f0",
                opacity: clinic.isActive ? 1 : 0.85,
                backgroundColor: clinic.isActive ? "#ffffff" : "#fafafa"
              }}
              bodyStyle={{ padding: "20px" }}
              
              // الأيقونات السفلية للتحكم بالكامل (تفاصيل، تعديل، تفعيل/تعطيل، حذف)
              actions={[
                <Tooltip title="عرض التفاصيل والأطباء">
                  <EyeOutlined 
                    key="view" 
                    onClick={() => setViewingClinic(clinic)} 
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
                
                <Tooltip title={clinic.isActive ? "تعطيل العيادة" : "تفعيل العيادة"}>
                  {clinic.isActive ? (
                    <CloseCircleOutlined 
                      key="status" 
                      onClick={() => toggleClinicStatus(clinic.id)} 
                      style={{ color: "#faad14", fontSize: "16px" }} 
                    />
                  ) : (
                    <CheckCircleOutlined 
                      key="status" 
                      onClick={() => toggleClinicStatus(clinic.id)} 
                      style={{ color: "#52c41a", fontSize: "16px" }} 
                    />
                  )}
                </Tooltip>,
                
                <Popconfirm
                  title="حذف العيادة"
                  description="هل أنت متأكد من حذف هذه العيادة بالكامل؟"
                  onConfirm={() => handleDeleteClinic(clinic.id)}
                  okText="نعم"
                  cancelText="تراجع"
                  placement="bottom"
                >
                  <Tooltip title="حذف العيادة">
                    <DeleteOutlined key="delete" style={{ color: "#ff4d4f", fontSize: "16px" }} />
                  </Tooltip>
                </Popconfirm>
              ]}
            >
              {/* محتوى الكارد الداخلي */}
              <Space size="middle" style={{ alignItems: "flex-start", width: "100%" }}>
                <div style={{
                  padding: "12px",
                  backgroundColor: clinic.isActive ? `${sidebarBlue}12` : "#f0f0f0",
                  borderRadius: "10px",
                  color: clinic.isActive ? sidebarBlue : "#999",
                  fontSize: "22px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <HomeOutlined />
                </div>
                
                <div style={{ width: "100%" }}>
                  <Title level={5} style={{ margin: 0, fontWeight: 700, fontSize: "16px", color: clinic.isActive ? "#333" : "#777" }}>
                    {clinic.name}
                  </Title>
                  <Text type="secondary" style={{ fontSize: "13px", display: "block", marginTop: "2px" }}>
                    {clinic.code}
                  </Text>
                  
                  <div style={{ marginTop: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Badge 
                      status={clinic.isActive ? "success" : "default"} 
                      text={clinic.isActive ? "نشطة" : "معطلة"} 
                    />
                    <Text strong style={{ fontSize: "13px", color: sidebarBlue }}>
                      عدد الأطباء: {clinic.doctors.length}
                    </Text>
                  </div>
                </div>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
import React, { useEffect } from "react";
import { Card, Row, Col, Typography, Tag, Divider, Badge, Space, Button } from "antd";
import { Spin, Empty, Result } from "antd";
import { 
  ArrowRightOutlined, 
  UserOutlined, 
  CalendarOutlined, 
  FileTextOutlined, 
  CreditCardOutlined, 
  SafetyCertificateOutlined,
  ClockCircleOutlined,
  TeamOutlined
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetailsRoles, resetDetails } from "../../backend/slice/pirmission/deteails";

const { Title, Text, Paragraph } = Typography;

export default function RoleDetailsPage({id , onBack}) {
    const dispatch = useDispatch();
    
      // جلب تفاصيل الإعلان من الـ Redux Store
const {
  data: roleResponse,
  isLoading,
  error,
} = useSelector((state) => state.fetchDetailsRoles);

const roleData = roleResponse?.data;    
      // جلب البيانات عند فتح المودال وتغير الـ ID وتصفيرها عند الإغلاق
      useEffect(() => {
        if (open && id) {
          dispatch(fetchDetailsRoles(id));
        }
        return () => {
          dispatch(resetDetails());
        };
      }, [id, open, dispatch]);
  // بيانات الـ JSON التي أرسلتها بعد محاكاتها مباشرة
  

  const sidebarBlue = "#17a2b8"; // اللون الأزرق المعتمد لديك

  // دالة ذكية لتجميع الصلاحيات حسب الـ group تلقائياً
  const groupedPermissions =
    roleData?.permissions?.reduce((acc, current) => {
        if (!acc[current.group]) {
            acc[current.group] = [];
        }

        acc[current.group].push(current);

        return acc;
    }, {}) || {};

  // دالة لتعيين أيقونة ولون مخصص لكل مجموعة صلاحيات لتسهيل القراءة البصرية
  const getGroupStyles = (group) => {
    switch (group) {
      case "appointments":
        return { label: "إدارة المواعيد", icon: <CalendarOutlined />, color: "blue", bg: "#e6f7ff" };
      case "medical":
        return { label: "الملف الطبي والسجلات", icon: <FileTextOutlined />, color: "geekblue", bg: "#f0f5ff" };
      case "payments":
        return { label: "المالية والمدفوعات", icon: <CreditCardOutlined />, color: "green", bg: "#f6ffed" };
      default:
        return { label: group, icon: <SafetyCertificateOutlined />, color: "magenta", bg: "#fff0f6" };
    }
  };
  if (isLoading) {
    return (
        <div
            style={{
                minHeight: "60vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Spin size="large" />
        </div>
    );
}

if (error) {
    return (
        <Result
            status="error"
            title="حدث خطأ أثناء جلب بيانات الدور"
            subTitle={error}
        />
    );
}

if (!roleData) {
    return (
        <Empty description="لا توجد بيانات لهذا الدور" />
    );
}

  return (
    <div style={{ width: "100%", direction: "rtl", padding: "24px", backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      
      {/* زر العودة العلوي */}
     <Button
    type="link"
    icon={<ArrowRightOutlined />}
    onClick={onBack}
    style={{
        color: sidebarBlue,
        fontWeight: 600,
        padding: 0,
        marginBottom: 20,
    }}
>
    العودة إلى إدارة الأدوار
</Button>

      {/* 1. كرت الهيدر الرئيسي وتفاصيل الدور الأساسية */}
      <Card 
        bordered={false} 
        style={{ 
          borderRadius: "16px", 
          marginBottom: "24px", 
          boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
          border: "1px solid #f0f0f0",
          background: "linear-gradient(135deg, #ffffff 0%, #fbfdfd 100%)"
        }}
      >
        <Row gutter={[24, 24]} align="middle">
          <Col xs={24} md={16}>
            <Space size="large" align="start">
              {/* أيقونة الدور الكبيرة */}
              <div style={{ 
                width: "70px", 
                height: "70px", 
                backgroundColor: `${sidebarBlue}15`, 
                borderRadius: "14px", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                color: sidebarBlue, 
                fontSize: "32px" 
              }}>
                <UserOutlined />
              </div>
              
              <div>
                <Space size="middle" style={{ marginBottom: "4px" }}>
                  <Title level={3} style={{ margin: 0, fontWeight: 700, color: "#222" }}>
                    {roleData.display_name}
                  </Title>
                  <Tag color="cyan" style={{ borderRadius: "4px", fontWeight: 600 }}>{roleData.name}</Tag>
                </Space>
                
                <Paragraph type="secondary" style={{ margin: "8px 0 0 0", maxWidth: "700px", fontSize: "14px", lineHeight: "1.6" }}>
                  {roleData.description || "لا يوجد وصف مخصص لهذا الدور حالياً. يمكنك تعديل الدور لإضافة وصف يشرح الصلاحيات الممنوحة للمستخدمين."}
                </Paragraph>
              </div>
            </Space>
          </Col>

          {/* عدادات سريعة على اليسار */}
          <Col xs={24} md={8} style={{ display: "flex", justifyContent: "md-flex-end", gap: "16px", justifyContent: "flex-end" }}>
            <div style={{ textAlign: "center", padding: "12px 24px", backgroundColor: "#fff", borderRadius: "12px", border: "1px solid #f0f0f0", boxShadow: "0 2px 8px rgba(0,0,0,0.01)" }}>
              <TeamOutlined style={{ fontSize: "20px", color: sidebarBlue, marginBottom: "4px" }} />
              <Text type="secondary" style={{ display: "block", fontSize: "12px" }}>المستخدمين المرتبطين</Text>
              <Text strong style={{ fontSize: "18px", color: "#222" }}>{roleData.users_count} مستخدم</Text>
            </div>
            
            <div style={{ textAlign: "center", padding: "12px 24px", backgroundColor: "#fff", borderRadius: "12px", border: "1px solid #f0f0f0", boxShadow: "0 2px 8px rgba(0,0,0,0.01)" }}>
              <ClockCircleOutlined style={{ fontSize: "20px", color: "#ffa940", marginBottom: "4px" }} />
              <Text type="secondary" style={{ display: "block", fontSize: "12px" }}>تاريخ الإنشاء</Text>
              <Text strong style={{ fontSize: "14px", color: "#222" }}>
                {new Date(roleData.created_at).toLocaleDateString("ar")}
              </Text>
            </div>
          </Col>
        </Row>
      </Card>

      {/* عنوان قسم الصلاحيات */}
      <div style={{ marginBottom: "16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Space>
          <span style={{ width: "4px", height: "18px", backgroundColor: sidebarBlue, display: "inline-block", borderRadius: "2px" }}></span>
          <Title level={4} style={{ margin: 0, fontWeight: 700, color: "#333" }}>
            صلاحيات الدور الممنوحة ({roleData.permissions.length})
          </Title>
        </Space>
        <Badge status="processing" text="محدثة تلقائياً" style={{ color: "#999" }} />
      </div>

      {/* 2. شبكة كروت الصلاحيات المجمعة حسب المجموعات (Groups) */}
      <Row gutter={[20, 20]}>
        {Object.keys(groupedPermissions).map((groupKey) => {
          const groupMeta = getGroupStyles(groupKey);
          return (
            <Col xs={24} sm={12} lg={8} key={groupKey}>
              <Card 
                bordered={false}
                style={{ 
                  borderRadius: "14px", 
                  height: "100%", 
                  boxShadow: "0 4px 14px rgba(0,0,0,0.02)",
                  border: "1px solid #f0f0f0"
                }}
                bodyStyle={{ padding: "20px" }}
              >
                {/* رأس كرت المجموعة الخاص بالصلاحية */}
                <div style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "12px", 
                  marginBottom: "16px",
                  paddingBottom: "12px",
                  borderBottom: "1px dashed #efefef"
                }}>
                  <div style={{ 
                    fontSize: "18px", 
                    color: sidebarBlue, 
                    backgroundColor: groupMeta.bg, 
                    padding: "8px", 
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center"
                  }}>
                    {groupMeta.icon}
                  </div>
                  <div>
                    <Text strong style={{ fontSize: "15px", color: "#333", display: "block" }}>
                      {groupMeta.label}
                    </Text>
                    <Text type="secondary" style={{ fontSize: "11px" }}>
                      المعرف السستمي: {groupKey}
                    </Text>
                  </div>
                </div>

                {/* قائمة الصلاحيات داخل هذا الجروب */}
                <Space direction="vertical" style={{ width: "100%" }} size="middle">
                  {groupedPermissions[groupKey].map((permission) => (
                    <div 
                      key={permission.id} 
                      style={{ 
                        display: "flex", 
                        justifyContent: "space-between", 
                        alignItems: "center",
                        backgroundColor: "#fafafa",
                        padding: "10px 14px",
                        borderRadius: "8px",
                        border: "1px solid #f5f5f5"
                      }}
                    >
                      <div>
                        <Text strong style={{ fontSize: "13px", color: "#444", display: "block" }}>
                          {permission.display_name}
                        </Text>
                        <Text type="secondary" style={{ fontSize: "11px", fontFamily: "monospace" }}>
                          {permission.name}
                        </Text>
                      </div>
                      
                      <Badge status="success" />
                    </div>
                  ))}
                </Space>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
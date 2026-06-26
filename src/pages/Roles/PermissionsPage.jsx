import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, Tooltip, Popconfirm, Typography, Space, Switch, Tag } from "antd";
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  ArrowRightOutlined,
  SaveOutlined,
  SafetyOutlined,
  UserOutlined,UnorderedListOutlined,
  LockOutlined
} from "@ant-design/icons";
import { EyeOutlined } from "@ant-design/icons";
import { baby_blue } from "../../color-main/color";
import { fetchRoles } from "../../backend/slice/pirmission/fetchAll";
import { useDispatch, useSelector } from "react-redux";
import RolesEmpty from "../empty/RolesEmpty";
import DeleteRolesModal from "./deletRole";
import RoleDetailsPage from "./deteails";
import PermissionsCatalogPage from "./PermissionsListPage";

const { Title, Text } = Typography;



// أسماء الصلاحيات باللغة العربية لعرضها بشكل مفهوم للمستخدم
const permissionLabels = {
  clinics_view: "عرض العيادات",
  clinics_create: "إضافة عيادة جديدة",
  clinics_edit: "تعديل بيانات العيادات",
  clinics_delete: "حذف عيادة",
  doctors_view: "عرض قائمة الأطباء",
  doctors_create: "إضافة طبيب جديد",
  doctors_edit: "تعديل بيانات الأطباء",
  doctors_delete: "حذف حساب طبيب",
  patients_view: "عرض سجلات المرضى",
  patients_delete: "حذف ملف مريض"
};

export default function PermissionsPage() {
  const [viewPermissions,setViewPermissions]=useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
const [selectedRole, setSelectedRole] = useState(null);
   const dispatch = useDispatch();
   const [viewRoleId, setViewRoleId] = useState(null);
      const { data: responseData, isLoading } = useSelector((state) => state.fetchRoles);
    
      console.log(responseData);
    
      useEffect(() => {
        dispatch(fetchRoles());
      }, [dispatch]);



const roles =
  responseData?.data?.map((role) => ({
    id: role.id,
    name: role.display_name,
    systemName: role.name,
    description:
      role.description || "لا يوجد وصف لهذا الدور.",
    userCount: role.users_count,
    permissionsCount: role.permissions_count,
  })) || [];


  const [editingRole, setEditingRole] = useState(null); // الدور الحالي الذي يتم تعديله
  
  const sidebarBlue =baby_blue; // لون السايد بار المعتمد لديكِ

  // إجرائيات الإنشاء، الحذف، والتحديث
  const handleCreateRole = () => {
    const newId = roles.length + 1;
    const newRole = {
      id: newId,
      name: `دور جديد رقم ${newId}`,
      description: "اضغط على تعديل لتخصيص الوصف والصلاحيات الخاصة بهذا الدور.",
      userCount: 0,
      permissions: {
        clinics_view: false, clinics_create: false, clinics_edit: false, clinics_delete: false,
        doctors_view: false, doctors_create: false, doctors_edit: false, doctors_delete: false,
        patients_view: false, patients_delete: false
      }
    };
    setRoles([...roles, newRole]);
  };

  const handleDeleteRole = (id) => {
    setRoles(roles.filter(role => role.id !== id));
  };

  const handleTogglePermission = (permKey) => {
    setEditingRole({
      ...editingRole,
      permissions: {
        ...editingRole.permissions,
        [permKey]: !editingRole.permissions[permKey]
      }
    });
  };

  const handleSavePermissions = () => {
    setRoles(roles.map(r => r.id === editingRole.id ? editingRole : r));
    setEditingRole(null); // العودة لشبكة الكروت
  };

  // -----------------------------------------------------------------
  // الشاشة رقم 2: شاشة تعديل صلاحيات دور معين (تفتح عند الضغط على تعديل)
  // -----------------------------------------------------------------
  if (editingRole) {
    return (
      <div style={{ width: "100%", direction: "rtl", padding: "16px" }}>
        
        {/* زر العودة */}
        <Button 
          type="link" 
          icon={<ArrowRightOutlined />} 
          onClick={() => setEditingRole(null)}
          style={{ color: sidebarBlue, fontSize: "16px", fontWeight: 600, padding: 0, marginBottom: "20px" }}
        >
          العودة للأدوار والصلاحيات
        </Button>

        <Card 
          style={{ borderRadius: "14px", boxShadow: "0 6px 20px rgba(0,0,0,0.04)", border: "1px solid #eef2f5" }}
          title={
            <Space>
              <LockOutlined style={{ color: sidebarBlue }} />
              <span style={{ fontWeight: 700 }}>تعديل صلاحيات الوصول: {editingRole.name}</span>
            </Space>
          }
          extra={
            <Button 
              type="primary" 
              icon={<SaveOutlined />} 
              onClick={handleSavePermissions}
              style={{ backgroundColor: sidebarBlue, borderColor: sidebarBlue, borderRadius: "8px", fontWeight: 600 }}
            >
              حفظ التغييرات
            </Button>
          }
        >
          <Row gutter={[24, 24]}>
            {/* قسم إدارة العيادات */}
            <Col xs={24} md={12}>
              <Card type="inner" title="إدارة العيادات" style={{ borderRadius: "12px", border: "1px solid #eef2f5" }}>
                {Object.keys(editingRole.permissions).filter(k => k.startsWith("clinics_")).map(permKey => (
                  <div key={permKey} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #f5f5f5" }}>
                    <Text strong style={{ color: "#444" }}>{permissionLabels[permKey]}</Text>
                    <Switch 
                      checked={editingRole.permissions[permKey]} 
                      onChange={() => handleTogglePermission(permKey)}
                      style={{ backgroundColor: editingRole.permissions[permKey] ? sidebarBlue : undefined }}
                    />
                  </div>
                ))}
              </Card>
            </Col>

            {/* قسم إدارة الأطباء والمرضى */}
            <Col xs={24} md={12}>
              <Card type="inner" title="إدارة الأطباء والمرضى" style={{ borderRadius: "12px", border: "1px solid #eef2f5" }}>
                {Object.keys(editingRole.permissions).filter(k => !k.startsWith("clinics_")).map(permKey => (
                  <div key={permKey} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #f5f5f5" }}>
                    <Text strong style={{ color: "#444" }}>{permissionLabels[permKey]}</Text>
                    <Switch 
                      checked={editingRole.permissions[permKey]} 
                      onChange={() => handleTogglePermission(permKey)}
                      style={{ backgroundColor: editingRole.permissions[permKey] ? sidebarBlue : undefined }}
                    />
                  </div>
                ))}
              </Card>
            </Col>
          </Row>
        </Card>
      </div>
    );
  }

  // -----------------------------------------------------------------
  // الشاشة رقم 1: شاشة العرض الرئيسية لشبكة الكروت (الأدوار)
  // -----------------------------------------------------------------
  if (viewRoleId) {
    return (
        <RoleDetailsPage
            id={viewRoleId}
            onBack={() => setViewRoleId(null)}
        />
    );
}
if(viewPermissions){
    return(
        <PermissionsCatalogPage
            onBack={()=>setViewPermissions(false)}
        />
    )
}
  return (
    <div style={{ width: "100%", direction: "rtl", padding: "16px" }}>
      
      {/* الهيدر العلوي */}
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        marginBottom: "32px",
        flexWrap: "wrap",
        gap: "16px"
      }}>
        <div>
          <Title level={3} style={{ margin: 0, fontWeight: 700, color: "#222", letterSpacing: "-0.5px" }}>
            الأدوار وصلاحيات الوصول
          </Title>
          <Text style={{ color: "#777", fontSize: "14px" }}>تحديد الصلاحيات الممنوحة لكل فئة مستخدمين داخل النظام الطبي</Text>
        </div>



<Space>
 <Button
    icon={<UnorderedListOutlined />}
    style={{
      borderColor: sidebarBlue,
      color: sidebarBlue,
      height: 42,
      borderRadius: 10,
      fontWeight: 600,
    }}
    onClick={() => setViewPermissions(true)}
  >
    عرض جميع الصلاحيات
  </Button>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleCreateRole}
          style={{
            backgroundColor: sidebarBlue,
            borderColor: sidebarBlue,
            height: "42px",
            borderRadius: "10px",
            fontWeight: 600,
            boxShadow: `0 6px 16px ${sidebarBlue}35`
          }}
        >
          إنشاء دور جديد
        </Button>
        </Space>
      </div>

      {/* حاقن CSS مخصص لتأثير العمق والحركية عند تمرير الماوس فوق الكارد */}
      <style>{`
        .role-interactive-card {
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
          border: 1px solid #eef2f5 !important;
        }
        .role-interactive-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 24px rgba(44, 168, 201, 0.12), 0 4px 8px rgba(0, 0, 0, 0.02) !important;
          border-color: ${sidebarBlue}70 !important;
        }
        .role-interactive-card .ant-card-actions {
          background: #fafbfc !important;
          border-top: 1px solid #eef2f5 !important;
        }
        .role-interactive-card .ant-card-actions > li > span:hover {
          color: ${sidebarBlue} !important;
        }
      `}</style>

      {/* شبكة الكروت (Responsive Grid) */}
      {
!isLoading && roles.length === 0 ? (
    <RolesEmpty />
) : (
      <Row gutter={[24, 24]}>
        {isLoading
    ? Array.from({ length: 6 }).map((_, index) => (
        <Col xs={24} sm={12} lg={8} key={index}>
            <Card loading />
        </Col>
    )):
        roles.map((role) => {
          // حساب كم صلاحية مفعلة داخل الكارد
const activePermsCount = role.permissionsCount;
          return (
            <Col xs={24} sm={12} lg={8} key={role.id}>
              <Card
                className="role-interactive-card"
                bordered={false}
                style={{
                  borderRadius: "16px",
                  boxShadow: "0 6px 16px rgba(0,0,0,0.03)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  overflow: "hidden"
                }}
                bodyStyle={{ flex: 1, padding: "24px" }}
                
                // العمليات على الكارد (تعديل وحذف)
                actions={[
                   <Tooltip title="عرض التفاصيل">
        <Button
            type="text"
            icon={<EyeOutlined style={{ color: "#1677ff" }} />}
            onClick={() => setViewRoleId(role.id)}
        />
    </Tooltip>,
                  <Tooltip title="تعديل وإدارة الصلاحيات">
                    <Button 
                      type="text" 
                      icon={<EditOutlined style={{ color: sidebarBlue, fontSize: "15px" }} />} 
                      style={{ fontWeight: 600, color: "#555" }}
                      onClick={() => setEditingRole(role)}
                    >
                      تعديل الصلاحيات
                    </Button>
                  </Tooltip>,
                  
                 <Tooltip title={role.id === 3 ? "لا يمكن حذف مدير النظام" : "حذف الدور"}>
  <Button
    type="text"
    danger
    icon={<DeleteOutlined style={{ fontSize: 16 }} />}
    disabled={role.id === 3}
    style={{ opacity: role.id === 3 ? 0.3 : 1 }}
    onClick={() => {
      setSelectedRole(role);
      setDeleteModalOpen(true);
    }}
  />
</Tooltip>
                ]}
              >
                {/* محتوى الكارد الداخلي */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                    <Space size="middle">
                      <div style={{
                        padding: "10px",
                        backgroundColor: `${sidebarBlue}15`,
                        borderRadius: "12px",
                        color: sidebarBlue,
                        display: "flex",
                        boxShadow: `0 4px 10px ${sidebarBlue}20`
                      }}>
                        <SafetyOutlined style={{ fontSize: "22px" }} />
                      </div>
                      <div>
                        <Title level={5} style={{ margin: 0, fontWeight: 700, fontSize: "16px", color: "#111" }}>
                          {role.name}
                        </Title>
                      </div>
                    </Space>
                  </div>

                  {/* التاغ الخاص بعدد الصلاحيات بنمط كبسولة أنيق ومميز */}
                  <div style={{ marginBottom: "16px" }}>
                    <Tag 
                      style={{ 
                        borderRadius: "20px", 
                        fontWeight: 600, 
                        padding: "2px 12px",
                        backgroundColor: `${sidebarBlue}10`,
                        color: sidebarBlue,
                        border: `1px solid ${sidebarBlue}30`
                      }}
                    >
                      {activePermsCount} صلاحيات مفعلة
                    </Tag>
                  </div>

                  <p style={{ color: "#666", fontSize: "13.5px", lineHeight: "1.6", minHeight: "55px", margin: "0 0 20px 0" }}>
                    {role.description}
                  </p>

                  <div style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: "8px", 
                    paddingTop: "12px", 
                    borderTop: "1px dashed #f0f0f0" 
                  }}>
                    <UserOutlined style={{ color: sidebarBlue, fontSize: "15px" }} />
                    <Text style={{ fontSize: "13px", color: "#555" }}>
                      المخدمين المرتبطين بالدور: <strong style={{ color: "#000", fontSize: "14px" }}>{role.userCount}</strong>
                    </Text>
                  </div>
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>)}
      <DeleteRolesModal
    open={deleteModalOpen}
    RolesData={selectedRole}
    onCancel={() => {
        setDeleteModalOpen(false);
        setSelectedRole(null);
    }}
    onSuccess={() => {
        dispatch(fetchRoles());

        setDeleteModalOpen(false);
        setSelectedRole(null);
    }}
/>
    </div>
  );
}
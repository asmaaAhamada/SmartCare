import React, { useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Table,
  Typography,
  Tag,
  Space,
  Button,
} from "antd";
import {
  ArrowRightOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { Empty } from "antd";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import PaymentsIcon from "@mui/icons-material/Payments";
import MedicationIcon from "@mui/icons-material/Medication";
import ScienceIcon from "@mui/icons-material/Science";
import AssessmentIcon from "@mui/icons-material/Assessment";
import CampaignIcon from "@mui/icons-material/Campaign";
import GroupIcon from "@mui/icons-material/Group";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

import { baby_blue } from "../../color-main/color";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRoles } from "../../backend/slice/pirmission/groupfitsh";

const { Title, Text } = Typography;



const sidebarBlue = baby_blue;



const getMeta = (group) => {
  switch (group) {
    case "appointments":
      return {
        title: "المواعيد",
        icon: <EventAvailableIcon />,
      };

    case "medical":
      return {
        title: "السجلات الطبية",
        icon: <LocalHospitalIcon />,
      };

    case "payments":
      return {
        title: "المدفوعات",
        icon: <PaymentsIcon />,
      };

    case "pharmacy":
      return {
        title: "الصيدلية",
        icon: <MedicationIcon />,
      };

    case "lab":
      return {
        title: "المختبر",
        icon: <ScienceIcon />,
      };

    case "reports":
      return {
        title: "التقارير",
        icon: <AssessmentIcon />,
      };

    case "announcements":
      return {
        title: "الإعلانات",
        icon: <CampaignIcon />,
      };

    case "users":
      return {
        title: "المستخدمون",
        icon: <GroupIcon />,
      };

    default:
      return {
        title: group,
        icon: <VpnKeyIcon />,
      };
  }
};

export default function PermissionsCatalogPage({ onBack }) {
       const dispatch = useDispatch();
      const { data: responseData, isLoading } = useSelector((state) => state.fetchAllRoles);
    
      console.log(responseData);
const grouped = responseData?.data || {};    
      useEffect(() => {
        dispatch(fetchAllRoles());
      }, [dispatch]);
  const columns = [
    {
      title: "الصلاحية",
      dataIndex: "display_name",
      key: "display_name",
      render: (text) => (
        <Space>
          <SafetyCertificateOutlined style={{ color: sidebarBlue }} />
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    {
      title: "المعرف البرمجي",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <Tag color="blue" style={{ borderRadius: 20 }}>
          {text}
        </Tag>
      ),
    },
  ];
if (isLoading) {
  return (
    <Row gutter={[20, 20]}>
      {Array.from({ length: 6 }).map((_, index) => (
        <Col xs={24} lg={12} key={index}>
          <Card loading />
        </Col>
      ))}
    </Row>
  );
}
if (!Object.keys(grouped).length) {
  return <Empty description="لا توجد صلاحيات" />;
}
  return (
    <div
      style={{
        direction: "rtl",
        padding: 20,
        background: "#f7f9fc",
        minHeight: "100vh",
      }}
    >
      <Button
        icon={<ArrowRightOutlined />}
        type="link"
        onClick={onBack}
        style={{
          color: sidebarBlue,
          padding: 0,
          marginBottom: 20,
          fontWeight: 600,
        }}
      >
        العودة إلى الأدوار
      </Button>

      <Card
        bordered={false}
        style={{
          borderRadius: 16,
          marginBottom: 24,
          boxShadow: "0 6px 18px rgba(0,0,0,.04)",
        }}
      >
        <Title level={3} style={{ marginBottom: 5 }}>
          دليل الصلاحيات
        </Title>

        <Text type="secondary">
          جميع الصلاحيات الموجودة داخل النظام مرتبة حسب الأقسام.
        </Text>
      </Card>

      <Row gutter={[20, 20]}>
        {Object.keys(grouped).map((group) => {
          const meta = getMeta(group);

          return (
            <Col xs={24} lg={12} key={group}>
              <Card
                bordered={false}
                style={{
                  borderRadius: 16,
                  height: "100%",
                  boxShadow: "0 4px 15px rgba(0,0,0,.04)",
                }}
                title={
                  <Space>
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        background: `${sidebarBlue}15`,
                        color: sidebarBlue,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {meta.icon}
                    </div>

                    <div>
                      <div style={{ fontWeight: 700 }}>
                        {meta.title}
                      </div>

                      <Text type="secondary">
                        {grouped[group].length} صلاحية
                      </Text>
                    </div>
                  </Space>
                }
              >
                <Table
                  rowKey="id"
                  columns={columns}
                  dataSource={grouped[group]}
                  pagination={false}
                  size="small"
                />
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
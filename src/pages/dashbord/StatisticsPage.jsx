import React from "react";
import { Card, Typography, Row, Col, Space } from "antd";
import { BarChartOutlined, PieChartOutlined } from "@ant-design/icons";
import DoctorsChart from "./DoctorsChart";
import AppointmentsChart from "./AppointmentsChart";

const { Title, Text } = Typography;

export default function StatisticsPage() {
  const sidebarBlue = "#2ca8c9"; //

  return (
    <div style={{ width: "100%", direction: "rtl", padding: "16px" }}>
      
      {/* الهيدر الرئيسي */}
      <div style={{ marginBottom: "32px" }}>
        <Title level={3} style={{ margin: 0, fontWeight: 700, color: "#222" }}>
          التقارير والإحصائيات الحية
        </Title>
        <Text style={{ color: "#777", fontSize: "14px" }}>
          رصد مباشر وتفاعلي لحالات المواعيد وتوزيع نشاط الأطباء داخل النظام الطبي
        </Text>
      </div>

      <Row gutter={[0, 24]}>
        
        {/* قسم إحصائيات الأطباء (الأعمدة) */}
        <Col span={24}>
          <Card 
            bordered={false}
            style={{ 
              borderRadius: "16px", 
              boxShadow: "0 4px 20px rgba(0,0,0,0.02)", 
              border: "1px solid #eef2f5" 
            }}
            title={
              <Space>
                <BarChartOutlined style={{ color: sidebarBlue, fontSize: "18px" }} />
                <span style={{ fontWeight: 700, color: "#333" }}>مخطط أداء ونشاط الحسابات الطبية (Victory)</span>
              </Space>
            }
          >
            <DoctorsChart />
          </Card>
        </Col>

        {/* قسم إحصائيات المواعيد (الدائري) */}
        <Col span={24}>
          <Card 
            bordered={false}
            style={{ 
              borderRadius: "16px", 
              boxShadow: "0 4px 20px rgba(0,0,0,0.02)", 
              border: "1px solid #eef2f5" 
            }}
            title={
              <Space>
                <PieChartOutlined style={{ color: sidebarBlue, fontSize: "18px" }} />
                <span style={{ fontWeight: 700, color: "#333" }}>تحليل وتوزيع حالات المواعيد (Victory)</span>
              </Space>
            }
          >
            <AppointmentsChart />
          </Card>
        </Col>

      </Row>
    </div>
  );
}
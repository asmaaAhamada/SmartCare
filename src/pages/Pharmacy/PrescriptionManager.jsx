import React, { useState, lazy, Suspense } from 'react';
import { Table, Tag, Empty, Space, Tooltip } from 'antd';
import { Box, Typography, Card, Button, CircularProgress } from '@mui/material';
import ReceiptIcon from '@mui/icons-material/Receipt';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import VisibilityIcon from '@mui/icons-material/Visibility';

// استدعاء مودال التفاصيل الجديد بشكل ليزي (Lazy Loading) بناءً على طلبك
const PrescriptionDetailsModal = lazy(() => import('./PrescriptionDetailsModal'));

const PrescriptionManager = () => {
  const pharmacyColor = '#4A148C';
  
  // حالات التحكم بالمودال الكسلان والايدي المختار
  const [selectedId, setSelectedId] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);

  // داتا الجدول الرئيسية من الباك اند
  const backendData = [
    {
      "id": 1,
      "medical_record_id": 1,
      "patient_id": 32,
      "doctor_id": 2,
      "prescription_date": "2026-07-02T21:00:00.000000Z",
      "expiry_date": "2026-07-09T21:00:00.000000Z",
      "status": "active",
      "patient": { "id": 32, "email": "patient2@test.com", "phone": "0999999999" },
      "doctor": { "id": 2, "email": "dr.hassan@healthcare.com" }
    }
  ];

  const columns = [
    { 
      title: 'رقم الوصفة', 
      dataIndex: 'id', 
      key: 'id', 
      align: 'center',
      render: (id) => <strong style={{ color: pharmacyColor }}>#{id}</strong>
    },
    { 
      title: 'المريض', 
      dataIndex: 'patient', 
      key: 'patient', 
      align: 'center',
      render: (patient) => patient?.email
    },
    { 
      title: 'الطبيب المعالج', 
      dataIndex: 'doctor', 
      key: 'doctor', 
      align: 'center',
      render: (doctor) => doctor?.email?.split('@')[0]
    },
    { 
      title: 'تاريخ الإصدار', 
      dataIndex: 'prescription_date', 
      key: 'prescription_date', 
      align: 'center',
      render: (date) => date ? date.split('T')[0] : 'غير محدد'
    },
    {
      title: 'الحالة',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status) => <Tag color="green">{status === 'active' ? 'نشطة' : status}</Tag>
    },
    {
      title: 'الإجراءات والعمليات',
      key: 'actions',
      align: 'center',
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="عرض التفاصيل   ">
            <Button 
              size="small" 
              onClick={() => { 
                setSelectedId(record.id); 
                setOpenDetails(true); 
              }}
              style={{ minWidth: 'auto', padding: 6, border: `1px solid ${pharmacyColor}`, borderRadius: '6px' }}
            >
              <VisibilityIcon fontSize="small" style={{ color: pharmacyColor }} />
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Box dir="rtl">
      <Box display="flex" alignItems="center" gap={1.5} mb={3}>
        <ReceiptIcon sx={{ color: pharmacyColor, fontSize: '30px' }} />
        <Typography variant="h5" fontWeight="bold" sx={{ color: pharmacyColor, fontFamily: 'inherit' }}>
          إدارة ومراجعة الوصفات الطبية الصادرة
        </Typography>
      </Box>

      <style>{`
        .ant-table-wrapper .ant-table-thead > tr > th {
          background-color: ${pharmacyColor} !important;
          color: white !important;
          font-weight: bold !important;
          text-align: center !important;
        }
      `}</style>

      {!backendData || backendData.length === 0 ? (
        <Card variant="outlined" style={{ padding: 40, borderRadius: '12px', textAlign: 'center' }}>
          <Empty description="لا توجد وصفات طبية مسجلة حالياً" />
        </Card>
      ) : (
        <Table 
          columns={columns} 
          dataSource={backendData} 
          rowKey={(record) => record.id} 
          bordered 
        />
      )}

      {/* الـ Suspense لانتظار تحميل كومبوننت المودال ليزي عند الضغط */}
      <Suspense fallback={<Box display="flex" justifyContent="center" p={3}><CircularProgress style={{ color: pharmacyColor }} /></Box>}>
        {openDetails && (
          <PrescriptionDetailsModal 
            open={openDetails} 
            onClose={() => {
              setOpenDetails(false);
              setSelectedId(null);
            }} 
            prescriptionId={selectedId} 
          />
        )}
      </Suspense>
    </Box>
  );
};

export default PrescriptionManager;
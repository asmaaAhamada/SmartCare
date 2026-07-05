import React, { useState, lazy, Suspense } from 'react';
import { Box, Typography, Button, ButtonGroup, Card, CardContent, Divider } from '@mui/material';
import { Table } from 'antd';
import Swal from 'sweetalert2';

// الاستدعاء الكسول للأزرار والوظائف الفرعية
const PatientDetailsCard = lazy(() => import('./sub-components/PatientDetailsCard'));
const PatientVisitsTable = lazy(() => import('./sub-components/PatientVisitsTable'));

export default function ReceptionPatients() {
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [activeTab, setActiveTab] = useState(null); // 'details' or 'visits'

  const patientsListData = [
    { key: '1', id: 32, first_name: 'أحمد', last_name: 'علي', phone: '0999999999', email: 'patient2@test.com', national_id: '12345678901' },
    { key: '2', id: 33, first_name: 'رشا', last_name: 'خالد', phone: '0933333333', email: 'rasha@test.com', national_id: '12345678902' },
  ];

  const handleCheckIn = (id) => {
    Swal.fire('أهلاً بضيفنا! 👋', `تم عمل Check-In للمريض رقم ${id} بنجاح، وربطه بالدور حالياً.`, 'success');
  };

  const handleCheckOut = (id) => {
    Swal.fire('رافقتكم السلامة! ✨', `تم عمل Check-Out للمريض رقم ${id}. نتمنى له دوام الصحة!`, 'info');
  };

  const columns = [
    { title: 'المعرف ID', dataIndex: 'id', key: 'id' },
    { title: 'الاسم الأول', dataIndex: 'first_name', key: 'first_name' },
    { title: 'العائلة', dataIndex: 'last_name', key: 'last_name' },
    { title: 'الهاتف', dataIndex: 'phone', key: 'phone' },
    {
      title: 'إجراءات الدخول والخروج',
      key: 'actions',
      render: (_, record) => (
        <Box display="flex" gap={1}>
          <Button variant="contained" size="small" color="success" onClick={() => handleCheckIn(record.id)}>Check In ✔️</Button>
          <Button variant="contained" size="small" color="error" onClick={() => handleCheckOut(record.id)}>Check Out 🚪</Button>
        </Box>
      )
    },
    {
      title: 'استعلامات تفصيلية',
      key: 'views',
      render: (_, record) => (
        <ButtonGroup variant="text" color="warning">
          <Button onClick={() => { setSelectedPatientId(record.id); setActiveTab('details'); }}>الملف الشخصي 👤</Button>
          <Button onClick={() => { setSelectedPatientId(record.id); setActiveTab('visits'); }}>سجل الزيارات 📜</Button>
        </ButtonGroup>
      )
    }
  ];

  return (
    <Box p={3} sx={{ direction: 'rtl' }}>
      <Typography variant="h5" fontWeight="bold" color="#E65100" mb={3}>👥 الواجهة الموحدة لإدارة واستعلامات المرضى</Typography>
      
      <Table dataSource={patientsListData} columns={columns} />

      <Divider sx={{ my: 4 }} />

      {/* عرض تفاصيل المرضى أو الزيارات بناءً على الأكشن المختار بشكل Lazy */}
      <Suspense fallback={<div>جاري إحضار تفاصيل العميل الودود... 🕒</div>}>
        {activeTab === 'details' && selectedPatientId && (
          <PatientDetailsCard patientId={selectedPatientId} />
        )}
        {activeTab === 'visits' && selectedPatientId && (
          <PatientVisitsTable patientId={selectedPatientId} />
        )}
      </Suspense>
    </Box>
  );
}
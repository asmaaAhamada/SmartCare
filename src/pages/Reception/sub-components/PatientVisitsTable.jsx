import React from 'react';
import { Box, Typography } from '@mui/material';
import { Table } from 'antd';

export default function PatientVisitsTable({ patientId }) {
  // داتا وهمية مطابقة كلياً للـ Structure من الصورة image_37b91d.png
  const visitsData = [
    {
      key: '1',
      id: 1,
      date: '2026-06-30',
      time: '09:30:00',
      status: 'confirmed',
      type: 'in_clinic',
      consultation_fee: '75.00',
      has_record: true
    },
    {
      key: '2',
      id: 5,
      date: '2026-07-04',
      time: '11:15:00',
      status: 'completed',
      type: 'video',
      consultation_fee: '50.00',
      has_record: true
    }
  ];

  const columns = [
    { title: 'رقم الزيارة', dataIndex: 'id', key: 'id' },
    { title: 'التاريخ', dataIndex: 'date', key: 'date' },
    { title: 'الوقت', dataIndex: 'time', key: 'time' },
    { title: 'طبيعة الزيارة', dataIndex: 'type', key: 'type', render: (text) => text === 'in_clinic' ? 'في العيادة 🏥' : 'استشارة فيديو 📹' },
    { title: 'رسوم الكشفية', dataIndex: 'consultation_fee', key: 'consultation_fee', render: (fee) => `${fee} ل.س` },
    { title: 'حالة الزيارة الاستعلامية', dataIndex: 'status', key: 'status' }
  ];

  return (
    <Box p={2} sx={{ bgcolor: '#F4FBF7', borderRadius: 3, border: '1px solid #A5D6A7' }}>
      <Typography variant="h6" fontWeight="bold" color="#2E7D32" mb={2}>
        📜 الأرشيف التاريخي للزيارات الخاصة بالمعرف (#{patientId})
      </Typography>
      <Table dataSource={visitsData} columns={columns} pagination={false} size="small" />
    </Box>
  );
}
import React, { useState } from 'react';
import { Table, Tag, Space } from 'antd';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box } from '@mui/material';
import { Visibility, CheckCircle } from '@mui/icons-material';

const PrescriptionManager = ({ pharmacyColor }) => {
  const [prescriptions, setPrescriptions] = useState([
    { key: '1', doctor: 'د. خالد الرويلي', patient: 'سليم العمر', status: 'غير مصارطة', meds: 'Profinal 400mg, Gaviscon Syrup' },
    { key: '2', doctor: 'د. أسماء الأحمد', patient: 'رنا الجاسم', status: 'تم الصرف', meds: 'Augmentin 1g Tablets' },
  ]);
  const [selectedPresc, setSelectedPresc] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);

  const handleDispense = (key) => {
    setPrescriptions(prescriptions.map(item => item.key === key ? { ...item, status: 'تم الصرف' } : item));
    setOpenDetails(false);
  };

  const columns = [
    { title: 'الطبيب المعالج للوصفة', dataIndex: 'doctor', key: 'doctor', align: 'center', width: 180 },
    { title: 'اسم المريض', dataIndex: 'patient', key: 'patient', align: 'center', width: 180 },
    {
      title: 'حالة اعتماد صرف الدواء',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 150,
      render: (status) => <Tag color={status === 'تم الصرف' ? 'green' : 'orange'} style={{ fontSize: '13px' }}>{status}</Tag>
    },
    {
      title: 'معاينة التذكرة',
      key: 'actions',
      align: 'center',
      width: 160,
      render: (_, record) => (
        <Space size="middle">
          <Button size="small" variant="outlined" startIcon={<Visibility />} style={{ color: pharmacyColor, borderColor: pharmacyColor, fontWeight: 'bold' }} onClick={() => { setSelectedPresc(record); setOpenDetails(true); }}>
            عرض وتفاصيل
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Box>
      {/* جدول الوصفات متجاوب كلياً ومحمي من الاختفاء الأفقي في الموبايل */}
      <Table 
        columns={columns} 
        dataSource={prescriptions} 
        bordered 
        scroll={{ x: 'max-content' }} 
      />

      <Dialog open={openDetails} onClose={() => setOpenDetails(false)} maxWidth="xs" fullWidth>
        <DialogTitle style={{ textAlign: 'center', color: pharmacyColor, fontWeight: 'bold' }}>تفاصيل تذكرة الصرف الدوائي</DialogTitle>
        <DialogContent dividers dir="rtl">
          <Typography variant="subtitle2" color="textSecondary">اسم المريض المستهدف:</Typography>
          <Typography variant="body1" mb={2} fontWeight="bold">{selectedPresc?.patient}</Typography>
          <Typography variant="subtitle2" color="textSecondary">التركيبات والجرعات العلاجية المطلوبة للتركيب والمطابقة:</Typography>
          <Typography variant="body1" color="error" style={{ whiteSpace: 'pre-line', fontWeight: 'bold', background: '#fff5f5', padding: '10px', borderRadius: '8px', marginTop: '5px' }}>{selectedPresc?.meds}</Typography>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'space-between', padding: '12px' }}>
          <Button onClick={() => setOpenDetails(false)} style={{ color: '#666' }}>إغلاق المعاينة</Button>
          {selectedPresc?.status !== 'تم الصرف' && (
            <Button variant="contained" startIcon={<CheckCircle />} style={{ backgroundColor: '#2E7D32', fontWeight: 'bold' }} onClick={() => handleDispense(selectedPresc.key)}>
              تأكيد صرف الدواء الفوري
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PrescriptionManager;